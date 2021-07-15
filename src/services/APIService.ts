import {cards, categories} from "../assets/cards/cards";

export default class APIService {
  private readonly apiUrl: string;

  private path: { words: string; file: string; singleWord: string; category: string; login: string };


  constructor() {
    this.apiUrl = 'http://evgennn32.cloudno.de/api/';
    this.path = {
      category: 'category',
      words: 'words',
      singleWord: 'words/word',
      file: 'file',
      login: 'auth',
    }
  }

  async getCategories(): Promise<{ name: string; categoryId: number; }[]> {
    try {
      const response = await fetch(`${this.apiUrl}${this.path.category}`);
      const responseData = await response.json()
      return responseData.data
    } catch (e) {
      throw new Error(e);
    }
  }

  async getCategoryByDBId(id: string): Promise<{ name: string; categoryId: number; }> {
    try {
      const response = await fetch(`${this.apiUrl}${this.path.category}/get_by_db_id/${id}`);
      const responseData = await response.json()
      return responseData.data
    } catch (e) {
      throw new Error(e);
    }
  }

  async getWordByDBId(id: number): Promise<{
    word: string;
    translation: string;
    image: string;
    audioSrc: string;
    wordId: number;
    categoryId: number;
  }> {
    try {
      const response = await fetch(`${this.apiUrl}${this.path.singleWord}/get_by_db_id/${id}`);
      const responseData = await response.json()
      return responseData.data
    } catch (e) {
      throw new Error(e);
    }
  }

  async getWord(id: number): Promise<{
    word: string;
    translation: string;
    image: string;
    audioSrc: string;
    wordId: number;
    categoryId: number;
  }> {
    try {
      const response = await fetch(`${this.apiUrl}${this.path.singleWord}/${id}`);
      const responseData = await response.json();
      return responseData.data
    } catch (e) {
      throw new Error(e);
    }
  }

  async getWords(categoryId: number): Promise<{
    word: string;
    translation: string;
    image: string;
    audioSrc: string;
    wordId: number;
    categoryId: number;
  }[]> {
    try {
      const response = await fetch(`${this.apiUrl}${this.path.words}/${categoryId || ''}`);
      const responseData = await response.json()
      return responseData.data
    } catch (e) {
      throw new Error(e);
    }
  }

  async removeWord(wordId: number): Promise<void> {
    try {
      const response = await fetch(`${this.apiUrl}${this.path.singleWord}/${wordId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
      });
      return await response.json()
    } catch (e) {
      throw new Error(e);
    }
  }

  async getCategoryWordsNumber(categoryId: number): Promise<number> {
    const words = await this.getWords(categoryId)
    return words.length
  }


  async addCategory(categoryName: string): Promise<{ _id: string; name: string }> {
    const category = {name: categoryName}
    try {
      const response = await fetch(`${this.apiUrl}${this.path.category}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(category)
      });
      const responseData = await response.json()
      return responseData.data
    } catch (e) {
      throw new Error(e);
    }
  }


  async removeCategory(categoryId: number): Promise<void> {
    try {
      const response = await fetch(`${this.apiUrl}${this.path.category}/${categoryId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
      });
      return await response.json()
    } catch (e) {
      throw new Error(e);
    }
  }

  async updateCategory(categoryName: string, categoryId: number): Promise<{ _id: string; name: string }> {
    const category = {name: categoryName}
    try {
      const response = await fetch(`${this.apiUrl}${this.path.category}/${categoryId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(category)
      });
      const responseData = await response.json()
      console.log(response);
      return responseData.data
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
  }): Promise<{word: string; translation: string;image: string; audioSrc: string; wordId: number; categoryId: number}> {
    try {
      const response = await fetch(`${this.apiUrl}${this.path.words}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(wordData)
      });
      const responseData = await response.json()
      // eslint-disable-next-line no-underscore-dangle
      return await this.getWordByDBId(responseData.data._id);
    } catch (e) {
      throw new Error(e);
    }
  }

  async updateWord(wordData: {
    word: string;
    translation: string;
    image: string;
    audioSrc: string;
    wordId: number;
    categoryId: number
  }): Promise<{word: string; translation: string;image: string; audioSrc: string; wordId: number; categoryId: number}> {
    try {
      const response = await fetch(`${this.apiUrl}${this.path.singleWord}/${wordData.wordId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(wordData)
      });
      const responseData = await response.json()
      // eslint-disable-next-line no-underscore-dangle
      return await this.getWord(wordData.wordId);
    } catch (e) {
      throw new Error(e);
    }
  }

  async uploadFile(fileCategory: string, file: File): Promise<{ fileName: string; error: string }> {
    const data = new FormData();
    data.append('file', file);
    data.append('file_category', fileCategory);
    try {
      const response = await fetch(`${this.apiUrl}${this.path.file}`, {
        method: 'POST',
        body: data
      });
      return await response.json()
    } catch (e) {
      throw Error(e);
    }
  }

  async login(name: string, password: string): Promise<{ error: string; message: string }> {
    const loginData = {name, password}
    try {
      const response = await fetch(`${this.apiUrl}${this.path.login}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(loginData)
      });
      return await response.json();

    } catch (e) {
      throw new Error(e);
    }
  }
}



