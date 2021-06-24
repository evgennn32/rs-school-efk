import Header from "../components/header/header";
import Component from "../components/Component";
import type App from "../app";


export default class HomePage extends Component {
  private html: string;

  private temp: boolean;

  constructor(protected app: App) {
    super('div', ['main-container']);
    this.render();
    this.html = '';
    this.temp = false;
  }

  render(): void {
    super.render();
    const header = new Header(this.app);
    this.renderChildComponent(header, 'header-placeholder');

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
