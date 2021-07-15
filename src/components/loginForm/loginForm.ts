import Component from "../Component";
import './loginForm.scss';
import type App from "../../app";
import Button from "../button/button";


export default class LoginForm extends Component {
  private html: string;

  constructor(private app: App) {
    super('div', ['login-form__wrapper']);
    this.html = ``;


  }

  render(): void {
    super.render();
    const btnCancel = new Button("Cancel", ['login-form__btn', 'login-form__btn_red'], 'button');
    LoginForm.addCancelBtnHandler(btnCancel);
    btnCancel.element.id = 'cancel-login-btn';
    const btnLogin = new Button("Login", ['login-form__btn'], 'submit');
    this.addSubmitHandler();
    this.renderChildComponent(btnCancel, 'cancel-btn-placeholder');
    this.renderChildComponent(btnLogin, 'login-btn-placeholder');
  }

  buildHtml(): string {
    this.html = `<form class="login-form__form" id="login-form" method="post">
                  <h2 class="h2">Login</h2>
                  <div class="login-form__top">
                    <input type="text"
                     class="login-form__login login-form__input"
                     id="login"
                     name="login"
                     placeholder="Login"
                     value="admin"
                     minlength="3"
                     required>
                    <input type="password"
                     class="login-form__password login-form__input"
                     id="password"
                     name="password"
                     placeholder="Password"
                     value="admin"
                      minlength="3"
                      required>
                  </div>
                  <div class="login-form__bottom">
                    <div class="cancel-btn-placeholder"></div>
                    <div class="login-btn-placeholder"></div>
                  </div>
                </form>
                `;

    return this.html;
  }

  static addCancelBtnHandler(btn: Button): void {
    btn.element.addEventListener('click', () => {
      const loginPopup = document.querySelector('#login-popup');
      if (loginPopup) {
        loginPopup.classList.add('hidden');

      }
    })
  }

  addSubmitHandler(): void {
    const form = this.element.querySelector('#login-form') as HTMLFormElement;
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const name = formData.get('login') as string;
        const password = formData.get('password') as string;
        if (name && password)
          this.app.apiService.login(name, password).then(response => {
            if (response.error) {
              this.showError(response.error);
            } else {
              this.app.navigatePage('admin/categories');
            }
          });
      });
    }
  }

  showError(error: string): void {
    const form = this.element.querySelector('#login-form');
    if (form) {
      const message = document.createElement('div');
      message.classList.add('error');
      message.innerHTML = error
      form.append(message);
    }
  }


}
