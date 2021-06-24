import Component from "../Component";
import './categoryCard.scss';

export default class CategoryCard extends Component {
  public readonly image: string;

  constructor(cardData:{image: string; title: string;}) {
    super('div', ['card']);
    this.image = cardData.image;
  }

  buildHtml(): string {
    return `
    <div class="card__container">
    <div class="card__front"></div>
    <div class="card__back" style="background-image: url('./assets/images/${this.image}')"></div>
    </div>
    `;
  }

  flipToBack(): Promise<void> {
    return this.flip(true)
    // this.element.classList.remove('card-active');
  }

  flipToFront(): Promise<void> {
    return this.flip(false)
    // this.element.classList.remove('card-active')
  }

  flip(isFront = false): Promise<void> {
    return new Promise<void>((resolve) => {
      this.element.classList.toggle('card-active',!isFront);
      this.element.addEventListener('transitionend',() => resolve(), {
        once: true,
      });
    })
  }

  markCoincided(): void {
    this.element.classList.add('coincided');
  }

  markNoCoincided(): void {
    this.element.classList.add('no-coincided');
  }
}
