import { Component } from '../component';
import './whisperer.component.css';


export class WhispererComponent<T> extends Component {

  private inputElement: HTMLInputElement;

  private datalistElement: HTMLDataListElement;

  private submitButtonElement: HTMLButtonElement;

  private selectedObject: T;

  constructor(
    protected readonly id: string,
    private data: T[],
  ) {
    super(id);
    this.inputElement = this.element.querySelector('input');
    this.datalistElement = this.element.querySelector('datalist');
    this.submitButtonElement = this.element.querySelector('button');
    this.inputElement.oninput = () => this.loadOptions(this.inputElement.value);
    this.submitButtonElement.onclick = () => this.onSubmitButtonClick();
  }

  getSelectedObject(): T {
    return this.selectedObject;
  }

  private async loadOptions(input: string): Promise<void> {
    this.datalistElement.innerHTML = '';

    if(input.length === 0 || ! input) {
      return;
    }

    const filteredEntries = this.data.filter((entry) => entry['name'].toLocaleLowerCase().includes(input.toLocaleLowerCase()));
    const maxOptions = 50;
    let count = 0;

    for(const entry of filteredEntries) {
      if(count >= maxOptions) {
        break;
      }

      await new Promise((resolve) => setTimeout(resolve, 0));

      const option = document.createElement('option');

      option.setAttribute('value', entry['name']);
      option.setAttribute('data-id', entry['name']);
      this.datalistElement.appendChild(option);
      count++;
    }
  }

  private onSubmitButtonClick(): void {
    const object = this.data.find((entry) => entry['name'] === this.inputElement.value);

    if(!object) {
      return;
    }

    this.selectedObject = object;

    const event = new CustomEvent('entryChange', { detail: object });

    this.element.dispatchEvent(event);
  }

}