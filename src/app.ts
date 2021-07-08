import {applyMiddleware, createStore} from 'redux'
// eslint-disable-next-line import/no-cycle,import/no-extraneous-dependencies
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk';
import HomePage from './pages/home';
// eslint-disable-next-line import/no-cycle
import RoutService from "./services/routService";
import Component from "./components/Component";
// eslint-disable-next-line import/no-cycle
import GameService from "./services/gameService";
// eslint-disable-next-line import/no-cycle
import CardsField from "./components/cardsfield/cardsfield";
import StatisticService from "./services/statisticService";
import StatisticTable from "./components/statisticTable/statisticTable";
import rootReducer from "./redux/reducers/rootReducer";
import AdminPage from "./pages/admin";
import APIService from "./services/APIService";
import AdminWordsPage from "./pages/adminWordsPage";


export default class App {

  protected pageToDisplay: HTMLElement;

  public router: RoutService;

  public gameService: GameService;



  public statisticService: StatisticService;

  public store: any ;

  public apiService: APIService;

  public appData: { adminWordsCategory: number; adminActivePage: string; categoryId: number };

  constructor(private rootElement: HTMLElement) {
    this.apiService = new APIService();
    this.store = createStore(rootReducer,composeWithDevTools(
      applyMiddleware(thunk, logger)
    ))
    this.gameService = new GameService(this);
    this.statisticService = new StatisticService();
    this.rootElement = rootElement;
    this.router = new RoutService({root: '/'}, this);
    const homePage = new HomePage(this);
    this.pageToDisplay = homePage.element;
    this.navigatePage('admin/categories');
    this.appData = {
      categoryId: -1,
      adminActivePage: 'categories',
      adminWordsCategory: 0
    }

    this.subscribeStore();


    rootElement.appendChild(this.pageToDisplay);
  }

  renderPage(page: string): void {
    this.rootElement.innerHTML = '';

    switch (page) {

      case 'home':
        this.createPage(new HomePage(this));
        break;
      case 'admin':
        this.createPage(new AdminPage(this));
        break;
      case 'adminWords':
        this.createPage(new AdminWordsPage(this));
        break;
      default:
        this.createPage(new HomePage(this));
    }
    this.rootElement.appendChild(this.pageToDisplay);
  }

  navigatePage(page: string): void {

    this.router.navigate(page);
  }

  createPage(page: Component): void {
    page.render();
    this.pageToDisplay = page.element;
  }

  renderGameField(): void {
    const elToInsert = document.querySelector('.main');
    if (elToInsert) {
      const newGameField = new CardsField(this);
      newGameField.render();
      elToInsert.innerHTML = '';
      elToInsert.append(newGameField.element);
    }
  }

  renderStatisticField(): void {
    const elToInsert = document.querySelector('.main');
    if (elToInsert) {
      const statisticTable = new StatisticTable(this);
      statisticTable.render();
      elToInsert.innerHTML = '';
      elToInsert.append(statisticTable.element);
    }
  }

  showPopup(popupId: string): void {
    const popup = this.rootElement.querySelector(`#${popupId}`);
    if(popup) {
      popup.classList.remove('hidden');
    }
  }

  subscribeStore():void {
    this.store.subscribe(() => {
      const state = this.store.getState();
      this.appData.categoryId = state.category.activeCategory;
      this.navigatePage('cards');
      this.renderGameField();
    });
  }

}

