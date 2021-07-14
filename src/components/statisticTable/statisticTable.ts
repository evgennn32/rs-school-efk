import Component from "../Component";
import './statisticTable.scss';
import type App from "../../app";
import StatisticTableRow from "./statisticTableRow";
import Button from "../button/button";

export default class StatisticTable extends Component {

  private html: string;

  private sortBy: string;


  constructor(public app: App) {

    super('table', ['statistic']);
    this.html = ``;
    this.sortBy = 'category';

  }

  render(): void {
    super.render();
    const clearStatisticBtn = new Button('Rest',[]);
    clearStatisticBtn.render();
    clearStatisticBtn.element.addEventListener('click', () => {
      this.app.statisticService.deleteStatistic();
      this.render();
    });
    this.element.prepend(clearStatisticBtn.element);

    const statisticData = this.getStatisticData();
    statisticData.forEach( cardData => {
      const tableRow = new StatisticTableRow(cardData)
      tableRow.render();
      this.element.append(tableRow.element)
    });
    this.renderChildElement(this.createColumnTitle('Category', 'category'),'category-plh')
    this.renderChildElement(this.createColumnTitle('Word', 'word'),'word-plh')
    this.renderChildElement(
      this.createColumnTitle('Translation', 'translation'),
      'translation-plh')
    this.renderChildElement(
      this.createColumnTitle('Training mode click', 'trainingModeClicks'),
      'training-mode-click-plh'
    )
    this.renderChildElement(this.createColumnTitle('Word Guessed', 'wordGuessed'),
      'word-guessed-plh')
    this.renderChildElement(this.createColumnTitle('Errors', 'gameModeErrors'),
      'errors-plh')
    this.renderChildElement(
      this.createColumnTitle('Correct answers, %', 'correctAnswersPercent'),
      'correct-answers-plh'
    )
  }

  buildHtml(): string {
    this.html = `
    <tr>
      <th class="category-plh"></th>
      <th class="word-plh">${this.createColumnTitle('Word', 'word')}</th>
      <th class="translation-plh">Translation</th>
      <th class="training-mode-click-plh"></th>
      <th class="word-guessed-plh"></th>
      <th class="errors-plh"></th>
      <th class="correct-answers-plh"></th>
    </tr>
    `;
    return this.html;
  }

  createColumnTitle(title: string, sortBy: string): HTMLElement {
    const columnTitle = document.createElement('th');
    columnTitle.innerHTML = title;
    columnTitle.classList.add('statistic__column-title')
    if(this.sortBy === sortBy) {
      columnTitle.classList.add('sorted-by');
    }
    columnTitle.title = `Sort by ${title}`
    columnTitle.addEventListener('click', () => {
      this.sortBy = sortBy;
      this.render();
    })
    return columnTitle
  }

  getStatisticData(): {
    category: string;
    word: string;
    translation: string;
    trainingModeClicks: number;
    wordGuessed: number;
    gameModeErrors: number;
    correctAnswersPercent: number
  }[] {

    const allCategories = this.app.gameService.categories
    let allCards = <{category: string;
      word: string;
      translation: string;
      trainingModeClicks: number;
      wordGuessed: number;
      gameModeErrors: number;
      correctAnswersPercent: number}[]>[];
    allCategories.forEach((category, index) => {
      const categoryCards = this.app.gameService.getCardsByCategoryId(index);
      categoryCards.forEach(theCrd => {
        const cardData = this.getCardData(theCrd)
        allCards.push(cardData);
      })
    })
    allCards = this.sortCards(allCards);

    return allCards
  }

  sortCards(allCards: {
    category: string;
    word: string;
    translation: string;
    trainingModeClicks: number;
    wordGuessed: number;
    gameModeErrors: number;
    correctAnswersPercent: number
  }[]): {
      category: string;
      word: string;
      translation: string;
      trainingModeClicks: number;
      wordGuessed: number;
      gameModeErrors: number;
      correctAnswersPercent: number
    }[] {


    const compareFunc = (a: {
      category: string;
      word: string;
      translation: string;
      trainingModeClicks: number;
      wordGuessed: number;
      gameModeErrors: number;
      correctAnswersPercent: number
    }, b: {
      category: string;
      word: string;
      translation: string;
      trainingModeClicks: number;
      wordGuessed: number;
      gameModeErrors: number;
      correctAnswersPercent: number
    }) => {

      switch (this.sortBy) {
        case 'word':
          // eslint-disable-next-line no-nested-ternary
          return (a.word > b.word) ? 1 : ((b.word > a.word) ? -1 : 0);

        case 'translation':
          // eslint-disable-next-line no-nested-ternary
          return (a.translation > b.translation) ? 1 : ((b.translation > a.translation) ? -1 : 0);

        case 'trainingModeClicks':
          // eslint-disable-next-line no-nested-ternary
          return (
            a.trainingModeClicks < b.trainingModeClicks
          ) ? 1 : ((b.trainingModeClicks < a.trainingModeClicks) ? -1 : 0);

        case 'wordGuessed':
          // eslint-disable-next-line no-nested-ternary
          return (a.wordGuessed < b.wordGuessed) ? 1 : ((b.wordGuessed < a.wordGuessed) ? -1 : 0);

        case 'gameModeErrors':
          // eslint-disable-next-line no-nested-ternary
          return (a.gameModeErrors < b.gameModeErrors) ? 1 : ((b.gameModeErrors < a.gameModeErrors) ? -1 : 0);

        case 'correctAnswersPercent':
          // eslint-disable-next-line no-nested-ternary
          return (
            a.correctAnswersPercent < b.correctAnswersPercent
          ) ? 1 : ((b.correctAnswersPercent < a.correctAnswersPercent) ? -1 : 0);

        default:
          // eslint-disable-next-line no-nested-ternary
          return (a.category > b.category) ? 1 : ((b.category > a.category) ? -1 : 0);
      }
    }
    allCards.sort(compareFunc)
    return allCards
  }


  getCardData(
    theCard: {image: string; audioSrc: string; translation: string; word: string; wordId: number; categoryId: number; })
    : {category: string;
      word: string;
      translation: string;
      trainingModeClicks: number;
      wordGuessed: number;
      gameModeErrors: number;
      correctAnswersPercent: number
    } {
    const cardStatistic = this.app.statisticService.getCardStatistic(theCard.wordId);

    return {
      category: this.app.gameService.getCategoryById(theCard.categoryId),
      word: theCard.word,
      translation: theCard.translation,
      trainingModeClicks: cardStatistic.trainingModeClicks,
      wordGuessed: cardStatistic.wordGuessed,
      gameModeErrors: cardStatistic.gameModeErrors,
      correctAnswersPercent:
        StatisticTable.getCorrectAnswersPercent(cardStatistic.wordGuessed, cardStatistic.gameModeErrors)

    };
  }

  static getCorrectAnswersPercent(correctAnswers: number, errors: number): number {
    const result = Math.ceil(correctAnswers / (correctAnswers + errors) * 100)
    return Number.isNaN(result) ? 0 : result;
  }



}
