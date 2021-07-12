import Component from "../Component";
import './adminWordCard.scss';
import type App from "../../app";
import Button from "../button/button";
import {APP_STORAGE, IMAGE_STORAGE} from "../../shared/constants";


export default class AdminWordCard extends Component {
  private html: string;

  constructor(protected app: App,
    private word: {
      word: string;
      translation: string;
      image: string;
      audioSrc: string;
      cardId: number;
      categoryId: number;
    }) {
    super('div', ['admin-words__card']);
    this.html = '';
  }

  render(): void {
    super.render();
    const changeBtn = new Button('Change',['admin__btn']);
    this.renderChildComponent(changeBtn,'change-btn-plh')
    const removeBtn =  document.createElement('div');
    removeBtn.classList.add('admin-categories__remove-bnt');
    this.renderChildElement(removeBtn, 'remove-btn-plh');
    const playBtn = document.createElement('div');
    playBtn.classList.add('play-btn');
    playBtn.addEventListener('click', () => {
      this.app.gameService.playSound(this.word.audioSrc)
    })

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


}
