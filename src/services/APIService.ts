import {cards, categories, categoriesImages} from "../assets/cards/cards";

export default class APIService {
  private apiUrl: string;

  private path: { words: string; category: string };


  constructor() {
    this.apiUrl = 'http://evgennn32.cloudno.de/api/';
    this.path = {
      category: 'category',
      words: 'words',
    }
  }

  addDefaultCategories(): void {
    categories.forEach((category) => {
      this.addCategory(category).then(() => {
        // console.log('category added')
      }).catch((e) => {
        throw Error(e);
      })
    })
  }

  addDefaultWords(): void {
    cards.forEach((cardsCollection) => {
      cardsCollection.forEach(word => {
        this.addWord(word).then(() => {
        }).catch((e) => {
          throw Error(e);
        })
      });
    })
  }


  async getCategories(): Promise<{ name: string; categoryId: number; }[]> {
    try {
      const response = await fetch(`${this.apiUrl}${this.path.category}`);
      return await response.json();
    } catch (e) {
      throw new Error(e);
    }
  }

  async getWordsByCategoryId(categoryId: number): Promise<{
    word: string;
    translation: string;
    image: string;
    audioSrc: string;
    cardId: number;
    categoryId: number;
  }[]> {
    try {
      const response = await fetch(`${this.apiUrl}${this.path.words}/${categoryId}`);
      const responseData = await response.json()
      return responseData.data
    } catch (e) {
      throw new Error(e);
    }
  }

  async getCategoryWordsNumber(categoryId: number): Promise<number> {
    const words = await this.getWordsByCategoryId(categoryId)
    return words.length
  }


  async addCategory(categoryName: string): Promise<void> {
    const category = {name: categoryName}
    try {
      await fetch(`${this.apiUrl}${this.path.category}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(category)
      });
    } catch (e) {
      throw new Error(e);
    }
  }

  async addWord(wordData: {
    word: string;
    translation: string;
    image: string;
    audioSrc: string;
    categoryId: number
  }): Promise<void> {
    try {
      await fetch(`${this.apiUrl}${this.path.words}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(wordData)
      });
    } catch (e) {
      throw new Error(e);
    }
  }
}



