import Component from "../Component";
import './adminWordCard.scss';
import type App from "../../app";
import Button from "../button/button";
import Input from "../input/input";
import Loader from "../loader/loader";
import AdminWordCard from "./adminWordCard";


export default class NewWordCard extends Component {
  private html: string;

  private nameInput: Input;

  private translationInput: Input;

  private imageInput: Input;

  private soundInput: Input;

  private imageSource: null | string;

  private soundSource: null | string;

  private translation: string | null;

  private word: string | null;

  constructor(
    private app: App,
    private wordData: {
      wordCard: AdminWordCard;
      word: string;
      translation: string;
      image: string;
      audioSrc: string;
      wordId: number;
      categoryId: number;
    } | null =  null ) {
    super('div', ['admin-categories__card']);
    this.translation = this.wordData ? this.wordData.translation : null;
    this.word = this.wordData ? this.wordData.word : null;
    this.imageSource = this.wordData ? this.wordData.image : null;
    this.soundSource = this.wordData ? this.wordData.audioSrc : null;
    this.nameInput = new Input('name', ['admin-words__name-input'], 'text', 'name-input');
    const nameInput = this.nameInput.element as HTMLInputElement;
    nameInput.minLength = 2;
    nameInput.required = true;
    nameInput.value = this.word || '';
    this.translationInput = new Input(
      'translation', ['admin-words__translation-input'], 'text', 'translation-input');
    const translationInput = this.translationInput.element as HTMLInputElement
    translationInput.minLength = 2
    translationInput.required = true;
    translationInput.value = this.translation || '';
    this.imageInput = new Input(
      'image', ['admin-words__image-input', 'btn', 'avatar-btn'], 'file', 'image-input');
    this.soundInput = new Input(
      'sound', ['admin-words__sound-input', 'btn', 'avatar-btn'], 'file', 'sound-input');
    const soundInput = this.soundInput.element as HTMLInputElement
    soundInput.required = true;
    this.html = '';
  }

  render(): void {
    super.render();
    const createBtnText = this.wordData ? 'Update' : 'Create'
    const createBtn = new Button(createBtnText, ['admin__btn'], 'submit');
    const cancelBtn = new Button('Cancel', ['admin__btn', 'admin__btn_red']);
    this.imageInput = new Input(
      'image', ['admin-words__image-input', 'btn', 'avatar-btn'], 'file', 'image-input');
    this.soundInput = new Input(
      'sound', ['admin-words__sound-input', 'btn', 'avatar-btn'], 'file', 'sound-input');
    const soundInput = this.soundInput.element as HTMLInputElement
    soundInput.required = true;
    this.imageInput.element.addEventListener('change', this.imageUploadHandler.bind(this));
    this.soundInput.element.addEventListener('change', this.soundUploadHandler.bind(this));
    this.renderChildComponent(createBtn, 'create-btn-plh');
    this.renderChildComponent(cancelBtn, 'cancel-btn-plh');
    this.addCreateBtnHandler(createBtn);
    this.addCancelBtnHandler(cancelBtn);
    this.renderChildComponent(this.nameInput, 'name-input-plh');
    this.renderChildComponent(this.translationInput, 'translation-input-plh');
    this.renderChildComponent(this.imageInput, 'image-input-plh');
    this.renderChildComponent(this.soundInput, 'sound-input-plh');
  }

  buildHtml(): string {

    this.html = `<form action="/">
    <div class="admin-words__name">Word:</div>
    <div class="name-input-plh"></div>
    <div class="admin-words__name">Translation:</div>
    <div class="translation-input-plh"></div>
    <div id="sound-wrap" class="admin-words__file-wrap">
      <div class="admin-words__file-name">Sound:</div>
      <label for="sound-input" class="custom-file-upload btn avatar-btn">
        Select file
        <div class="sound-input-plh"></div>
      </label>
    </div>
    <div class="admin-words__file-src"><span>${this.soundSource || ''}</span></div>
    <div id="image-wrap" class="admin-words__file-wrap">
      <div class="admin-words__file-name">Image:</div>
      <label for="image-input" class="custom-file-upload btn avatar-btn">
        Select file
        <div class="image-input-plh"></div>
      </label>
    </div>

    <div class="admin-words__file-src"><span>${this.imageSource || ''}</span></div>
    <div class="admin-categories__btns">
      <div class="create-btn-plh"></div>
      <div class="cancel-btn-plh"></div>
    </div>
    </form>
    `;
    return this.html;
  }

