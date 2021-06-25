import Component from "../Component";
import './menuActivateBtn.scss';

export default class MenuActivateBtn extends Component {
  private html: string;

  constructor( cssClasses: string[]) {
    cssClasses.push('menu-btn')
    super('div', cssClasses);
    this.html = '';
    this.addBtnHandler();
  }

  buildHtml(): string {
    this.html = `
                <div class="menu-activate">
                  <div class="menu-activate__line-1"></div>
                  <div class="menu-activate__line-2"></div>
                  <div class="menu-activate__line-3"></div>
                </div>
                `
    return this.html;
  }

  addBtnHandler(): void {
    this.element.addEventListener('click', ()=> {
      this.element.classList.toggle('active');
      const menu = document.getElementById('sideMenu');
      if (menu) {
        menu.classList.toggle('menu_active');
      }
    });
  }
}


