import Card from "../components/card/card";
import type App from "../app";
import Button from "../components/button/button";
import cards from "../assets/cards/cards";


export default class GameService {

  public cardsData: { image: string; audioSrc: string; translation: string; word: string } [][];

  public categories: string[];

  private playingSound: boolean;

  public cards: Card[];

  public gameData: { gameStarted: boolean; gameMode: boolean; gameFinished: boolean; currentCardIndex: number };

  constructor(protected app: App) {

    this.gameData = {
      gameMode: false,
      gameStarted: false,
      gameFinished: false,
      currentCardIndex: 0,
    }
    this.cardsData = cards;
    this.categories = ['Action (set A)', 'Action (set B)', 'Animal (set A)', 'Animal (set B)', 'Clothes', 'Emotions'];
    this.playingSound = false;
    this.cards = []

  }

  startGame(): void {
    this.gameData.gameStarted = true;
    this.shuffleCards();
    this.playSound(this.cards[0].cardData.audioSrc);
  }

  switchGameMode(isGameMode: boolean): void {

    this.gameData.gameMode = isGameMode;
    const cardsField = document.querySelector('.game__cards-field');
    if (cardsField) {
      if (isGameMode) {
        cardsField.classList.add('game-mode');
      } else {
        cardsField.classList.remove('game-mode');
      }

    }
  }

  stopGame(): void {
    // this.gameFinished = true;
  }

  gameStopped(): boolean {
    return this.gameData.gameFinished;
  }

  allCardsActive(): boolean {
    const cardsAll = document.querySelectorAll('.card__container');
    let result = true;
    this.cards.forEach(theCard => {
      if (!theCard.element.classList.contains('inactive')) {
        result = false;
      }
    });
     this.gameData.gameFinished = result;
    return result;
  }

  allCardsCoincided(cardsAll: Card[]): boolean {
    let result = true;
    cardsAll.forEach(el => {
      if (!el.element.classList.contains('coincided')) {
        result = false;
      }
    });
    // this.gameFinished = result;
    return result;
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

  playNextCard(): void {
    console.log('here')
    this.gameData.currentCardIndex += 1;
    this.repeatSound();
  }

  repeatSound(): void {
    const currentCard = this.cards[this.gameData.currentCardIndex]
    this.playSound(currentCard.cardData.audioSrc);

  }

  startGameBtnHandler(event: Event): void {
    if (!this.gameData.gameStarted) {
      this.startGame();
      const btn = <HTMLElement>event.target;
      btn.classList.add('repeat');
    } else {
      this.repeatSound();
    }
  }

  shuffleCards(): void {
    this.cards.sort(() => Math.random() - .5);
  }

  compareSounds(sound: string): boolean {
    if (sound === this.cards[this.gameData.currentCardIndex].cardData.audioSrc) {
      this.playSound('audio/correct.mp3');
      return true;
    }
    this.playSound('audio/error.mp3');
    return false;


  }

  finishGame(): void {
    // TODO send statistic
    // TODO show congratulations
    // TODO load home Page
    console.log('game.finished')

  }


}
