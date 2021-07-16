import Component from "../Component";

export default class AdminFooter extends Component {
  private html: string;

  constructor() {
    super('footer', ['footer', 'container']);
    this.html = '';
  }

  buildHtml(): string {
    this.html = `
            <a class="github" href="https://github.com/evgennn32" target="_blank" rel="noopener noreferrer">github</a>
            <a class="rss" href="https://rs.school/js/" target="_blank" rel="noopener noreferrer">
              <span class="rss-year">2021</span>
            </a>
                `;
    return this.html;
  }


}
