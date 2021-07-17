import Component from "../Component";
import './adminCategories.scss';
import type App from "../../app";
import AdminCategoryCard from "../adminCategoryCard/adminCategoryCard";
import AddNewCategoryCard from "../adminCategoryCard/addNewCategoryCard";


export default class AdminCategories extends Component {
  private html: string;

  private loadLimit: number;

  private lastLoadedCategory: number;

  constructor(protected app: App) {
    super('div', ['admin-categories']);
    this.app = app;
    this.html = '';
    this.loadLimit = 3;
    this.lastLoadedCategory = 8;
  }

  render(): void {
    super.render();
    const addNewCategoryCard = new AddNewCategoryCard(this.app);
    addNewCategoryCard.render()
    this.element.append(addNewCategoryCard.element);
    const firstLoadLimit = 8;
    this.renderCategories(firstLoadLimit);
    this.addInfinityScroll();
  }

  buildHtml(): string {
    return this.html;
  }

  renderCategories(limit = 0, last = 0): void {
    const categories = this.app.apiService.getCategories(limit, last);
    categories.then((allCategories) => {
      allCategories.forEach((category: { name: string, categoryId: number }) => {
        if (category.name) {
          const wordsNumberQuery = this.app.apiService.getCategoryWordsNumber(category.categoryId);
          wordsNumberQuery.then(wordsNumber => {
            const categoryCard = new AdminCategoryCard(this.app, category, wordsNumber);
            categoryCard.render();
            this.element.append(categoryCard.element);
          });
        }
      });
    }).catch((e) => {
      throw Error(e)
    });
  }

  addInfinityScroll(): void {
    window.addEventListener('scroll', () => {
      const {
        scrollTop,
        scrollHeight,
        clientHeight
      } = document.documentElement;

      if (scrollTop + clientHeight >= scrollHeight - 5) {
        this.renderCategories(this.loadLimit, this.lastLoadedCategory);
        this.lastLoadedCategory += this.loadLimit;
      }
    }, {
      passive: true
    });
  }
}
