import Component from "../Component";
import './statisticTable.scss';
import type App from "../../app";

export default class StatisticTable extends Component {

  private html: string;


  constructor(public app: App) {

    super('div', ['statistic']);
    this.html = ``;

  }

  render() {
    super.render();
    const statisticData = this.getStatisticData();


  }

  buildHtml(): string {
    this.html = `
    <table>
    <tr>
      <th>Category</th>
      <th>Word</th>
      <th>Translation</th>
      <th>Training mode click</th>
      <th>Word Guessed</th>
      <th>Errors</th>
      <th>Correct answers, %</th>
    </tr>
    <tr class="table-data-plh"></tr>

    </table>

    `;
    return this.html;
  }

  getStatisticData(): {
    category: string;
    word: string;
    translation: string;
    trainingModeClick: number;
    wordGuessed: number;
    gameModeError: number;
    correctAnswersPercent: string
  }[] {

    // get all categories
    const allCategories = this.app.gameService.categories
    const allCards = [];
    allCategories.forEach((category, index) => {
      const categoryCards = this.app.gameService.getCardsByCategoryId(index);
      categoryCards.forEach(card => {
        const cardData = this.getCardData(card)
        console.log(cardData)
      })

    })
    // get all cards
    // add data to each card


    return []
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
