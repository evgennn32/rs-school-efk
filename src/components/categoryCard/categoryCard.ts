import Component from "../Component";
import './categoryCard.scss';
import {IMAGE_STORAGE} from "../../shared/constants";

export default class CategoryCard extends Component {

  constructor(private cardData:{image: string; title: string;}) {
    super('div', []);
  }

  buildHtml(): string {
    return `
    <a href="/cards" class="category-card green">
      <img class="category-card__image" src="${IMAGE_STORAGE}/${this.cardData.image}" alt="${this.cardData.title}"/>
      <div class="category-card__title"><h4>${this.cardData.title}</h4></div>
    </a>
    `;
  }

}
