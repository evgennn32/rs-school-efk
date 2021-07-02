import Component from "../Component";
import './statisticTable.scss';
import type App from "../../app";
import StatisticTableRow from "./statisticTableRow";
import card from "../card/card";
import Button from "../button/button";

export default class StatisticTable extends Component {

  private html: string;
  
  private sortBy: string;


  constructor(public app: App) {

    super('table', ['statistic']);
    this.html = ``;
    this.sortBy = 'category';

  }

  render() {
    super.render();
    const clearStatisticBtn = new Button('Clear Statistic',[]);
    clearStatisticBtn.render();
    clearStatisticBtn.element.addEventListener('click', () => {
      this.app.statisticService.deleteStatistic();
      console.log('clear')
      this.render();
    })
    this.element.prepend(clearStatisticBtn.element);

    const statisticData = this.getStatisticData();
    statisticData.forEach( cardData => {
      const tableRow = new StatisticTableRow(cardData)
      tableRow.render();
      this.element.append(tableRow.element)
    });
  }

  buildHtml(): string {
    this.html = `
    <tr>
      <th>Category</th>
      <th>Word</th>
      <th>Translation</th>
      <th>Training mode click</th>
      <th>Word Guessed</th>
      <th>Errors</th>
      <th>Correct answers, %</th>
    </tr>
    `;
    return this.html;
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

    // get all categories
    const allCategories = this.app.gameService.categories
    const allCards = <{category: string;
      word: string;
      translation: string;
      trainingModeClicks: number;
      wordGuessed: number;
      gameModeErrors: number;
      correctAnswersPercent: number}[]>[];
    allCategories.forEach((category, index) => {
      const categoryCards = this.app.gameService.getCardsByCategoryId(index);
      categoryCards.forEach(card => {
        const cardData = this.getCardData(card)
        allCards.push(cardData)



      })

    })
    // get all cards
    // add data to each card


    return allCards
  }

  getCardData(
    card: {image: string; audioSrc: string; translation: string; word: string; cardId: number; categoryId: number; })
    : {category: string;
      word: string;
      translation: string;
      trainingModeClicks: number;
      wordGuessed: number;
      gameModeErrors: number;
      correctAnswersPercent: number
    } {
    const cardStatistic = this.app.statisticService.getCardStatistic(card.cardId);

    return {
      category: this.app.gameService.getCategoryById(card.categoryId),
      word: card.word,
      translation: card.translation,
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
