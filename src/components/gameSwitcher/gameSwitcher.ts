import Component from "../Component";
import './gameSwitcher.scss';

export default class GameSwitcher extends Component {
  private html: string;

  constructor( cssClasses: string[]) {
    cssClasses.push('game-switcher');
    super('div', cssClasses);
    this.html = '';
  }

  buildHtml(): string {
    this.html = `
                <label class="switch">
                  <input class="switch-input" type="checkbox" checked />
                  <span class="switch-label" data-on="Play" data-off="Train"></span>
                  <span class="switch-handle"></span>
                </label>
                `;
    return this.html;
  }
}
