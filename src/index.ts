import App from "./app";
import './main.scss';


const appElement = document.body;

if (!appElement) {
  throw new Error();
}

const app = new App(appElement);
app.renderPage('');


