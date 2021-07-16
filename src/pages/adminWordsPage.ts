import Component from "../components/Component";
import type App from "../app";
import AdminHeader from "../components/adminHeader/AdminHeader";
import AdminWords from "../components/adminWords/adminWords";
import AdminFooter from "../components/adminFooter/adminFooter";


export default class AdminWordsPage extends Component {
  private html: string;


  constructor(protected app: App) {
    super('div', ['main-container']);
    this.html = '';
  }

  render(): void {
    super.render();
    const header = new AdminHeader(this.app);
    this.renderChildComponent(header, 'header-placeholder');
    const wordsField = new AdminWords(this.app);
    this.renderChildComponent(wordsField, 'active-page-placeholder');
    const footer = new AdminFooter();
    this.renderChildComponent(footer,'footer-plh');
  }

  buildHtml(): string {
    this.html = `
            <div class="header-placeholder"></div>
            <main class="main container">
              <div class="container__wrapper">
                <div class="active-page-placeholder"></div>
              </div>
            </main>
            <footer class="footer-plh"></footer>
            `;
    return this.html;
  }


}
