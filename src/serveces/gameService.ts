import Card from "../components/card/card";
import type App from "../app";
import CongratulationsPopup from "../components/congratulations/congratulationsPopup";
import Button from "../components/button/button";


export default class GameService {

  public timeToRemember: number;

  public cardType: string;

  public difficulty: number;

  private gameFinished: boolean;

  constructor(protected app: App) {
    this.timeToRemember = 5;
    this.cardType = 'animal';
    this.difficulty = 4;
    this.gameFinished = false;

  }

  startGame(): void {
    this.initControlBtn();
  }

  startNewGame():void {
    this.app.renderPage('game');
  }

  stopGame(): void {
    this.gameFinished = true;
  }

  gameStopped(): boolean {
    return this.gameFinished;
  }

  allCardsActive(cards: Card[]): boolean {
    let result = true;
    cards.forEach(el => {
      if (!el.element.classList.contains('card-active')) {
        result = false;
      }
    });
    this.gameFinished = result;
    return result;
  }

  allCardsCoincided(cards: Card[]): boolean {
    let result = true;
    cards.forEach(el => {
      if (!el.element.classList.contains('coincided')) {
        result = false;
      }
    });
    this.gameFinished = result;
    return result;
  }

  initControlBtn(): void {
    const controlBtn = document.querySelector('.start-btn');
    const newControlBtn = new Button('STOP GAME',['game-control-btn'] );
    newControlBtn.render();
    if (controlBtn){
      controlBtn.replaceWith(newControlBtn.element);
      newControlBtn.element.addEventListener('click', () => {
        this.controlBtnHandler(newControlBtn.element)
      })
    }
  }

  controlBtnHandler(controlBtn: HTMLElement): void {
    if(this.gameFinished) {
      this.startNewGame();
    } else {
      controlBtn.innerHTML = "Start Game";
      this.stopGame();
    }
  }




  showCongratulations(): void {
    const popupWrapper = <HTMLElement>document.getElementById('congratulations-popup');
    if (popupWrapper) {
     // const congratulations = new CongratulationsPopup(this.timer.getTime(), this.app);
    //  congratulations.render();
     // popupWrapper.appendChild(congratulations.element);
    }
  }
}
