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
    this.ActivePageId = 1;
    this.detectActivePage();
    this.menu = ['About Game', 'Best Score', 'Game Settings'];
    this.html = `<ul class="menu__wrapper">
                 <div class='menu-item-0-placeholder'></div>
                 <div class='menu-item-1-placeholder'></div>
                 <div class='menu-item-2-placeholder'></div>
                 </ul>`
  }

  render(): void {
    super.render();
    this.menu.forEach((el, index) => {
      const menuClasses = ['menu__item',`menu__item_${index}`];
      if (this.ActivePageId === index) {
        menuClasses.push('menu__item-active');
      }
      const menuItem = new MenuItem(menuClasses, el);
      menuItem.element.dataset.page_index = `${index}`;
      menuItem.element.addEventListener('click', () => this.app.navigatePage(index))
      this.renderChildComponent(menuItem, `menu-item-${index}-placeholder`);
    })
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
