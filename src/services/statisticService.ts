import type App from "../app";

export default class StatisticService {

  private statisticData: Map<number, { trainingModeClicks: number; wordGuessed: number; gameModeErrors: number; }>;

  constructor(app: App) {
    this.statisticData = new Map();
    this.init()
  }

  init(): void {
    if(localStorage.statisticData) {
      this.statisticData = new Map(JSON.parse(localStorage.statisticData));
    }
  }

  updateLocalStorage():void {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    localStorage.statisticData = JSON.stringify([...this.statisticData]);
    console.log(this.statisticData)
  }

  deleteStatistic(): void {
    localStorage.removeItem('statisticData');
    this.statisticData = new Map();
  }

  updateCardStatistic(cardId:number, action: string):void {
    if(this.statisticData.has(cardId)) {
      const cardStatistic = this.statisticData.get(cardId);
      if (cardStatistic) {
        if(action === 'gameModeError' ) {
          cardStatistic.gameModeErrors += 1;
        }
        if(action === 'trainingModeClick' ) {
          cardStatistic.trainingModeClicks += 1;
        }
        if(action === 'wordGuessed' ) {
          cardStatistic.wordGuessed += 1;
        }

        this.statisticData.set(cardId, cardStatistic);
        this.updateLocalStorage();
      }

    } else {
      this.statisticData.set(cardId,{gameModeErrors:0, wordGuessed: 0, trainingModeClicks: 0});
      this.updateCardStatistic(cardId, action);
    }
  }

  getCardStatistic(cardId: number): { gameModeErrors: number; trainingModeClicks: number; wordGuessed: number; } {
    const statistic = this.statisticData.get(cardId);
    let cardStatistic = {
      gameModeErrors: 0,
      trainingModeClicks: 0,
      wordGuessed: 0
    }
    if(statistic) {
      cardStatistic = statistic;
    }
    return cardStatistic
  }






}
