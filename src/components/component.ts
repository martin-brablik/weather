export abstract class Component {

  protected element: HTMLElement;

  constructor(protected readonly id: string) {
    this.element = document.getElementById(this.id);
  }

  getElement(): HTMLElement {
    return this.element;
  }

}