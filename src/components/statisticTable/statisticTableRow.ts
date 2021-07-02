import Component from "../Component";
import './statisticTable.scss';
import type App from "../../app";

export default class StatisticTableRow extends Component {

  private html: string;


  constructor(private cardData: {category: string;
    word: string;
    translation: string;
    trainingModeClicks: number;
    wordGuessed: number;
    gameModeErrors: number;
    correctAnswersPercent: number
  }) {

    super('tr', ['statistic__table-row']);
    this.html = ``;
  }

  render() {
    super.render();
  }

  buildHtml(): string {
    this.html = `


      <td>${this.cardData.category}</td>
      <td>${this.cardData.word}</td>
      <td>${this.cardData.translation}</td>
      <td>${this.cardData.trainingModeClicks}</td>
      <td>${this.cardData.wordGuessed}</td>
      <td>${this.cardData.gameModeErrors}</td>
      <td>${this.cardData.correctAnswersPercent} %</td>

        `;
    return this.html;
  }



}
