
export default class StatisticService {

  private statisticData: Map<number, { trainingModeClicks: number; wordGuessed: number; gameModeErrors: number; }>;

  constructor() {
    this.statisticData = new Map();
    this.init()
  }

  init(): void {
    if(localStorage.statisticData) {
      this.statisticData = new Map(JSON.parse(localStorage.statisticData));
    }
  }

  updateLocalStorage():void {
    localStorage.statisticData = JSON.stringify([...this.statisticData]);
  }

  deleteStatistic(): void {
    localStorage.removeItem('statisticData');
    this.statisticData = new Map();
  }

  updateCardStatistic(wordId:number, action: string):void {
    if(this.statisticData.has(wordId)) {
      const cardStatistic = this.statisticData.get(wordId);
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

        this.statisticData.set(wordId, cardStatistic);
        this.updateLocalStorage();
      }

    } else {
      this.statisticData.set(wordId,{gameModeErrors:0, wordGuessed: 0, trainingModeClicks: 0});
      this.updateCardStatistic(wordId, action);
    }
  }

  getCardStatistic(wordId: number): { gameModeErrors: number; trainingModeClicks: number; wordGuessed: number; } {
    const statistic = this.statisticData.get(wordId);
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
