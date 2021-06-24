import Component from "../Component";
import Card from "../card/card";
import './cardsfield.scss';
import GameService from "../../serveces/gameService";

export default class CardsField extends Component {

  private images: string[];

  private cards: Card[];

  private activeCard?: Card;

  private gameService: GameService;

  constructor(gameService: GameService) {
    super('div', ['game__cards-field']);
    this.gameService = gameService;
    this.images = this.getImages();
    this.cards = [];
  }

  render(): void {
    super.render();
    this.cards = this.images.map((image, index) => {
      const card = new Card(image);
      this.renderChildComponent(card, `card-placeholder-${index}`);
      return card;
    });

    this.cards.forEach((card) => {
      card.flipToFront();
      setTimeout(() => {
        card.flipToBack()
      }, this.gameService.timeToRemember * 1000);
      card.element.addEventListener('click', () => {
        this.cardHandler(card);
      });
    });
    setTimeout(() => this.gameService.startGame(), this.gameService.timeToRemember * 1000);
  }

  private async cardHandler(card: Card): Promise<null | Promise<unknown>> {
    if (card.element.classList.contains('card-active') || this.gameService.gameStopped()) {
      return;
    }
    await card.flipToFront();

    if (!this.activeCard) {
      this.activeCard = card;

    } else {

      if (this.activeCard.image !== card.image) {
        this.activeCard.markNoCoincided();
        card.markNoCoincided();
        this.activeCard.flipToBack();
        card.flipToBack();

        this.activeCard = undefined;
      } else {
        this.activeCard.markCoincided();
        card.markCoincided();
        this.activeCard = undefined;
      }
      if (this.gameService.allCardsActive(this.cards)) {
        this.gameService.stopGame();
        this.gameService.showCongratulations();
      }
    }
  }

  buildHtml(): string {
    let html = '';
    this.images.forEach((el, index) => {
      html = `${html}<div class="card-placeholder-${index}"></div>`
    })
    return html;
  }

  getImages(): string[] {
    const images: string[] = [];
    for (let i = 0; i < this.gameService.difficulty; i+=1) {
      images.push(`${this.gameService.cardType}-${i}.svg`)
    }
    return images.concat(images).sort(() => Math.random() - .5);
  }
}
