import Component from "../Component";
import './loader.scss';

export default class Loader extends Component {
  private html: string;

  constructor(cssClasses: string[]) {
    cssClasses.push('loader')
    super('div', cssClasses);
    this.html = '<div></div><div></div><div></div><div></div>';


  }

  buildHtml(): string {
    return this.html;
  }
}
