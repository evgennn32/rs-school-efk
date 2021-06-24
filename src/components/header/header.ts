import Component from "../Component";
import './header.scss';
import type App from "../../app";
import MenuActivateBtn from "../menuActivateBtn/menuActivateBtn";


export default class Header extends Component {
  private html: string;

  constructor(protected app: App) {
    super('header', ['header']);
    this.app = app;
    this.html = '';
  }

  render(): void {
    super.render();
    const menuActivateBtnComponent = new MenuActivateBtn([]);
    this.renderChildComponent(menuActivateBtnComponent,'menu-activate-btn-placeholder')


  }

  buildHtml(): string {
    this.html = `<div class='menu-activate-btn-placeholder'></div>
                `;
    return this.html;
  }
}
