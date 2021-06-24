import Component from "../Component";
import './game.scss';
import CardsField from "../cardsfield/cardsfield"
import GameService from "../../serveces/gameService";
import type App from "../../app";




export default class Game extends Component {

  private timeToRemember: number;

  private html: string;

  private gameService: GameService;

  constructor(protected app: App) {
    super('div',['game__cards']);
    this.gameService = new GameService(this.app);
    this.timeToRemember = 5;
    this.html = `<div class="timer-placeholder"></div>
                 <div class="cards-field-placeholder"></div>`;
  }

  render(): void {
    super.render();
    const  cardsField = new CardsField(this.gameService);
    this.renderChildComponent(cardsField, `cards-field-placeholder`);
  }

  buildHtml(): string {
    return this.html;
  }
}
