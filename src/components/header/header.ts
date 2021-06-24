import Component from "../Component";
import './header.scss';
import type App from "../../app";
import MenuActivateBtn from "../menuActivateBtn/menuActivateBtn";
import GameSwitcher from "../gameSwitcher/gameSwitcher";


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
    const gameSwitcher = new GameSwitcher([]);
    this.renderChildComponent(menuActivateBtnComponent,'menu-activate-btn-placeholder')
    this.renderChildComponent(gameSwitcher,'gameSwitcher-btn-placeholder')


  }

  buildHtml(): string {
    this.html = `
                  <div class='menu-activate-btn-placeholder'></div>
                  <div class='gameSwitcher-btn-placeholder'></div>
                `;
    return this.html;
  }
}
