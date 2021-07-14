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

  private translation: null;

  private word: null;

  constructor(protected app: App,) {
    super('div', ['admin-categories__card']);
    this.nameInput = new Input('name',['admin-words__name-input'],'text','name-input');
    this.translation = null;
    this.word = null;
    this.translationInput = new Input(
      'translation',['admin-words__translation-input'],'text','translation-input');
    this.imageInput = new Input(
      'image',['admin-words__image-input','btn','avatar-btn'],'file','image-input');
    this.soundInput = new Input(
      'sound',['admin-words__sound-input','btn','avatar-btn'],'file','sound-input');
    this.imageSource = null;
    this.soundSource = null;
    this.html = '';
  }

  render(): void {
    super.render();
    const createBtn = new Button('Create',['admin__btn']);
    const cancelBtn = new Button('Cancel',['admin__btn','admin__btn_red']);
    this.addImageUploadHandler();
    this.addSoundUploadHandler();
    this.renderChildComponent(createBtn, 'create-btn-plh');
    this.renderChildComponent(cancelBtn, 'cancel-btn-plh');
    this.addCreateBtnHandler(createBtn);
    this.addCancelBtnHandler(cancelBtn);

    this.renderChildComponent(this.nameInput,'name-input-plh');
    this.renderChildComponent(this.translationInput,'translation-input-plh');
    this.renderChildComponent(this.imageInput,'image-input-plh');
    this.renderChildComponent(this.soundInput,'sound-input-plh');
  }

  buildHtml(): string {

    this.html = `
    <div class="admin-words__name">Word:</div>
    <div class="name-input-plh"></div>
    <div class="admin-words__name">Translation:</div>
    <div class="translation-input-plh"></div>
    <div class="admin-words__file"> Sound:</div>
    <label for="sound-input" class="custom-file-upload btn avatar-btn">
      Upload
      <div class="sound-input-plh"></div>
    </label>
    <div class="admin-words__file-src"><span>${this.soundSource || ''}</span></div>
    <div class="admin-words__file">Image:</div>
    <label for="image-input" class="custom-file-upload btn avatar-btn">
      Upload
      <div class="image-input-plh"></div>
    </label>
    <div class="admin-words__file-src"><span>${this.imageSource || ''}</span></div>
    <div class="admin-categories__btns">
      <div class="create-btn-plh"></div>
      <div class="cancel-btn-plh"></div>
    </div>
    <div class="remove-btn-plh"></div>
    `;
    return this.html;
  }

  addImageUploadHandler(): void {
    this.imageInput.element.addEventListener('change',() => {
      const loader = new Loader([]);
      loader.render();
      this.imageInput.element.before(loader.element);
      this.uploadFile('img','image-input').then((response) => {
        loader.element.remove();
        if(!response.error && response.fileName) {
          this.imageSource = response.fileName
          this.render();
        }
      } ).catch(e => {
        loader.element.remove();
        Error(e);
      })

    });
  }

  addSoundUploadHandler(): void{
    this.soundInput.element.addEventListener('change',() => {
      const loader = new Loader([]);
      loader.render();
      this.soundInput.element.before(loader.element);
      this.uploadFile('audio','sound-input').then((response) => {

        loader.element.remove();
        if(!response.error && response.fileName) {
          this.soundSource = response.fileName
          const soundFileName = document.createElement('span');
          soundFileName.innerHTML = this.soundSource;
          this.render();
        }
      } ).catch(e => {
        loader.element.remove()
        // TODO show error
        Error(e);
      })
    });
  }

  validateFields(): boolean {
    // TODO add fields validation
    return true
  }

  addCreateBtnHandler(btn: Button):void {
    btn.element.addEventListener('click', () => {
      if(this.validateFields()) {
        const nameInput = this.nameInput.element as HTMLInputElement
        const translationInput = this.translationInput.element as HTMLInputElement
        const word = nameInput.value;
        const translation = translationInput.value;
        if(word && translation && this.soundSource && this.imageSource) {
          const wordData =  {
            word,
            translation,
            image: this.imageSource,
            audioSrc: this.soundSource,
            categoryId: this.app.appData.adminWordsCategory
          }
          this.app.apiService.addWord(wordData).then((newCardData) => {

            const newCard = new AdminWordCard(this.app,newCardData)
            newCard.render()
            this.element.after(newCard.element)
          })
        }
      }

    })

  }

  addCancelBtnHandler(btn: Button):void {
    btn.element.addEventListener('click', () => {
      this.element.remove();
    })
  }

  uploadFile(type: string, itputId: string) :Promise<{fileName:string; error: string}>{
    console.log('here')
    return new Promise((resolve, reject) => {
      const fileInput = <HTMLInputElement>document.querySelector(`#${itputId}`);
      if (fileInput && fileInput.files) {
        const file = fileInput.files[0];

        this.app.apiService.uploadFile(type,file ).then((response) => {
          console.log(response)
          resolve(response)
          if(!response.error){
            resolve(response);
          } else {
            reject(response.error)
          }
        })
        // const reader = new FileReader();
        // reader.readAsBinaryString(file);
        // reader.onload =  (e) => {
        //   if (e.target) {
        //     avatarEncoded = e.target.result;
        //   }
        //   resolve(avatarEncoded);
        //   // reject(this.avatar);
        // }
      }

    });
  }



}
