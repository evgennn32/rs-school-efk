import Component from "../Component";
import './menuActivateBtn.scss';

export default class MenuActivateBtn extends Component {
  private html: string;

  constructor( cssClasses: string[]) {
    cssClasses.push('menu-activate')
    super('div', cssClasses);
    this.html = '';
  }

  buildHtml(): string {
    this.html = `
<div class="menu-activate__line-1"></div>
<div class="menu-activate__line-2"></div>
<div class="menu-activate__line-3"></div>
`
    return this.html;
  }
}
