import Component from "../Component";
import './adminCategoryCard.scss';
import type App from "../../app";
import Button from "../button/button";
import NewCategoryCard from "./newCategoryCard";



export default class AddNewCategoryCard extends Component {
  private html: string;

  constructor(protected app: App) {
    super('div', ['admin-categories__card', 'new-card']);
    this.html = '';

  }

  render(): void {
    super.render();
    const newCategoryBtn = new Button('',['circle', 'plus']);
    newCategoryBtn.render();
    newCategoryBtn.element.addEventListener('click', () => {
      const newCategoryCard = new NewCategoryCard(this.app);
      newCategoryCard.render();
      this.element.after(newCategoryCard.element);
    })
    this.renderChildComponent(newCategoryBtn, "add-new-btn-plh");


  }

  buildHtml(): string {

    this.html = `
    <div class="admin-categories__name">Create new Category</div>
    <div class="admin-categories__btns">
      <div class="add-new-btn-plh"></div>
    </div>




    `;

    return this.html;
  }


}
