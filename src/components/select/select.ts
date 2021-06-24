import Component from "../Component";

export default class Select extends Component{
  private html: string;

  constructor() {
    super();
    this.html = '';
  }

  render(): void {
    super.render();
  }

  buildHtml(): string {
    return this.html;
  }

}
