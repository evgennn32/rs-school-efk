import Component from "../Component";
import './mainContainer.scss';

export default class MainContainer extends Component {

  private readonly html: string;

  constructor() {
    super('section', ['container']);
    this.html = ``;
  }

  buildHtml(): string {
    return this.html;
  }


}
