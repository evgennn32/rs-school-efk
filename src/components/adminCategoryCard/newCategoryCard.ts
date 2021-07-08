import Component from "../Component";
import './adminCategoryCard.scss';
import type App from "../../app";
import Button from "../button/button";
import AdminCategoryCard from "./adminCategoryCard";


export default class NewCategoryCard extends Component {
  private html: string;

  constructor(protected app: App,) {
    super('div', ['admin-categories__card']);
    this.html = '';
  }

  render(): void {
    super.render();
    const createBtn = new Button('Create',['admin__btn']);
    const cancelBtn = new Button('Cancel',['admin__btn','admin__btn_red']);
    this.renderChildComponent(createBtn, 'create-btn-plh');
    this.renderChildComponent(cancelBtn, 'cancel-btn-plh');
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.classList.add('admin-categories__name-input');
    this.renderChildElement(nameInput,'name-input-plh');
    this.addCreateBtnHandler(createBtn, nameInput);
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

  addCreateBtnHandler(btn: Button, nameInput: HTMLInputElement):void {
    btn.element.addEventListener('click', () => {
      const categoryName = nameInput.value;
      if(categoryName) {
        this.app.apiService.addCategory(categoryName).then((newCardData) => {
          // eslint-disable-next-line no-underscore-dangle
          this.app.apiService.getCategoryByDBId(newCardData._id).then(renderCardData => {
            const newCard = new AdminCategoryCard( this.app, renderCardData, 0 );
            newCard.render();
            this.element.replaceWith(newCard.element);
          }).catch((e) => {
            throw Error(e.message)
          })
        })
      }
    })

  }

  addCancelBtnHandler(btn: Button):void {
    btn.element.addEventListener('click', () => {
      this.element.remove();
    })
  }


}
