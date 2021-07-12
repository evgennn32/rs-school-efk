import Component from "../Component";
import './adminWordCard.scss';
import type App from "../../app";
import Button from "../button/button";
import Input from "../input/input";
import logger from "redux-logger";



export default class NewWordCard extends Component {
  private html: string;

  private nameInput: Input;

  private translationInput: Input;

  private imageInput: Input;

  private soundInput: Input;

  constructor(protected app: App,) {
    super('div', ['admin-categories__card']);
    this.nameInput = new Input('name',['admin-words__name-input'],'text','name-input');
    this.translationInput = new Input('translation',['admin-words__translation-input'],'text','translation-input');
    this.imageInput = new Input('image',['admin-words__image-input','btn','avatar-btn'],'file','image-input');
    this.soundInput = new Input('sound',['admin-words__sound-input','btn','avatar-btn'],'file','sound-input');
    this.html = '';
  }

  render(): void {
    super.render();
    const createBtn = new Button('Create',['admin__btn']);
    const cancelBtn = new Button('Cancel',['admin__btn','admin__btn_red']);

    const btnAddImage = document.createElement('input');
    btnAddImage.type = 'file';
    btnAddImage.id = 'avatar-input'
    btnAddImage.classList.add('btn','avatar-btn');
    this.imageInput.element.addEventListener('change',() => {
      console.log( "start uploading image...")
      this.uploadFile('img','image-input').then(() => {
        console.log( "upload finished")
      } ).catch(e => {
        Error(e);
      })
      // const uploadImageProcess = this.makeAvatar();
      // makeAvatarProcess.then((avatar)=>{
      //   this.avatar = avatar
      //   this.updateFormAvatar();
      // })
    });
    this.soundInput.element.addEventListener('change',() => {
      console.log( "start uploading sound...")
      this.uploadFile('sound','sound-input').then(() => {
        console.log( "upload finished")
      } ).catch(e => {
        Error(e);
      })
      // const uploadImageProcess = this.makeAvatar();
      // makeAvatarProcess.then((avatar)=>{
      //   this.avatar = avatar
      //   this.updateFormAvatar();
      // })
    });



    this.addCreateBtnHandler(createBtn);
    this.addCancelBtnHandler(cancelBtn);
    this.renderChildComponent(createBtn, 'create-btn-plh');
    this.renderChildComponent(cancelBtn, 'cancel-btn-plh');
    this.renderChildComponent(this.nameInput,'name-input-plh');
    this.renderChildComponent(this.translationInput,'translation-input-plh');
    this.renderChildComponent(this.imageInput,'image-input-plh');
    this.renderChildComponent(this.soundInput,'sound-input-plh');



  }

  buildHtml(): string {

    this.html = `
<input id="uploadInput" type="file" name="myFiles" onchange="updateSize();" multiple>
    <div class="admin-words__name">Word:</div>
    <div class="name-input-plh"></div>
    <div class="admin-words__name">Translation:</div>
    <div class="translation-input-plh"></div>
    <div class="admin-words__file"> Sound:</div>
    <label for="sound-input" class="custom-file-upload btn avatar-btn">
      Upload:
      <div class="sound-input-plh"></div>
    </label>
    <div class="admin-words__file">Image:</div>
    <label for="image-input" class="custom-file-upload btn avatar-btn">
      Upload:
      <div class="image-input-plh"></div>
    </label>
    <div class="admin-categories__btns">
      <div class="create-btn-plh"></div>
      <div class="cancel-btn-plh"></div>
    </div>
    <div class="remove-btn-plh"></div>
    `;
    return this.html;
  }

  addCreateBtnHandler(btn: Button):void {
    btn.element.addEventListener('click', () => {
      const nameInput = this.nameInput.element as HTMLInputElement
      const translationInput = this.translationInput.element as HTMLInputElement
      const word = nameInput.value;
      const translation = translationInput.value;
      if(word && translation) {
        // this.app.apiService.addCategory(categoryName).then((newCardData) => {
          // eslint-disable-next-line no-underscore-dangle
          // this.app.apiService.getCategoryByDBId(newCardData._id).then(renderCardData => {
          //    const newCard = new AdminCategoryCard( this.app, renderCardData, 0 );
          //    newCard.render();
          //    this.element.replaceWith(newCard.element);
          // }).catch((e) => {
          //   throw Error(e.message)
          // })
       //  })
      }
    })

  }

  addCancelBtnHandler(btn: Button):void {
    btn.element.addEventListener('click', () => {
      this.element.remove();
    })
  }

  uploadFile(type: string, itputId: string) :Promise<{fileName:string}>{
    console.log('here')
    return new Promise((resolve, reject) => {
      const fileInput = <HTMLInputElement>document.querySelector(`#${itputId}`);
      if (fileInput && fileInput.files) {
        const file = fileInput.files[0];

        this.app.apiService.uploadFile(type,file ).then((response) => {
          console.log(response)
          resolve(response)
          // if(!response.error){
          //   resolve(response.fileName);
          // } else {
          //   reject(response.error)
          // }
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
