import Component from "../Component";
import './card.scss';

export default class Card extends Component {

  constructor(public cardData: {word: string, translation: string, image: string, audioSrc: string; cardId: number; }) {
    super('div', ['card__container']);
  }

  render(): void {
    super.render();
    const rotateBtn = document.createElement('div');
    rotateBtn.classList.add('rotate');
    this.renderChildElement(rotateBtn,'rotate-placeholder');
    this.addRotateHandler(rotateBtn);

  }

  buildHtml(): string {
    return `
    <div class="card">
      <div class="card__back" style="background-image: url('./assets/cards/${this.cardData.image}')">
        <div class="card-header">${this.cardData.translation}</div>
      </div>
      <div class="card__front"  style="background-image: url('./assets/cards/${this.cardData.image}')">
        <div class="card-header">${this.cardData.word}</div>
      </div>
      <div class="rotate-placeholder"></div>
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

  addRotateHandler(rotateBtn: HTMLElement): void {
    rotateBtn.addEventListener("click", ()=> {
      this.element.classList.add('card-active');
    })
    this.element.addEventListener('mouseleave', ()=>{
      this.element.classList.remove('card-active');
    })
  }



}
