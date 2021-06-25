import Component from "../Component";
import Card from "../card/card";
import './cardsfield.scss';
import type App from "../../app";

export default class CardsField extends Component {

  private cards: { image: string; audioSrc: string; translation: string; word: string }[];

  private activeCard?: Card;

  private html: string;

  constructor(private app: App) {
    super('div', ['game__cards-field']);
    this.cards = this.app.gameService.cardsData[this.app.appData.categoryId];
    this.shuffleCards();
    this.html = ``;
  }

  render(): void {
    super.render();

    this.cards.forEach(cardData => {

      const newCard = new Card(cardData);
      newCard.render()
      this.cardHandler(newCard);
      this.element.append(newCard.element);
    })

    // this.cards = this.images.map((image, index) => {
    //   const card = new Card(image);
    //   this.renderChildComponent(card, `card-placeholder-${index}`);
    //   return card;
    // });
    //
    // this.cards.forEach((card) => {
    //   card.flipToFront();
    //
    //   card.element.addEventListener('click', () => {
    //     this.cardHandler(card);
    //   });
    // });
  }

  private async cardHandler(card: Card): Promise<null | Promise<unknown>> {
    if (card.element.classList.contains('card-active') || this.app.gameService.gameStopped()) {
      return;
    }
    // await card.flipToFront();

    // if (!this.activeCard) {
    // this.activeCard = card;

    // } else {

    // if (this.activeCard.cardData.image !== card.cardData.image) {
    //   this.activeCard.markNoCoincided();
    //   card.markNoCoincided();
    //   this.activeCard.flipToBack();
    //
    //
    //   this.activeCard = undefined;
    // } else {
    //   this.activeCard.markCoincided();
    //   card.markCoincided();
    //   this.activeCard = undefined;
    // }

    // }
    if (this.app.gameService.allCardsActive()) {
      this.app.gameService.stopGame();
      this.app.gameService.showCongratulations();
    }
  }

  buildHtml(): string {
    return this.html;
  }

  shuffleCards(): void {
    this.cards.sort(() => Math.random() - .5);
  }
}
