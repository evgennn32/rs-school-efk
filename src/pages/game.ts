import Header from "../components/header/header";
import MainContent from "../components/mainContetn/mainContetn";
import Component from "../components/Component";
import type App from "../app";

export default class GamePage extends Component {
  private html: string;

  constructor(protected app: App) {
    super('div',['game-container']);
    this.html = '';
  }

  render(): void {
    super.render();
    const header = new Header(this.app);
    const mainContent = new MainContent(this.app);
    this.renderChildComponent(header, 'header-placeholder');
    this.renderChildComponent(mainContent, 'maincontent-placeholder');
  }

  buildHtml(): string {

    this.html =  `
            <div class="header-placeholder"></div>
            <div class="maincontent-placeholder"></div>
            `;
    return this.html;
  }
}
