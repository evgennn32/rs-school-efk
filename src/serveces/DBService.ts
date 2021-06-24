export default class DBService {

  private DB: IDBDatabase | null;

  constructor() {
    this.DB = null;
    this.connectDB();
  }

  connectDB(): void {
    const openRequest = indexedDB.open('evgennn32', 5);
    openRequest.onupgradeneeded = () => {
      const db = openRequest.result;
      if (db.objectStoreNames.contains('users')) {
        db.deleteObjectStore('users');
      }

      if (db.objectStoreNames.contains('settings')) {
        db.deleteObjectStore('settings');
      }
      const users = db.createObjectStore("users", {autoIncrement: true, keyPath: 'user_id'});
      users.createIndex("user_id", "user_id");
      users.createIndex("last_name", "last_name");
      users.createIndex("first_name", "first_name");
      users.createIndex("score", "score");
      users.createIndex("avatar", "avatar");
      users.createIndex("email", "email");
      users.createIndex("score_idx", "score");
      const settings = db.createObjectStore("settings", {keyPath: 'current_user'});
      settings.createIndex("current_user", "current_user", {unique: true});
      settings.createIndex("email", "email");
      settings.createIndex("avatar", "avatar");
      settings.createIndex("card_type", "last_name");
      settings.createIndex("difficulty", "first_name");
    };

    openRequest.onerror = () => {
      throw Error(`${openRequest.error}`);
    }
    openRequest.onsuccess = () => {
      this.DB = openRequest.result
    }
  }

}
