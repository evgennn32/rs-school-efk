import Component from "../Component";
import './menu.scss';
import type App from "../../app";
import MenuItem from "./menuItem";
import {changeCategory} from "../../redux/actions";

export default class Menu extends Component {

  private ActivePageId: number;

  private readonly html: string;

  constructor(protected app: App) {
    super('nav', ['menu']);
    this.element.id = 'sideMenu';
    this.ActivePageId = 1;
    this.detectActivePage();
    this.html = `<div class='menu-placeholder'></div>`;
  }

  render(): void {
    super.render();
    const menuWrapper = document.createElement('ul');
    menuWrapper.classList.add('menu__wrapper');
    const homeLink = new MenuItem(['menu__item'], 'Main page');
    homeLink.element.classList.add('menu__item-active');
    homeLink.element.addEventListener('click', () => {
      this.app.navigatePage('/');
    });
    menuWrapper.append(homeLink.element);
    this.app.apiService.getCategories().then((categories) => {
      categories.forEach((category, index) => {
        const menuClasses = ['menu__item'];
        if(category.name) {
          const menuItem = new MenuItem(menuClasses, category.name);
          menuItem.element.dataset.page_index = `${index}`;
          menuWrapper.append(menuItem.element);
          menuItem.element.addEventListener('click', () => {
            this.app.store.dispatch(changeCategory(category.categoryId));
            this.clearSelectedItems();
            menuItem.element.classList.add('menu__item-active');
            this.closeMenu();
          });
        }
      });
    });
    this.addCloseMenuHandler();
    this.addMenuBottom()
    this.renderChildElement(menuWrapper, `menu-placeholder`);
  }

  buildHtml(): string {
    return this.html;
  }

  detectActivePage(): void {
    const activePage = this.app.router.current
    if (activePage === 'settings') {
      this.ActivePageId = 2;
    } else if (activePage === 'score') {
      this.ActivePageId = 1;
    } else {
      this.ActivePageId = 0;
    }
  }

  clearSelectedItems(): void {
    const menuItems = this.element.querySelectorAll('.menu__item');
    menuItems.forEach(el => {
      el.classList.remove('menu__item-active')
    })
  }

  closeMenu(): void {
    const menuBtn = document.querySelector('.menu-btn');
    if (menuBtn) {
      menuBtn.classList.remove('active');
    }
    this.element.classList.remove('menu_active');
  }

  addMenuBottom(): void {
    const menuBottom = document.createElement("ul");
    menuBottom.classList.add('menu__wrapper', 'menu__wrapper_bottom');
    const statisticLink = document.createElement('li');
    statisticLink.classList.add('menu__item');
    statisticLink.innerHTML = 'Statistic';
    statisticLink.addEventListener('click', () => {
      this.app.navigatePage('/statistic')
      this.clearSelectedItems();
      statisticLink.classList.add('menu__item-active');
      this.closeMenu();
    })

    const loginBtn = document.createElement('li');
    loginBtn.classList.add('menu__item', 'login-btn');
    loginBtn.innerHTML = 'Login';
    loginBtn.addEventListener('click', () => {
      this.closeMenu();
      this.app.showPopup('login-popup');
    });
    menuBottom.append(statisticLink);
    menuBottom.append(loginBtn);
    this.element.append(menuBottom);
  }

  addCloseMenuHandler(): void {
    document.addEventListener('click', (event) => {
      const specifiedElement = document.getElementById('sideMenu');
      if (specifiedElement) {
        if (event.target) {
          const elem = <HTMLElement>event.target
          const isClickInside = specifiedElement.contains(elem);
          if (!isClickInside) {
            this.closeMenu();
          }
        }
      }
    });
  }
}
