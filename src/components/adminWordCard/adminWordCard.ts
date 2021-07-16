import Component from "../Component";
import './adminWordCard.scss';
import type App from "../../app";
import Button from "../button/button";
import {DEFAULT_WORDS, IMAGE_STORAGE} from "../../shared/constants";
// eslint-disable-next-line import/no-cycle
import NewWordCard from "./newWordCard";



export default class AdminWordCard extends Component {
  private html: string;

  constructor(protected app: App,
    public word: {
      word: string;
      translation: string;
      image: string;
      audioSrc: string;
      wordId: number;
      categoryId: number;
    }) {
    super('div', ['admin-words__card']);
    this.html = '';
  }

  render(): void {
    super.render();
    const changeBtn = new Button('Change',['admin__btn']);
    changeBtn.element.addEventListener('click', this.updateWord.bind(this))
    this.renderChildComponent(changeBtn,'change-btn-plh')
    const removeBtn =  document.createElement('div');
    removeBtn.classList.add('admin-categories__remove-bnt');
    this.renderChildElement(removeBtn, 'remove-btn-plh');
    const playBtn = document.createElement('div');
    playBtn.classList.add('play-btn');
    removeBtn.addEventListener('click', () => {
      if(this.word.wordId < DEFAULT_WORDS) {
        this.showDeleteDeprecation();
        return;
      }
      this.app.apiService.removeWord(this.word.wordId)
        .then(() =>{
          this.element.remove()
        })
        .catch(e => {
          throw Error(e);
        })
    });
    playBtn.addEventListener('click', () => {
      this.app.gameService.playSound(this.word.audioSrc)
    });
    this.renderChildElement(playBtn,'play-btn-plh');
  }

  buildHtml(): string {
    this.html = `
    <div class="admin-words__item"><b>Word:</b> ${this.word.word}</div>
    <div class="admin-words__item"><b>Translation:</b> ${this.word.translation}</div>
    <div class="admin-words__item"><b>Sound file:</b> ${this.word.audioSrc}<div class="play-btn-plh"></div></div>
    <div class="admin-words__item"><b>Image:</b></div>
    <div class="admin-words__image-wrap">
      <img class="admin-words__image" src="${IMAGE_STORAGE}/${this.word.image}" alt="${this.word.word}">
    </div>
    <div class="admin-words__btns">
      <div class="change-btn-plh"></div>
    </div>
    <div class="remove-btn-plh"></div>
    `;

    return this.html;
  }

  updateWord(): void{
    const updateCardData = {
      word: this.word.word,
      translation: this.word.translation,
      image: this.word.image,
      audioSrc: this.word.audioSrc,
      wordId: this.word.wordId,
      categoryId: this.word.categoryId,
      wordCard : this,
    }
    const updateCard = new NewWordCard(this.app,updateCardData);
    updateCard.render();
    this.element.classList.add('hidden');
    this.element.after(updateCard.element);
  }


  showDeleteDeprecation(): void{
    const oldError = this.element.querySelector('.error');
    if(oldError){
      return;
    }
    const message = document.createElement('div');
    message.classList.add('error');
    message.innerHTML = "You can't delete default word! Add new one, and try again!";
    this.element.prepend(message);
    setTimeout(() => {
      message.remove();
    },3000)
  }


}
