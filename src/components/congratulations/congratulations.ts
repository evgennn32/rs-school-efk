import Component from "../Component";
import Button from "../button/button";

export default class Congratulations extends Component {

  private html: string;

  constructor(private readonly time: string) {
    super('div', ['congratulations-wrapper']);
    this.html = ``;
  }

  render(): void {
    super.render();
    const paragraph = document.createElement('p');
    paragraph.innerHTML = this.getCongratulationsText();
    this.element.appendChild(paragraph);
    const okBtn = new Button('OK',['ok-btn']);
    okBtn.render();
    this.element.appendChild(okBtn.element);
  }

  buildHtml(): string {
    return this.html;
  }

  getCongratulationsText(): string {
    return `Congratulations! You successfully found all matches on ${this.time} minutes.`
  }
}
