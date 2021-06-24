import Component from "../Component";
import './categoryCard.scss';

export default class CategoryCard extends Component {

  constructor(private cardData:{image: string; title: string;}) {
    super('div', []);
  }

  buildHtml(): string {
    return `
    <a href="/cards" class="category-card green">
      <img class="category-card__image" src="./assets/cards/img/${this.cardData.image}.jpg"></img>
      <div class="category-card__title"><h4>${this.cardData.title}</h4></div>
    </a>
    `;
  }

}
