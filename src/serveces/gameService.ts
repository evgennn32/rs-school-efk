import Card from "../components/card/card";
import type App from "../app";
import cards from "../assets/cards/cards";
import Congratulations from "../components/congratulations/congratulations";


export default class GameService {

  public cardsData: { image: string; audioSrc: string; translation: string; word: string } [][];

  public categories: string[];

  private readonly playingSound: boolean;

  public cards: Card[];

  public gameData: {
    gameStarted: boolean;
    gameMode: boolean;
    gameFinished: boolean;
    currentCardIndex: number;
    correctMoves: number;
    incorrectMoves: number
  };

  constructor(protected app: App) {

    this.gameData = {
      gameMode: false,
      gameStarted: false,
      gameFinished: false,
      currentCardIndex: 0,
      correctMoves: 0,
      incorrectMoves: 0,
    }
    this.cardsData = cards;
    this.categories = ['Action (set A)', 'Action (set B)', 'Animal (set A)', 'Animal (set B)', 'Clothes', 'Emotions'];
    this.playingSound = false;
    this.cards = [];

  }

  clearGameData(clearCards = false): void {
    this.gameData = {
      gameMode: false,
      gameStarted: false,
      gameFinished: false,
      currentCardIndex: 0,
      correctMoves: 0,
      incorrectMoves: 0,
    }
    GameService.clearRating()
    if (clearCards) {
      this.cards = [];
    }
    const startGameBtn = document.querySelector('.game__cards-field .repeat');
    if (startGameBtn) {
      startGameBtn.classList.remove('repeat');
      startGameBtn.innerHTML = 'Start game'
    }
  }

  static clearRating(): void {
    const ratingField = document.getElementById('rating')
    if (ratingField) {
      ratingField.innerHTML = '';
    }
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
        this.stopGame();
      }
    }
  }

  stopGame(): void {
    this.clearGameData();
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
    console.log(this)
    return result;
  }


  showCongratulations(): void {
    const congrats = new Congratulations(this.gameData.incorrectMoves);
    congrats.render();
    const gameContainer = document.querySelector('.game__cards-field');
    if (gameContainer) {
      gameContainer.replaceWith(congrats.element);
    }
  }

  playSound(sound: string): void {
    if (!this.playingSound) {
      const audio = new Audio(`./../assets/cards/${sound}`);
      audio.play();
    }
  }

  playNextCard(): void {
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
      btn.innerHTML = '';
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

  addRating(isPositive: boolean): void {
    let starType = 'yellow';
    if (!isPositive) {
      starType = 'grey';
      this.gameData.incorrectMoves += 1;
    } else {
      this.gameData.correctMoves += 1;
    }

    const ratingContainer = document.querySelector('#rating');
    const star = document.createElement('div');
    star.classList.add('star', starType);
    if (ratingContainer) {
      ratingContainer.prepend(star);
    }
  }

  finishGame(): void {


    this.showCongratulations();
    // TODO send statistic
    setTimeout(() => {
      this.app.renderPage('home');
    }, 2000);

    this.clearGameData();
  }


}
