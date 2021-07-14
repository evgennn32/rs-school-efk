import Component from "../Component";
import './adminCategoryCard.scss';
import type App from "../../app";
import Button from "../button/button";
import type AdminCategoryCard from "./adminCategoryCard";


export default class UpdateCategoryCard extends Component {
  private html: string;

  constructor(
    protected app: App,
    private cardData: {categoryId: number, name: string},
    private cardToUpdate: AdminCategoryCard) {
    super('div', ['admin-categories__card']);
    this.html = '';
  }

  render(): void {
    super.render();
    const updateBtn = new Button('Update',['admin__btn']);
    const cancelBtn = new Button('Cancel',['admin__btn','admin__btn_red']);
    this.renderChildComponent(updateBtn, 'create-btn-plh');
    this.renderChildComponent(cancelBtn, 'cancel-btn-plh');
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.value = this.cardData.name
    nameInput.classList.add('admin-categories__name-input');
    this.renderChildElement(nameInput,'name-input-plh');
    this.addUpdateBtnHandler(updateBtn, nameInput);
    this.addCancelBtnHandler(cancelBtn);
  }

  buildHtml(): string {

    this.html = `
    <div class="admin-categories__name">Category name:</div>
    <div class="name-input-plh"></div>
    <div class="admin-categories__btns">
      <div class="create-btn-plh"></div>
      <div class="cancel-btn-plh"></div>
    </div>
    <div class="remove-btn-plh"></div>
    `;
    return this.html;
  }

  addUpdateBtnHandler(btn: Button, nameInput: HTMLInputElement):void {
    btn.element.addEventListener('click', () => {
      const categoryName = nameInput.value;
      if(categoryName) {
        this.app.apiService.updateCategory(categoryName, this.cardData.categoryId).then(() => {
          this.cardToUpdate.category.name = categoryName;
          this.element.remove();
          this.cardToUpdate.render();
          this.cardToUpdate.element.classList.remove('hidden');
        })
      }
    })

  }

  addCancelBtnHandler(btn: Button):void {
    btn.element.addEventListener('click', () => {
      this.element.remove();
      this.cardToUpdate.element.classList.remove('hidden');
    })
  }


}
