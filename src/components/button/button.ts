import Component from "../Component";
import './button.scss';

export default class Button extends Component {
  protected title: string;

  constructor(title: string, cssClasses: string[], type?: string) {
    cssClasses.push('btn')
    super('button', cssClasses);
    this.title = title;
    if(type) {
      this.element.setAttribute('type', type);
    }
  }

  buildHtml(): string {
    return this.title;
  }
}
