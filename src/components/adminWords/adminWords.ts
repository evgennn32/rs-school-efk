import Component from "../Component";
import './adminWords.scss';
import type App from "../../app";
import AdminWordCard from "../adminWordCard/adminWordCard";

export default class AdminWords extends Component {
  private html: string;

  constructor(protected app: App) {
    super('div', ['admin-words']);
    this.app = app;
    this.html = '';
  }

  render(): void {
    super.render();
    try {
      const words = this.app.apiService.getWords(this.app.appData.adminWordsCategory);
      words.then((allWords) => {
        allWords.forEach(
          (word: {
            word: string;
            translation: string;
            image: string;
            audioSrc: string;
            cardId: number;
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
