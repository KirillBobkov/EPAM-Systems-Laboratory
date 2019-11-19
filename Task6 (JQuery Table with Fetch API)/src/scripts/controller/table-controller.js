import $ from 'jquery';

export class TableController {
  constructor(view, model) {
    this.view = view;
    this.model = model;
    this.view.body.click(this.click);
    
  }

  loadTable = () => {
    this.model.loadProducts()
    .then(obj => {
      this.model.arrayData = obj.Data;
      this.view.changeStateOfWindow(this.view.spinner, "none");
      this.view.renderTable(this.model.arrayData);
    });
  }

  click = (event) => {
    let action = event.target.dataset.action;
    action && this[action](event);
  }

  sort = (event) => {
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

  add = () => {
    if (!this.model.currentObject) {
      const newItem = this.view.getInputsValues();
      this.model.arrayData.push(newItem);
      this.view.renderTable(this.model.arrayData);
    } else {
      const newItem = this.view.getInputsValues();
      this.model.updateCurrentItem(newItem);
      this.view.renderTable(this.model.arrayData);
    }
    
    this.view.changeStateOfWindow(this.view.editWindow, "none");
    this.view.changeOverlayState(false);
  }


  openDeleteWindow = (event) => {
    this.model.currentItemId = event.target.closest('tr').id;
    this.view.changeStateOfWindow(this.view.deleteWindow, "block");
    this.view.changeOverlayState(true);
  }

  openEditWindow = (event) => {
    this.model.currentItemId = event.target.closest('tr').id;
    this.model.getCurrentItem();
    this.view.clearInputs();
    this.model.getDefaultDelivery();
    this.view.fillInputs(this.model.currentObject);
    this.view.delivery.change(this.changeSelectHandler);
    this.view.changeStateOfWindow(this.view.editWindow, "block");
    this.view.changeOverlayState(true);
  }

  openAddWindow = () => {
    this.model.currentObject = undefined;
    this.model.getDefaultDelivery();
    this.view.clearInputs();
    this.view.changeStateOfWindow(this.view.editWindow, "block");
    this.view.changeOverlayState(true);
    this.view.delivery.change(this.changeSelectHandler);
  }

  changeSelectHandler = () => {
    this.view.fillDelivery(this.model.defaultDelivery);
    // this.view.radioButtons = $('.radio-buttons');
    // this.view.radioButtons.click(this.changeRadioHandler);
  }

  // changeRadioHandler = (event) => {
  //   this.view.fillDeliveryCity(event, this.model.defaultDelivery)
  // }

  deleteItem = () => {
    this.view.renderAfterDelete(this.model.currentItemId, this.model.arrayData);
    this.view.changeStateOfWindow(this.view.deleteWindow, "none");
    this.view.changeOverlayState(false);
  }

  close = (event) => {
    if (event.target.id === "closeEditWindow") {
      this.view.changeStateOfWindow(this.view.editWindow, "none");
    } else {
      this.view.changeStateOfWindow(this.view.deleteWindow, "none");
    }
    this.view.changeOverlayState(false);
  }
}
