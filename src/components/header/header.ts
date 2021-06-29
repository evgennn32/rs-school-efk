import Component from "../Component";
import './header.scss';
import type App from "../../app";
import MenuActivateBtn from "../menuActivateBtn/menuActivateBtn";
import GameSwitcher from "../gameSwitcher/gameSwitcher";
import Menu from "../menu/menu";


export default class Header extends Component {
  private html: string;

  constructor(protected app: App) {
    super('header', ['header', 'container']);
    this.app = app;
    this.html = '';
  }

  render(): void {
    super.render();
    const menuActivateBtnComponent = new MenuActivateBtn([]);
    const gameSwitcher = new GameSwitcher([]);
    const menu = new Menu(this.app);
    this.renderChildComponent(menuActivateBtnComponent, 'menu-activate-btn-placeholder');
    this.renderChildComponent(gameSwitcher, 'gameSwitcher-btn-placeholder');
    this.renderChildComponent(menu, 'menu-placeholder');
    this.addSwitcherHandler(gameSwitcher.element);


  }

  buildHtml(): string {
    this.html = `
                  <div class='menu-activate-btn-placeholder'></div>
                  <div class='gameSwitcher-btn-placeholder'></div>
                  <div class='menu-placeholder'></div>
                `;
    return this.html;
  }

  addSwitcherHandler(switcher: HTMLElement): void {
    const switcherInput = <HTMLInputElement>switcher.querySelector('.switch-input');
    if (switcherInput) {
      switcherInput.addEventListener('change', () => {
        this.app.gameService.switchGameMode(!switcherInput.checked);


      })
    }

  }
}
