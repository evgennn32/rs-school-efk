import Component from "../Component";
import './adminWords.scss';
import type App from "../../app";
import AdminWordCard from "../adminWordCard/adminWordCard";
import AddNewWordCard from "../adminWordCard/addNewWordCard";

export default class AdminWords extends Component {
  private html: string;

  constructor(protected app: App) {
    super('div', ['admin-words']);
    this.app = app;
    this.html = '';
  }

  render(): void {
    super.render();
    const addNewWordCard = new AddNewWordCard(this.app);
    addNewWordCard.render();
    this.element.append(addNewWordCard.element);
    try {
      const words = this.app.apiService.getWords(this.app.appData.adminWordsCategory);
      words.then((allWords) => {
        allWords.forEach(
          (word: {
            word: string;
            translation: string;
            image: string;
            audioSrc: string;
            wordId: number;
            categoryId: number;
          }) => {
            if (word.word) {
              const categoryCard = new AdminWordCard(this.app, word);
              categoryCard.render();
              this.element.append(categoryCard.element);

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
