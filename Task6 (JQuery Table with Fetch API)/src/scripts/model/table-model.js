import { request } from '../utils';
import { PRODUCTS_URL } from '../contants';
import $ from 'jquery';

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

  getFilteredArray = (inputValue) => {
    return this.arrayData.filter(item => item.name.toLowerCase().includes(inputValue));
  }

  getDefaultDelivery = () => {
    this.defaultDelivery = {
      'Russia': ['Moscow', 'Saint-Petersburg', 'Novosibirsk', 'Yekaterinburg', 'Kazan'],
      'Japan': ['Tokyo', 'Osaka', 'Kyoto', 'Nagoya', 'Kanazawa'],
      'Usa': ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'],
     }
  }

  updateCurrentItem = (newItem) => {
    const removeIndex = this.arrayData.map(item => item.id).indexOf(this.currentItemId);
    this.arrayData.splice(removeIndex, 1, newItem);
  }

  // convertPrice = () => {
  //   const this. = this.arrayData.map(item => {
  //     item.price = '$' + item.price.toString().replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1,');
  //   });
// }
  
 }
