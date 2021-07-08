import Component from "../Component";
import './adminCategories.scss';
import type App from "../../app";
import AdminCategoryCard from "../adminCategoryCard/adminCategoryCard";


export default class AdminCategories extends Component {
  private html: string;

  constructor(protected app: App) {
    super('div', ['admin-categories']);
    this.app = app;
    this.html = '';
  }

  render(): void {
    super.render();
    try {
      const categories = this.app.apiService.getCategories();
      categories.then((allCategories) => {
        allCategories.forEach((category:{name:string, categoryId: number}) => {
          if(category.name){
            const wordsNumberQuery = this.app.apiService.getCategoryWordsNumber(category.categoryId);
            wordsNumberQuery.then(wordsNumber => {
              const categoryCard = new AdminCategoryCard(this.app, category, wordsNumber);
              categoryCard.render();
              this.element.append(categoryCard.element);
            });
          }
        });
      });

    } catch (e) {
      throw Error(e)
    }



  }

  buildHtml(): string {

    return this.html;
  }


}
