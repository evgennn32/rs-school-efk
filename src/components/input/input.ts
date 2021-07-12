import Component from "../Component";
import './input.scss';

export default class Input extends Component {
  protected name: string;

  constructor(name: string, cssClasses: string[], type: string, id: string) {
    cssClasses.push('input')
    super('input', cssClasses);
    this.name = name;
    this.element.id = id;
    const thisElement = <HTMLInputElement>this.element
    thisElement.name = name
    this.element.setAttribute('type', type);
  }

  buildHtml(): string {
    return this.name;
  }
}
