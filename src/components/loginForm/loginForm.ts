import Component from "../Component";
import './loginForm.scss';
import type App from "../../app";
import Button from "../button/button";



export default class LoginForm extends Component {
  private html: string;

  constructor(app: App) {
    super('div', ['login-form__wrapper']);
    this.html = ``;

  }

  render(): void {
    super.render();
    const btnCancel = new Button("Cancel", ['login-form__btn_red'], 'button');
    const btnLogin = new Button("Login", ['login-form__btn'], 'submit');
    btnCancel.element.id = 'cancel-login-btn';
    this.renderChildComponent(btnCancel,'cancel-btn-placeholder');
    this.renderChildComponent(btnLogin,'login-btn-placeholder');
  }

  buildHtml(): string {
    this.html = `<form class="login-form__form" id="login-form" method="post">
                  <h2>Login</h2>
                  <input type="text" class="login" name="login" placeholder="Login">
                  <input type="text" class="login" name="login" placeholder="Password">
                  <div class="login-form__bottom">
                    <div class="cancel-btn-placeholder"></div>
                    <div class="login-btn-placeholder"></div>
                  </div>
                 <div class="content-placeholder"></div>
                </form>
                `;

    return this.html;
  }


}
