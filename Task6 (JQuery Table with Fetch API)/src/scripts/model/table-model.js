import { request } from '../utils';
import { PRODUCTS_URL} from '../contants';
import $ from 'jquery';



export class TableModel {
  constructor() {
    this.currentItemId = undefined;
    this.currentObject = undefined;
    this.changedPrice = undefined;
    this.arrayData = [];
    this.checkedCities = [];
  }

  loadProducts = () => request(PRODUCTS_URL);

  deleteProducts = (id, DELETE_PRODUCT_URL) => {
    let deleteUrl = DELETE_PRODUCT_URL + `${id}`;

    return request(deleteUrl, {
      method: 'DELETE'
    })
    .then(response => console.log(response));
  }

  pushNewProductToServer = (addUrl, newItem) => {
    return request(addUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newItem),
    })
    //этот присваивает отправленному объекту сгенерированный id
    // .then(response  => {
    //     this.arrayData.map(item => {
    //     item.id = response.Data.id
    //     });
    //   });
  }

  updateProductOnServer = (UPDATE_PRODUCT_URL, newItem, id) => {
    let putUrl = UPDATE_PRODUCT_URL + `${id}`;

    return request(putUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newItem),
    })
    // .then(response => console.log(response));
  }


  getCurrentItem = identificator => {
    this.currentObject = this.arrayData.find(obj => obj.id === identificator);
  }

  getFilteredArray = inputValue => {
    return this.arrayData.filter(item => item.name.toLowerCase().includes(inputValue));
  }

  getDefaultDelivery = () => {
    this.defaultDelivery = {
      'russia': ['Moscow', 'Saint-Petersburg', 'Novosibirsk', 'Yekaterinburg', 'Kazan'],
      'japan': ['Tokyo', 'Osaka', 'Kyoto', 'Nagoya', 'Kanazawa'],
      'usa': ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'],
     }
  }

  updateCurrentItem = newItem => {
    const removeIndex = this.arrayData.map(item => item.id).indexOf(this.currentItemId);
    this.arrayData.splice(removeIndex, 1, newItem);
  }


  checkEmpty = event => {
    if (event.target.value !== '') {
      event.target.classList.remove('focusedred');
      return false;
    }
    event.target.classList.add('focusedred');
    return true;
  }

  pushNewItem = newItem => {
    this.arrayData.push(newItem);
  }

  formatToMoney = price => {
    const formatter = new Intl.NumberFormat('en', {
        style: 'currency',
        currency: 'USD',
    });
    let format = formatter.format(price);
    return format;
  }

  formatToDigit = price => {
    const currencyFormaters = /[$,]+/g;
    return Math.ceil(price.replace(currencyFormaters, ''));
  }

  changePrice = () => {
    let value = this.currentObject.price;
    value = this.formatToMoney(value);
    return value;
  }

  emailValid = value => !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/).test(value);

  spacesValid = value => /^\s+$/.test(value);

  otherSymbolsValid = value => /[^\d,.]*/g.test(value);

  deleteOtherSymbols = value => value.replace(/[^\d,.]*/g, '');
}
