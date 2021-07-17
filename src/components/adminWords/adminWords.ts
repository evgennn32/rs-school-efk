import Component from "../Component";
import './adminWords.scss';
import type App from "../../app";
import AdminWordCard from "../adminWordCard/adminWordCard";
import AddNewWordCard from "../adminWordCard/addNewWordCard";

export default class AdminWords extends Component {
  private html: string;

  private loadLimit: number;

  private lastLoadedWords: number;

  private totalWords: number;

  constructor(protected app: App) {
    super('div', ['admin-words']);
    this.app = app;
    this.html = '';
    this.loadLimit = 3;
    this.lastLoadedWords = 5;
    this.totalWords = 0;
    this.updateTotalWords();
  }

  render(): void {
    super.render();
    const addNewWordCard = new AddNewWordCard(this.app);
    addNewWordCard.render();
    this.element.append(addNewWordCard.element);
    const firstRenderLimit = 5;
    this.renderWords(firstRenderLimit);
    this.addInfinityScroll();
  }

  buildHtml(): string {
    return this.html;
  }

  renderWords(limit= 0, last = 0): void {
    try {
      const words = this.app.apiService.getWords(this.app.appData.adminWordsCategory,limit, last);
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

  updateTotalWords(): void {
    this.app.apiService.getCategoryWordsNumber(this.app.appData.adminWordsCategory).then((wordsNumber => {
      this.totalWords = wordsNumber;
    }));
  }

  addInfinityScroll(): void {
    window.addEventListener('scroll', () => {
      const {
        scrollTop,
        scrollHeight,
        clientHeight
      } = document.documentElement;

      if (scrollTop + clientHeight >= scrollHeight - 5 && this.lastLoadedWords <= this.totalWords) {
        this.renderWords(this.loadLimit, this.lastLoadedWords);
        this.lastLoadedWords += this.loadLimit;
      }
    }, {
      passive: true
    });
  }
}
