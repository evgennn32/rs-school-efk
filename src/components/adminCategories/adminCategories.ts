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
    this.lastLoadedCategory = 5
  }

  render(): void {
    super.render();
    const addNewCategoryCard = new AddNewCategoryCard(this.app);
    addNewCategoryCard.render()
    this.element.append(addNewCategoryCard.element);
    const firstLoadLimit = 5;
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
