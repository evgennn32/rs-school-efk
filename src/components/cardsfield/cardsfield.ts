import Component from "../Component";
import Card from "../card/card";
import './cardsfield.scss';
import type App from "../../app";
import Button from "../button/button";

export default class CardsField extends Component {

  private cards: { image: string; audioSrc: string; translation: string; word: string; cardId: number }[];

  private activeCard?: Card;

  private readonly html: string;

  constructor(private app: App) {
    super('div', ['game__cards-field']);
    const currentGameMode = this.app.gameService.gameData.gameMode
    this.app.gameService.clearGameData(true);
    this.app.gameService.gameData.gameMode = currentGameMode
    this.cards = this.app.gameService.cardsData[this.app.appData.categoryId];
    this.html = `<div class="rating" id="rating"></div>
                  <h1 class="h1">${this.app.gameService.categories[this.app.appData.categoryId]}</h1>

`;
  }

  render(): void {
    super.render();
    if (this.app.gameService.gameData.gameMode) {
      this.element.classList.add('game-mode')
    }

    this.cards.forEach(cardData => {

      const newCard = new Card(cardData);
      newCard.render()
      this.app.gameService.cards.push(newCard);
      newCard.element.addEventListener('click', (event) => {
        this.cardHandler(newCard, event);
      });
      this.element.append(newCard.element);
    })

    const startGameBtn = new Button('Start', []);
    startGameBtn.render()
    startGameBtn.element.addEventListener('click', (event) => {
      this.app.gameService.startGameBtnHandler(event)
    });
    const btnsWrapper = document.createElement('div');
    btnsWrapper.classList.add('btns-wrapper');
    btnsWrapper.append(startGameBtn.element);
    this.element.append(btnsWrapper);
  }

  private async cardHandler(card: Card, event: MouseEvent): Promise<null | Promise<unknown>> {
    let isRotateBtn = false
    if (event.target && event.target) {
      const target = <HTMLElement>event.target;
      if (target.classList.contains('rotate')) {
        isRotateBtn = true;
      }
      if (card.element.classList.contains('inactive')) {
        return;
      }
      if (!this.app.gameService.gameData.gameStarted) {
        if (!isRotateBtn) {
          this.app.gameService.playSound(card.cardData.audioSrc);
          this.app.statisticService.updateCardStatistic(card.cardData.cardId, 'trainingModeClick');
        }
      } else {
        const isCorrectCard = this.app.gameService.compareSounds(card.cardData.audioSrc);
        this.app.gameService.addRating(isCorrectCard)
        if (isCorrectCard) {
          this.app.statisticService.updateCardStatistic(card.cardData.cardId, 'wordGuessed');
          card.element.classList.add('inactive');
          if (!this.app.gameService.allCardsActive()) {
            this.app.gameService.playNextCard();
          } else {
            this.app.gameService.finishGame();
          }
        } else {
          this.app.statisticService.updateCardStatistic(card.cardData.cardId, 'gameModeError');
        }
      }

      if (this.app.gameService.allCardsActive()) {
        this.app.gameService.stopGame();
        this.app.gameService.showCongratulations();
      }
    }
  }

  buildHtml(): string {
    return this.html;
  }
}
