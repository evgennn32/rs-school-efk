import Component from "../Component";

export default class AppImage extends Component {

  private html: string;

  constructor(private readonly imageSrc: string) {
    super('div', ['image-wrapper']);
    this.html = ``;
  }

  render(): void {
    super.render();
    const img = document.createElement('img')
    img.src = this.imageSrc
    this.element.appendChild(img);
  }

  buildHtml(): string {
    return this.html;
  }
}
