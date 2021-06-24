import Component from "../Component";
import './header.scss';
import type App from "../../app";


export default class Header extends Component {
  private html: string;

  constructor(protected app: App) {
    super('header', ['header']);
    this.app = app;
    this.html = '';
  }

  render(): void {
    super.render();

  }

  buildHtml(): string {
    this.html = `<div class='logo-placeholder'></div>
                `;
    return this.html;
  }
}
