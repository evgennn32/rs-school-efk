import Component from "../Component";
import './menu.scss';
import type App from "../../app";
import MenuItem from "./menuItem";

export default class Menu extends Component {

  private ActivePageId: number;

  private readonly html: string;

  private menu: string[];

  constructor(protected app: App) {
    super('nav', ['menu']);
    this.element.id = 'sideMenu';
    this.ActivePageId = 1;
    this.detectActivePage();
    this.menu = this.app.gameService.categories
    this.html = `<div class='menu-placeholder'></div>`;
  }

  render(): void {
    super.render();
    const menuWrapper = document.createElement('ul');
    menuWrapper.classList.add('menu__wrapper');
    const homeLink = new MenuItem(['menu__item'],'Main page');
    menuWrapper.append(homeLink.element);
    console.log(this.menu)
    this.menu.forEach((el, index) => {
      const menuClasses = ['menu__item'];
      if (this.ActivePageId === index) {
        menuClasses.push('menu__item-active');
      }
      const menuItem = new MenuItem(menuClasses, el);
      menuItem.element.dataset.page_index = `${index}`;
      menuWrapper.append(menuItem.element);

      // menuItem.element.addEventListener('click', () => this.app.navigatePage(index))

    })
    this.renderChildElement(menuWrapper, `menu-placeholder`);
  }

  buildHtml(): string {
    return this.html;
  }

  detectActivePage(): void {
    const activePage = this.app.router.current
    if(activePage === 'settings') {
      this.ActivePageId = 2;
    } else if(activePage === 'score'){
      this.ActivePageId = 1;
    }else {
      this.ActivePageId = 0;
    }
  }
}
