import Component from "../Component";
import './adminWordCard.scss';
import type App from "../../app";
import Button from "../button/button";
import NewWordCard from "./newWordCard";


export default class AddNewWordCard extends Component {
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
      const newCategoryCard = new NewWordCard(this.app);
      newCategoryCard.render();
      this.element.after(newCategoryCard.element);
    })
    this.renderChildComponent(newCategoryBtn, "add-new-btn-plh");


  }

  buildHtml(): string {
    this.html = `
    <div class="admin-categories__name">Add new word</div>
    <div class="admin-categories__btns">
      <div class="add-new-btn-plh"></div>
    </div>
    `;

    return this.html;
  }


}
