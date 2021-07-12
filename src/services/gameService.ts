import Card from "../components/card/card";
import type App from "../app";
import { cards, categories, categoriesImages } from "../assets/cards/cards";
import Congratulations from "../components/congratulations/congratulations";
import {SOUND_STORAGE} from "../shared/constants";


export default class GameService {

  public cardsData: { image: string;
    audioSrc: string;
    translation: string;
    word: string;
    cardId: number;
    categoryId: number;
  } [][];

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

  public categoriesImages: string[];

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
    this.categories = categories;
    this.categoriesImages = categoriesImages;
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
    let result = true;
    this.cards.forEach(theCard => {
      if (!theCard.element.classList.contains('inactive')) {
        result = false;
      }
    });
    this.gameData.gameFinished = result;
    return result;
  }


  showCongratulations(): void {
    const congrats = new Congratulations(this.gameData.incorrectMoves);
    congrats.render();
    const gameContainer = document.querySelector('.game__cards-field');
    if (gameContainer) {
      gameContainer.replaceWith(congrats.element);
      if(this.gameData.incorrectMoves){
        this.playSound('failure.mp3');
      } else {
        this.playSound('success.mp3');
      }

    }
  }

  playSound(sound: string): void {
    if (!this.playingSound) {
      const audio = new Audio(`${SOUND_STORAGE}/${sound}`);
      audio.play().catch((e) => {
        Error(e.message);
      });
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
      this.playSound('correct.mp3');
      return true;
    }
    this.playSound('error.mp3');
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
    setTimeout(() => {
      this.app.renderPage('home');
    }, 2000);
    this.clearGameData(true);
  }

  getCardsByCategoryId(id: number):{ image: string;
    audioSrc: string;
    translation: string;
    word: string;
    cardId: number;
    categoryId: number;
  } [] {

    return this.cardsData[id]
  }

  getCategoryById(id: number): string {
    return this.categories[id]
  }


}
