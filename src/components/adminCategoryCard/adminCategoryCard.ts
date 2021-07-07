import Component from "../Component";
import './adminCategoryCard.scss';
import type App from "../../app";
import Button from "../button/button";


export default class AdminCategoryCard extends Component {
  private html: string;

  constructor(protected app: App, private category:{name: string, categoryId: number}, private wordsNumber: number) {
    super('div', ['admin-categories__card']);
    this.html = '';
  }

  render(): void {
    super.render();
    const updateBtn = new Button('Update',['admin__btn']);
    const addWordBtn = new Button('Add word',['admin__btn']);
    const removeBtn =  document.createElement('div');
    removeBtn.classList.add('admin-categories__remove-bnt');
    this.renderChildComponent(updateBtn, 'update-btn-plh');
    this.renderChildComponent(addWordBtn, 'add-btn-plh');
    this.renderChildElement(removeBtn, 'remove-btn-plh');
    addWordBtn.element.addEventListener('click', () => {

      // this.app.apiService.getCategoryWords(1).then((words) => {
      //   console.log(words)
      // })

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


}
