import { TableColumn } from 'src/models/table_column.model';
import { Component } from '../component';
import './table.component.css';

export class TableComponent<T> extends Component {

  private theadElement: HTMLElement;

  private tbodyElement: HTMLElement;

  constructor(
    protected readonly id: string,
    private cols: TableColumn[],
    private data: T[],
  ) {
    super(id);
    this.theadElement = this.element.querySelector('#table_thead');
    this.tbodyElement = this.element.querySelector('#table_tbody');
    this.buildHeader();
  }

  setData(data: T[]): void {
    this.data = data;
    this.populateTable();
  }

  private buildHeader(): void {
    const tr = document.createElement('tr');

    this.theadElement.appendChild(tr);

    this.cols.forEach((col) => {
      const th = document.createElement('th');

      th.setAttribute('data-id', col.id);
      th.innerText = col.localizedName;
      tr.appendChild(th);
    });
  }

  private populateTable(): void {
    this.tbodyElement.innerHTML = '';

    for(const entry of this.data) {
      const tr = document.createElement('tr');

      this.tbodyElement.appendChild(tr);

      for(const col of this.cols) {
        const td = document.createElement('td');

        td.innerText = entry[col.id];
        tr.appendChild(td);
      }
    }
  }

}