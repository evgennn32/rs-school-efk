import Component from "../components/Component";
import type App from "../app";
import AdminHeader from "../components/adminHeader/AdminHeader";

// import {changeCategory} from "../redux/actions";


export default class AdminPage extends Component {
  private html: string;



  constructor(protected app: App) {
    super('div', ['main-container']);
    this.html = '';
  }

  render(): void {
    super.render();
    const header = new AdminHeader(this.app);
    this.renderChildComponent(header, 'header-placeholder');

  }

  buildHtml(): string {
    this.html = `
            <div class="header-placeholder"></div>
            <main class="main container">
              <div class="container__wrapper">
                <div class="active-page-placeholder"></div>
              </div>
            </main>
            <footer>

            </footer>
            `;
    return this.html;
  }









}
