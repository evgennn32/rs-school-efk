import Header from "../components/header/header";
import Component from "../components/Component";
import type App from "../app";
import CategoryCard from "../components/categoryCard/categoryCard";
import LoginForm from "../components/loginForm/loginForm";
import PopUp from "../components/popUp/popUp";
import {changeCategory} from "../redux/actions";


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
    this.renderChildElement(categoriesWrapper, 'categories-placeholder');

    const loginForm = new LoginForm(this.app);
    const loginPopUp = new PopUp('login-popup', loginForm);
    this.renderChildComponent(loginPopUp, 'login-pop-up-placeholder');
  }

  buildHtml(): string {
    this.html = `
            <div class="header-placeholder"></div>
            <main class="main container">
              <div class="container__wrapper">
                <div class="categories-placeholder"></div>
              </div>
            </main>
            <footer class="footer container">
            <div class='login-pop-up-placeholder'></div>
            <a class="github" href="https://github.com/evgennn32" target="_blank" rel="noopener noreferrer">github</a>
            <a class="rss" href="https://rs.school/js/" target="_blank" rel="noopener noreferrer">
              <span class="rss-year">2021</span>
            </a>

</footer>
            `;
    return this.html;
  }

  renderCategoriesCards(categoriesWrapper: HTMLElement): void {
    this.app.apiService.getCategories().then(categories => {
      categories.forEach((category, index) => {
        if (!category.name)
          return;
        this.app.apiService.getWords(category.categoryId).then(categoryWords => {
          let categoryImage = 'no-image.jpg';
          if (categoryWords[0]) {
            categoryImage = categoryWords[0].image;
          }
          const newCategoryCard = new CategoryCard({title: category.name, image: categoryImage});
          newCategoryCard.render();
          this.addCardHandler(newCategoryCard.element, index);
          categoriesWrapper.append(newCategoryCard.element);
        })

      })

    })
  }

  addCardHandler(card: HTMLElement, categoryId: number): void {
    card.addEventListener('click', ev => {
      ev.preventDefault();
      this.app.store.dispatch(changeCategory(categoryId));
    })
  }
}
