import { request } from '../utils';
import { PRODUCTS_URL } from '../contants';

export class TableModel {
  constructor() {
    this.arrayData = [];
    this.currentItemId = undefined;
    this.currentObject = undefined;
  }

  loadProducts = () => request(PRODUCTS_URL);
  
  getCurrentItem = () => {
    this.currentObject = this.arrayData.find(obj => obj.id === this.currentItemId);
  }
 }
