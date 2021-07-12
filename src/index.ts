import App from "./app";
import './main.scss';


const appElement = document.body;
const APP_STORAGE = 'https://storage.googleapis.com/english_for_kids/';

if (!appElement) {
  throw new Error();
}

const app = new App(appElement);
app.renderPage('');