  imageUploadHandler(): void {
    const loader = new Loader([]);
    loader.render();
    this.imageInput.element.before(loader.element);
    this.uploadFile('img', 'image-input').then((response) => {
      loader.element.remove();
      if (!response.error && response.fileName) {
        this.imageSource = response.fileName;
        this.render();
      }
    }).catch(e => {
      loader.element.remove();
      Error(e);
    });
  }

  soundUploadHandler(): void {
    const loader = new Loader([]);
    loader.render();
    this.soundInput.element.before(loader.element);
    this.uploadFile('audio', 'sound-input').then((response) => {
      loader.element.remove();
      if (!response.error && response.fileName) {
        this.soundSource = response.fileName
        const soundFileName = document.createElement('span');
        soundFileName.innerHTML = this.soundSource;
        this.render();
      }
    }).catch(e => {
      loader.element.remove()
      // TODO show error
      Error(e);
    })
  }

  validateFields(): boolean {
    // TODO add fields validation
    return true
  }

  addCreateBtnHandler(btn: Button): void {
    btn.element.addEventListener('click', (e) => {
      const btnElement = btn.element as HTMLButtonElement
      btnElement.disabled = true;
      e.preventDefault();
      if (this.validateFields()) {
        const nameInput = this.nameInput.element as HTMLInputElement
        const translationInput = this.translationInput.element as HTMLInputElement
        const word = nameInput.value;
        const translation = translationInput.value;
        if (word && translation && this.soundSource) {
          const wordData = {
            word,
            translation,
            image: this.imageSource || 'no-image.jpg',
            audioSrc: this.soundSource,
            categoryId: this.app.appData.adminWordsCategory,
            wordId: this.wordData ? this.wordData.wordId : 0,
          }
          if(this.wordData) {
            this.app.apiService.updateWord(wordData).then((newCardData) => {
              if(this.wordData) {
                this.wordData.wordCard.word = newCardData;
                this.wordData.wordCard.render();
                this.wordData.wordCard.element.classList.remove('hidden');
                this.element.remove();
              }
            });
          } else {

            this.app.apiService.addWord(wordData).then((newCardData) => {

              const newCard = new AdminWordCard(this.app, newCardData)
              newCard.render()
              this.element.replaceWith(newCard.element);
            });
          }

        }
      }
    });

  }

  addCancelBtnHandler(btn: Button): void {
    btn.element.addEventListener('click', () => {
      if(this.wordData) {
        this.wordData.wordCard.element.classList.remove('hidden');
      }
      this.element.remove();
    })
  }

  uploadFile(type: string, inputId: string): Promise<{ fileName: string; error: string }> {
    this.removeErrors();
    return new Promise((resolve, reject) => {
      const fileInput = <HTMLInputElement>document.querySelector(`#${inputId}`);
      if (fileInput && fileInput.files) {
        const file = fileInput.files[0];

        this.app.apiService.uploadFile(type, file).then((response) => {
          resolve(response)
          if (!response.error) {
            resolve(response);
          } else {
            this.showError(inputId,response.error)
            reject(response.error);
          }
        });
      }
    });
  }

  showError(nodeId: string, message: string): void {
    const node = this.element.querySelector(`#${nodeId}`);
    if(node){
      const messageNode = document.createElement('div');
      messageNode.classList.add('error');
      messageNode.innerHTML = message;

      const parent = node.parentNode as HTMLElement;
      if(parent) {
        parent.after(messageNode);
      }
    }
  }

  removeErrors(): void {
    const allErrors = this.element.querySelectorAll('.error');
    allErrors.forEach(error => {
      error.remove();
    })
  }


}
