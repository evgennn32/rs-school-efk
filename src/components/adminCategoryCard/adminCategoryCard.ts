import Component from "../Component";
import './adminCategoryCard.scss';
import type App from "../../app";
import Button from "../button/button";
// eslint-disable-next-line import/no-cycle
import UpdateCategoryCard from "./updateCategoryCard";
import {DEFAULT_CATEGORIES} from "../../shared/constants";


export default class AdminCategoryCard extends Component {
  private html: string;

  constructor(protected app: App, public category: { name: string, categoryId: number }, private wordsNumber: number) {
    super('div', ['admin-categories__card']);
    this.html = '';
  }

  render(): void {
    super.render();
    const updateBtn = new Button('Update', ['admin__btn']);
    this.addUpdateBtnHandler(updateBtn);
    const addWordBtn = new Button('Add word', ['admin__btn']);
    const removeBtn = document.createElement('div');
    removeBtn.classList.add('admin-categories__remove-bnt');
    this.addRemoveBtnHandler(removeBtn);
    this.renderChildComponent(updateBtn, 'update-btn-plh');
    this.renderChildComponent(addWordBtn, 'add-btn-plh');
    this.renderChildElement(removeBtn, 'remove-btn-plh');
    addWordBtn.element.addEventListener('click', () => {
      this.app.appData.adminWordsCategory = this.category.categoryId;
      this.app.navigatePage(`/admin/categories/${this.category.name.split(" ").join("-")}`);
    })


  }

  buildHtml(): string {

    this.html = `
    <div class="admin-categories__name">${this.category.name}</div>
    <div class="admin-categories__words">WORDS: ${this.wordsNumber}</div>
    <div class="admin-categories__btns">
      <div class="update-btn-plh"></div>
      <div class="add-btn-plh"></div>
    </div>
    <div class="remove-btn-plh"></div>



    `;

    return this.html;
  }

  addRemoveBtnHandler(removeBtn: HTMLElement): void {
    removeBtn.addEventListener("click", () => {
      if(this.category.categoryId > DEFAULT_CATEGORIES ){
        this.app.apiService.removeCategory(this.category.categoryId).then(() => {
          this.element.remove();
        }).catch((err) => {
          throw Error(err);
        })
      } else {
        this.showDeleteDeprecation();
      }

    })
  }

  addUpdateBtnHandler(updateBtn: Button): void {
    updateBtn.element.addEventListener("click", () => {
      this.element.classList.add('hidden');
      const updateCard = new UpdateCategoryCard(this.app, this.category, this)
      updateCard.render()
      this.element.after(updateCard.element)
    })
  }

  showDeleteDeprecation(): void{
    const oldError = this.element.querySelector('.error');
    if(oldError){
      return;
    }
    const message = document.createElement('div');
    message.classList.add('error');
    message.innerHTML = "You can't delete default category! Add new one, and try again!";
    this.element.prepend(message);
    setTimeout(() => {
      message.remove()
    },3000)
  }


}
