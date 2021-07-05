// eslint-disable-next-line import/no-cycle
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



export default class App {

  protected pageToDisplay: HTMLElement;

  public router: RoutService;

  public gameService: GameService;

  public appData: { categoryId: number };

  public statisticService: StatisticService;

  constructor(private rootElement: HTMLElement) {
    this.gameService = new GameService(this);
    this.statisticService = new StatisticService();
    this.rootElement = rootElement;
    this.router = new RoutService({root: '/'}, this);
    const homePage = new HomePage(this);
    this.pageToDisplay = homePage.element;
    this.appData = {
      categoryId: -1
    }

    rootElement.appendChild(this.pageToDisplay);
  }

  renderPage(page: string): void {
    this.rootElement.innerHTML = '';

    switch (page) {

      case 'home':
        this.createPage(new HomePage(this));
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

}

