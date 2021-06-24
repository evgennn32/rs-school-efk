import Component from "../Component";
import './h1.scss';

export default class H1 extends Component {

  private html: string;

  constructor(private readonly content: string) {
    super('h1', ['h1']);
    this.html = this.content;
  }

  render(): void {
    super.render();
  }

  buildHtml(): string {
    return this.html;
  }
}
