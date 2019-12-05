import $ from 'jquery';
import { DELETE_PRODUCT_URL, ADD_PRODUCT_URL, UPDATE_PRODUCT_URL } from '../contants';

export class TableController {
  constructor(view, model) {
    this.view = view;
    this.model = model;
    this.view.body.click(this.click);
    this.view.priceInputValue.on('input', this.stopOtherSymbols);
    this.view.priceInputValue.focusin(this.makePriceToNumber);
    this.view.priceInputValue.focusout(this.makeNumberToPrice);
    this.view.nameInputValue.focusout(this.checkLength);
    this.view.emailInputValue.focusout(this.checkEmail);
    this.view.nameInputValue.focusout(this.checkSpaces);
    this.view.nameInputValue.focusout(this.checkEmptyName);
    this.view.countInputValue.focusout(this.checkEmptyCount);
  }

  //server functions
  loadTable = () => {
    this.model.loadProducts()
    .then(obj => {
      this.model.arrayData = obj.Data;
      this.view.changeStateOfWindow(this.view.spinner, "none");
      this.view.renderTable(this.model.arrayData);
    });
  } 

  deleteFromTable = () => {
    return this.model.deleteProductOnServer(this.model.currentItemId, DELETE_PRODUCT_URL)
    .then(this.loadTable());
  }

  updateItemFromTable = newItem => {
   return this.model.updateProductOnServer(UPDATE_PRODUCT_URL, newItem, this.model.currentItemId)
   .then(this.loadTable());
  }

  pushNewItemToTable = newItem =>  {
    return this.model.pushNewProductToServer(ADD_PRODUCT_URL, newItem)
    .then(this.loadTable());
  }

  // events
  click = event => {
    let action = event.target.dataset.action;
    action && this[action](event);
  }

  sort = event => {
   if (event.target.id == "sortButtonName") this.view.sortTableName(this.model.arrayData)
   else this.view.sortTablePrice(this.model.arrayData);
  }
  
  search = () => {
     const inputValue = this.view.searchInput.val().toLowerCase();
     if (inputValue) {
       let searchproductsList =  this.model.getFilteredArray(inputValue);
       this.view.renderTable(searchproductsList)
     } else {
       this.view.renderTable(this.model.arrayData);
     }
  }

  close = event => {
    event.preventDefault();
    this.view.clearInputs();
    if (event.target.id === "closeEditWindow") {
      this.view.modalInputs = $('[data-reset]');
      this.view.clearStyles(this.view.modalInputs);
      this.view.changeStateOfWindow(this.view.editWindow, "none");
    } else {
      this.view.changeStateOfWindow(this.view.deleteWindow, "none");
    }
    this.view.changeOverlayState(false);
    this.view.addScrollOfPage();
  }

  openDeleteWindow = event => {
    this.model.currentItemId = event.target.closest('tr').id;
    this.view.changeStateOfWindow(this.view.deleteWindow, "block");
    this.view.changeOverlayState(true);
    this.view.stopScroll();
  }
  
  add = () => {
    if (this.validator()) {
      if (this.model.currentObject === undefined) {
        let newItem = this.view.getInputsValues(this.model.currentObject, this.model.checkedCities, this.model.checkedCountry);
        newItem.count = this.model.formatToDigit(newItem.count);
        newItem.price = this.model.formatToDigit(newItem.price);
        this.model.pushNewItem(newItem);
        this.pushNewItemToTable(newItem);

      } else {
        let newItem = this.view.getInputsValues(this.model.currentObject);
        newItem.count = this.model.formatToDigit(newItem.count);
        newItem.price = this.model.formatToDigit(newItem.price);
      
        this.model.updateCurrentItem(newItem);
        this.updateItemFromTable(newItem);
      }

      this.view.changeStateOfWindow(this.view.spinner, "block");
      this.view.changeStateOfWindow(this.view.editWindow, "none");
      this.view.changeOverlayState(false);
      this.view.addScrollOfPage();
    }
  }

  deleteItem = () => {
    this.deleteFromTable();
    this.view.changeStateOfWindow(this.view.deleteWindow, "none");
    this.view.changeOverlayState(false);
    this.view.changeStateOfWindow(this.view.spinner, "block");
    this.view.addScrollOfPage();
  }

