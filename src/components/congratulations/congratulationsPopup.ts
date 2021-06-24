import Component from "../Component";
import Congratulations from "./congratulations";
import './congratulationsPopup.scss';
import type App from "../../app";

export default class CongratulationsPopup extends Component {

  private html: string;

  constructor(private readonly time: string, private app: App) {
    super('div', ['popup']);
    this.html = ``;
  }

  render(): void {
    super.render();
    const congratulations = new Congratulations(this.time);
    congratulations.render();
    this.renderChildComponent(congratulations, 'congratulations-placeholder');
    this.addHandlers();
  }

  buildHtml(): string {
    this.html = `<div class="popup__content">
                <div class="congratulations-placeholder"></div>
               </div>`
    return this.html;
  }

  addHandlers(): void {
    const okBtn = this.element.querySelector('.ok-btn');
    if(okBtn){
      okBtn.addEventListener('click', ()=>{
        this.destroyPopup();
        this.app.renderPage('score');

      });
    }
  }

  destroyPopup(): void {
    this.element.remove();
  }
}
