import Component from "../Component";
import './popUp.scss';



export default class PopUp extends Component {
  private html: string;

  constructor(id: string, private popUpContent: Component) {
    super('div', ['popup', 'hidden']);
    this.html = ``;
    this.element.id = id;
  }

  render(): void {
    super.render();
    this.renderChildComponent(this.popUpContent,'content-placeholder');
  }

  buildHtml(): string {
    this.html = `<div class="popup__content">
                <div class="content-placeholder"></div>
               </div>`;
    return this.html;
  }


}
