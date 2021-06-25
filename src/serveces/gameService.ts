import Card from "../components/card/card";
import type App from "../app";
import Button from "../components/button/button";
import cards from "../assets/cards/cards";


export default class GameService {

  private gameFinished: boolean;

  public cardsData: { image: string; audioSrc: string; translation: string; word: string } [][];

  public categories: string[];

  private playingSound: boolean;

  constructor(protected app: App) {

    this.gameFinished = false;
    this.cardsData = cards;
    this.categories = ['Action (set A)', 'Action (set B)', 'Animal (set A)', 'Animal (set B)', 'Clothes', 'Emotions'];
    this.playingSound = false;

  }

  startGame(): void {
    this.initControlBtn();
  }

  startNewGame(): void {
    this.app.renderPage('game');
  }

  stopGame(): void {
    this.gameFinished = true;
  }

  gameStopped(): boolean {
    return this.gameFinished;
  }

  allCardsActive(): boolean {
    const cardsAll = document.querySelectorAll('.card');
    let result = true;
    cardsAll.forEach(el => {
      if (!el.classList.contains('card-active')) {
        result = false;
      }
    });
    this.gameFinished = result;
    return result;
  }

  allCardsCoincided(cardsAll: Card[]): boolean {
    let result = true;
    cardsAll.forEach(el => {
      if (!el.element.classList.contains('coincided')) {
        result = false;
      }
    });
    this.gameFinished = result;
    return result;
  }

  initControlBtn(): void {
    const controlBtn = document.querySelector('.start-btn');
    const newControlBtn = new Button('STOP GAME', ['game-control-btn']);
    newControlBtn.render();
    if (controlBtn) {
      controlBtn.replaceWith(newControlBtn.element);
      newControlBtn.element.addEventListener('click', () => {
        this.controlBtnHandler(newControlBtn.element);
      })
    }
  }

  controlBtnHandler(controlBtn: HTMLElement): void {
    if (this.gameFinished) {
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

  playSound(sound: string): void {
    if (!this.playingSound) {
      const audio = new Audio(`./../assets/cards/${sound}`);
      audio.play();
    }

  }
}
