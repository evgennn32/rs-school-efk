import Header from "../components/header/header";
import Component from "../components/Component";
import type App from "../app";
import CategoryCard from "../components/categoryCard/categoryCard";
import LoginForm from "../components/loginForm/loginForm";
import PopUp from "../components/popUp/popUp";


export default class HomePage extends Component {
  private html: string;

  public categoriesImages: string [];

  constructor(protected app: App) {
    super('div', ['main-container']);
    this.html = '';
    this.categoriesImages = this.app.gameService.categoriesImages;
  }

  render(): void {
    super.render();
    const header = new Header(this.app);
    this.renderChildComponent(header, 'header-placeholder');
    const categoriesWrapper = document.createElement('div');
    categoriesWrapper.classList.add('categories-wrap');
    this.renderCategoriesCards(categoriesWrapper);
    this.renderChildElement(categoriesWrapper,'categories-placeholder');

    const loginForm = new LoginForm(this.app);
    const loginPopUp = new PopUp('login-popup',loginForm);
    this.renderChildComponent(loginPopUp,'login-pop-up-placeholder');
  }

  buildHtml(): string {
    this.html = `
            <div class="header-placeholder"></div>
            <main class="main container">
              <div class="container__wrapper">
                <div class="categories-placeholder"></div>
              </div>
            </main>
            <footer>
            <div class='login-pop-up-placeholder'></div>
</footer>
            `;
    return this.html;
  }

  renderCategoriesCards(categoriesWrapper: HTMLElement): void {

    this.app.gameService.categories.forEach((category,index) => {
      const newCategoryCard = new CategoryCard({title:category, image: `${this.categoriesImages[index]}`});
      newCategoryCard.render();
      this.addCardHandler(newCategoryCard.element, index);
      categoriesWrapper.append(newCategoryCard.element);
    })
  }

  addCardHandler(card: HTMLElement, categoryId: number): void {
    card.addEventListener('click', ev => {
      ev.preventDefault();
      this.app.appData.categoryId = categoryId;
      this.app.navigatePage('cards');
    })
  }





}
