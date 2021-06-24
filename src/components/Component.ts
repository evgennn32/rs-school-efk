export default abstract class Component {
  public element: HTMLElement;

  protected constructor(elementTag: keyof HTMLElementTagNameMap = 'div', cssClasses: string[] = []) {
    this.element = document.createElement(elementTag);
    if (cssClasses.length)
      this.element.classList.add(...cssClasses);
  }

  render(): void {
    this.element.innerHTML = this.buildHtml();
  }

  renderChildComponent(component: Component, componentPlaceholder: string): void {
    component.render();
    const placeholder = <HTMLElement>this.element.querySelector(`.${componentPlaceholder}`);
    if (placeholder) {
      placeholder.replaceWith(component.element);
    }
  }

  renderChildElement(element: HTMLElement, elementPlaceholder: string): void {
    const placeholder = <HTMLElement>this.element.querySelector(`.${elementPlaceholder}`);
    if (placeholder) {
      placeholder.replaceWith(element);
    }
  }


  abstract buildHtml(): string;
}
