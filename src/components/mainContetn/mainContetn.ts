import Component from "../Component";
import Game from "../game/game";
import type App from "../../app";

export default class MainContent extends Component {
  private mainPlaceholder: string;

  constructor(protected app: App) {
    super('section', ['main-container']);
    this.mainPlaceholder = 'game-placeholder';
  }

  render(): void {
    super.render();
    const game = new Game(this.app);
    this.renderChildComponent(game, 'game-placeholder');
  }

  buildHtml(): string {

    return `<div class="main-content__wrapper">
            <div class="game">
              <div class="game-wrapper">
                  <div class="${this.mainPlaceholder}"></div>
              </div>
            </div>
          </div>`;
  }
}
