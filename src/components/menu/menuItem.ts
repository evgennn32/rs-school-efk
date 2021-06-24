import Component from "../Component";


export default class MenuItem extends Component {

  private readonly html: string;

  constructor(classes: string[], protected title:string) {
    super('li', classes);
    this.html = title;
  }

  render(): void {
    super.render();
  }

  buildHtml(): string {
    return this.html;
  }

}
