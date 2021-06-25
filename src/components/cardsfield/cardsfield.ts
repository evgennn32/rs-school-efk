import Component from "../Component";
import Card from "../card/card";
import './cardsfield.scss';
import type App from "../../app";
import Button from "../button/button";

export default class CardsField extends Component {

  private cards: { image: string; audioSrc: string; translation: string; word: string }[];

  private activeCard?: Card;

  private html: string;

  constructor(private app: App) {
    super('div', ['game__cards-field']);
    this.cards = this.app.gameService.cardsData[this.app.appData.categoryId];
    this.html = ``;
  }

  render(): void {
    super.render();

    this.cards.forEach(cardData => {

      const newCard = new Card(cardData);
      newCard.render()
      this.app.gameService.cards.push(newCard);
      newCard.element.addEventListener('click', () => {
        this.cardHandler(newCard);
      });
      this.element.append(newCard.element);
    })

    const startGameBtn = new Button('Start game',[]);
    startGameBtn.render()
    startGameBtn.element.addEventListener('click', (event)=> {
      this.app.gameService.startGameBtnHandler(event)
    });
    const btnsWrapper = document.createElement('div');
    btnsWrapper.classList.add('btns-wrapper');
    btnsWrapper.append(startGameBtn.element);
    this.element.append(btnsWrapper);


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

    if (card.element.classList.contains('card-active')) {
      return;
    }
    this.app.gameService.playSound(card.cardData.audioSrc);


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


}
