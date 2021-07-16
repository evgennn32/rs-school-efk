export default class APIService {
  private readonly apiUrl: string;

  private path: { words: string; file: string; singleWord: string; category: string; login: string };

  private cookieTokenName: string;

  constructor() {
    this.apiUrl = 'https://evgennn32.cloudno.de/api/';
    this.cookieTokenName = 'userToken'
    this.path = {
      category: 'category',
      words: 'words',
      singleWord: 'words/word',
      file: 'file',
      login: 'auth',
    }

  }

  async getCategories(limit = 0, last = 0): Promise<{ name: string; categoryId: number; }[]> {
    try {
      const response = await fetch(`${this.apiUrl}${this.path.category}?_limit=${limit}&_last=${last}`);
      const responseData = await response.json()
      return responseData.data
    } catch (e) {
      throw new Error(e);
    }
  }

  async getCategory(categoryId: number): Promise<{ name: string; categoryId: number; }> {
    try {
      const response = await fetch(`${this.apiUrl}${this.path.category}/${categoryId}`);
      const responseData = await response.json();
      return responseData.data;
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

  async getWords(categoryId: number, limit = 0, last = 0): Promise<{
    word: string;
    translation: string;
    image: string;
    audioSrc: string;
    wordId: number;
    categoryId: number;
  }[]> {
    try {
      const response = await fetch(
        `${this.apiUrl}${this.path.words}/${categoryId || ''}?_limit=${limit}&_last=${last}`
      );
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
          'Content-Type': 'application/json;charset=utf-8',
          'Authorization': this.getUserAuthToken()
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
          'Content-Type': 'application/json;charset=utf-8',
          'Authorization': this.getUserAuthToken()
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
          'Content-Type': 'application/json;charset=utf-8',
          'Authorization': this.getUserAuthToken()
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
          'Content-Type': 'application/json;charset=utf-8',
          'Authorization': this.getUserAuthToken()
        },
        body: JSON.stringify(category)
      });
      const responseData = await response.json();
      return responseData.data;
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
  }): Promise<{
      word: string;
      translation: string;
      image: string;
      audioSrc: string;
      wordId: number;
      categoryId: number }> {
    try {
      const response = await fetch(`${this.apiUrl}${this.path.words}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Authorization': this.getUserAuthToken()
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
  }): Promise<{
      word: string;
      translation: string;
      image: string;
      audioSrc: string;
      wordId: number;
      categoryId: number }> {
    try {
      const response = await fetch(`${this.apiUrl}${this.path.singleWord}/${wordData.wordId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Authorization': this.getUserAuthToken()
        },
        body: JSON.stringify(wordData)
      });
      await response.json();

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
        headers: {
          'Authorization': this.getUserAuthToken()
        },
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
      const responseData = await response.json();

      if (responseData.token) {
        this.setUserAuthToken(responseData.token)
      }
      return responseData;

    } catch (e) {
      throw new Error(e);
    }
  }

  setUserAuthToken(token: string): void {
    document.cookie = `${this.cookieTokenName}=Bearer ${token}; max-age=3600`;
  }


  getUserAuthToken(): string {
    const matches = document.cookie.match(new RegExp(
      `(?:^|; )${this.cookieTokenName}=([^;]*)`
    ));
    return matches ? decodeURIComponent(matches[1]) : '';
  }

  deleteUserAuthToken(): void {
    document.cookie = `${this.cookieTokenName}=; max-age=-10`;
  }

  async userLogged(): Promise<boolean> {
    if(!this.getUserAuthToken()){
      return false;
    }
    try {
      const response = await fetch(`${this.apiUrl}${this.path.login}`, {
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Authorization': this.getUserAuthToken()
        }
      });
      const responseData = await response.json()
      if(responseData.success){
        return true;
      }
    } catch (e) {
      throw new Error(e);
    }
    return false;
  }




}



