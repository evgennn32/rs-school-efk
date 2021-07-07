import Component from "../Component";
import './adminCategories.scss';
import type App from "../../app";
import AdminCategoryCard from "../adminCategoryCard/adminCategoryCard";


export default class AdminCategories extends Component {
  private html: string;

  constructor(protected app: App) {
    super('div', ['admin-categories']);
    this.app = app;
    this.html = '';
  }

  render(): void {
    super.render();
    const card = new AdminCategoryCard(this.app,{name: 'tesst', categoryId: 3}, 6)
    card.render();
    this.element.append(card.element);

  }

  buildHtml(): string {

    return this.html;
  }


}
