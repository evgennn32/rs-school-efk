import Header from "../components/header/header";
import Component from "../components/Component";
import type App from "../app";


export default class HomePage extends Component {
  private html: string;

  private temp: boolean;

  private categories: string[] | { image: string; audioSrc: string; translation: string; word: string }[];

  constructor(protected app: App) {
    super('div', ['main-container']);
    this.render();
    this.html = '';
    this.temp = false;
    [this.categories] = this.app.gameService.cardsData;
  }

  render(): void {
    super.render();
    const header = new Header(this.app);
    this.renderChildComponent(header, 'header-placeholder');
    console.log(this.categories)


  }

  buildHtml(): string {
    this.html = `
            <div class="header-placeholder"></div>
            <main class="main container">
              <div class="container__wrapper">
              </div>
            </main>
            `;
    return this.html;
  }

}
