import HomePage from './pages/home';
import RoutService from "./serveces/routService";
import Component from "./components/Component";
import GamePage from "./pages/game";
import GameService from "./serveces/gameService";



export default class App {

  protected pageToDisplay: HTMLElement;

  public router: RoutService;

  public gameService: GameService;

  public appData: { categoryId: number };

  constructor(private rootElement: HTMLElement) {
    this.gameService = new GameService(this);
    this.rootElement = rootElement;
    this.router = new RoutService({root: '/'}, this);
    const homePage = new HomePage(this);
    this.pageToDisplay = homePage.element;
    this.appData = {
      categoryId: 0
    }

    // setTimeout(() => {
    //   this.router.navigate('settings');
    // }, 500);

    rootElement.appendChild(this.pageToDisplay);
  }

  renderPage(page: string): void {
    this.rootElement.innerHTML = '';

    switch (page) {

      case 'home':
        this.createPage(new HomePage(this));
        break;
      case 'game':
        this.createPage(new GamePage(this));
        break;


      default:
        this.createPage(new HomePage(this));
    }
    this.rootElement.appendChild(this.pageToDisplay);
  }

  navigatePage(pageIndex: number): void {
    let page = ''
    switch (pageIndex) {
      case 0:
        page = '/'
        break;
      case 1:
        page = 'game'
        break;
      default:
        page = '/'
    }
    this.router.navigate(page);
  }

  createPage(page: Component): void {
    page.render();
    this.pageToDisplay = page.element;
  }

}

