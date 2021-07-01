import type App from "../app";

export default class StatisticService {

  public statisticData: { trainingModeClick: number; wordGuessed: number; gameModeErrors: number; }[] | null

  constructor(app: App) {
    this.statisticData = null;
    this.init()
  }

  init(): void {
    if(localStorage.statisticData) {
      this.statisticData = JSON.parse(localStorage.statisticData);
    }
  }

  update():void {
    localStorage.statisticData = JSON.stringify(this.statisticData);
  }





}
