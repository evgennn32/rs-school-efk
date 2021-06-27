import Component from "../Component";
import './congratulations.scss';

export default class Congratulations extends Component {

  private html: string;

  private readonly congratsText: string;

  constructor(protected fails: number) {
    super('div', ['congratulations']);
    this.html = ``;
    const errorText = fails > 1 ? 'error' : 'errors';
    this.congratsText = fails ? `Fail! ${fails} ${errorText}` : `Congratulations`;

  }

  render(): void {
    super.render();

  }

  buildHtml(): string {
    this.html = `
    <h2>${this.congratsText}</h2>
    <div class="congratulations__smile${this.fails ? '-sad' : ''}"></div>
    `;
    return this.html;
  }
}
