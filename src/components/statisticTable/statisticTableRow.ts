import Component from "../Component";
import './statisticTable.scss';
import type App from "../../app";

export default class StatisticTable extends Component {

  private html: string;


  constructor(public app: App) {

    super('table', ['statistic']);
    this.html = ``;

  }

  render() {
    super.render();


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



}
