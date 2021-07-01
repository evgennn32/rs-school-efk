import type App from "../app";

export default class StatisticService {

  // public statisticData: { trainingModeClick: number; wordGuessed: number; gameModeErrors: number; }[] | null
  private statisticData: Map<number, { trainingModeClick: number; wordGuessed: number; gameModeErrors: number; }>;

  constructor(app: App) {
    this.statisticData = new Map();
    this.init()
  }

  init(): void {
    if(localStorage.statisticData) {
      console.log(Array.from(JSON.parse(localStorage.statisticData)))
      this.statisticData = new Map(JSON.parse(localStorage.statisticData));
    }
  }

  updateLocalStorage():void {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    localStorage.statisticData = JSON.stringify([...this.statisticData]);
  }

  deleteStatistic(): void {
    localStorage.removeItem('statisticData');
  }

  updateCardStatistic(cardId:number, action: string):void {
    if(this.statisticData.has(cardId)) {
      const cardStatistic = this.statisticData.get(cardId);
      if (cardStatistic) {
        if(action === 'gameModeError' ) {
          cardStatistic.gameModeErrors += 1;
        }
        if(action === 'trainingModeClick' ) {
          cardStatistic.trainingModeClick += 1;
        }
        if(action === 'wordGuessed' ) {
          cardStatistic.wordGuessed += 1;
        }

        this.statisticData.set(cardId, cardStatistic);
        this.updateLocalStorage();
      }

    } else {
      this.statisticData.set(cardId,{gameModeErrors:0, wordGuessed: 0, trainingModeClick: 0});
      this.updateCardStatistic(cardId, action);
    }
  }






}
