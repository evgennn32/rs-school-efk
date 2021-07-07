import Component from "../Component";
import './adminHeader.scss';
import type App from "../../app";


export default class AdminHeader extends Component {
  private html: string;

  constructor(protected app: App) {
    super('header', ['admin-header']);
    this.app = app;
    this.html = '';
  }

  render(): void {
    super.render();
    const categoryNav = document.createElement('a');
    categoryNav.href = '/admin/categories';
    categoryNav.innerHTML = 'Categories';
    const wordsNav = document.createElement('a');
    wordsNav.href = '/admin/words';
    wordsNav.innerHTML = 'Words';
    const logoutBtn = document.createElement('a');
    logoutBtn.href = '/';
    logoutBtn.innerHTML = 'Log out';
    this.renderChildElement(categoryNav, 'category-btn-placeholder');
    this.renderChildElement(wordsNav, 'word-btn-placeholder');
    this.renderChildElement(logoutBtn, 'logout-btn-placeholder');
  }

  buildHtml(): string {
    this.html = `<div class="admin-header__left">
                    <div class='category-btn-placeholder active'></div>
                    <div class='word-btn-placeholder'></div>
                  </div>
                  <div class="admin-header__right">
                    <div class='logout-btn-placeholder'></div>
                  </div>
                `;
    return this.html;
  }


}