  openEditWindow = event => {
    this.model.checkedCountry = undefined;
    this.model.checkedCities = [];
    this.model.currentItemId = event.target.closest('tr').id;
    this.view.clearInputs();
    this.model.getCurrentItem(this.model.currentItemId); 
    this.model.getDefaultDelivery();
    let price = this.model.changePrice();
    this.view.fillInputs(this.model.currentObject, price, this.model.defaultDelivery); 
    this.view.delivery.change(this.changeSelectHandler); 
    this.view.changeStateOfWindow(this.view.editWindow, "block");
    this.view.changeOverlayState(true);
    this.view.stopScroll();
  }

  openAddWindow = () => {
    this.model.checkedCountry = undefined;
    this.model.currentObject = undefined;
    this.model.checkedCities = [];
    this.model.getDefaultDelivery();
    this.view.clearInputs();
    this.view.changeStateOfWindow(this.view.editWindow, "block");
    this.view.stopScroll();
    this.view.changeOverlayState(true);
    this.view.delivery.change(this.changeSelectHandler); 
  }

  changeSelectHandler = () => {
    this.view.chooseRegion();
    this.view.fillDeliveryCountry(this.model.checkedCountry, this.model.defaultDelivery);
    this.view.radioButtons.click(this.saveCheckedCountry);
    this.view.fillDeliveryCity(this.model.checkedCountry, this.model.checkedCities, this.model.defaultDelivery);
    this.view.checkboxButtons.click(this.saveCheckedCity);
    this.view.selectAll.click(this.selectAllCheckboxes);
  }

  selectAllCheckboxes = () => {
    this.view.selectAll.on('change', () => {
      if (this.view.selectAll.prop("checked")) {
        this.view.checkboxButtons.prop("checked", true);
      } else {
        this.view.checkboxButtons.prop("checked", false);
      }
    });
  }
  
  //helpers
  makePriceToNumber = () => {
      this.view.priceInputValue.val(this.model.formatToDigit( this.view.priceInputValue.val() ));
  }

  makeNumberToPrice = () => {
    this.view.priceInputValue.val(this.model.formatToMoney( this.view.priceInputValue.val() ));
  }
  
  saveCheckedCountry = event => {
    this.model.checkedCountry = event.target.value;
  }

  saveCheckedCity = event => {
    this.model.checkedCities.push(event.target.value);
  }

 //validator
  validator = () => {
    return (this.checkEmptyName() &&
        this.checkLength() &&
        this.checkEmail() && 
        this.checkSpaces() &&
        this.checkEmptyCount() )
  }

  stopOtherSymbols = () => {
    let value = this.view.priceInputValue.val();
    if (this.model.otherSymbolsValid(value)) {
      this.view.priceInputValue.val(this.model.deleteOtherSymbols(value));
    }
  }

  checkEmptyName = () => {
    if (this.view.nameInputValue.val() == '') {
      this.view.showError( this.view.nameInputValue, "Поле не может быть пустым");
      return false; 
    } else {
      this.view.hideError(this.view.nameInputValue);
      return true;
    }
  }

  checkEmptyCount = () => {
    if (this.view.countInputValue.val() == '') {
      this.view.showError( this.view.countInputValue, "Поле не может быть пустым");
      return false; 
    } else {
      this.view.hideError(this.view.countInputValue);
      return true;
    }
  }

  checkSpaces = () => {
    let value =  this.view.nameInputValue.val();

    if (this.model.spacesValid(value)) {
      this.view.showError( this.view.nameInputValue, "Поле не может состоять только из пробелов");
      return false; 
    } else {
      this.view.hideError(this.view.nameInputValue);
      return true;
    }
  }

  checkLength = () => {
    if (this.view.nameInputValue.val().length > 15) {
      this.view.showError(this.view.nameInputValue, "Поле больше 15 символов");
      return false; 
    } else {
      this.view.hideError(this.view.nameInputValue);
      return true;
    }
  }

  checkEmail = () => {
    let value  = this.view.emailInputValue.val();

    if (this.model.emailValid(value)) {
      this.view.showError( this.view.emailInputValue, "Введите корректный email");
      return false; 
    } 
    this.view.hideError(this.view.emailInputValue);
    return true;
  }
}
