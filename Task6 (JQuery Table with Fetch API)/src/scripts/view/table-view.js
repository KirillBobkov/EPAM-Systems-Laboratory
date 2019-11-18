import $ from 'jquery';

export class TableView {
  constructor() {
    this.reversePrice = false;
    this.reverseName = false;

    this.body = $('#body');
    this.table = $('#table');
    this.tableBody = $('#table_content');
    
    this.sortLabelName = $('.button--label-name');
    this.sortLabelPrice = $('.button--label-price');

    this.deleteWindow = $('.modalWindow');
    this.editWindow = $('.modalWindow--edit');
    this.deleteWindowYes = $('#deleteWindowYes');
    this.overlay = $('#overlay');

    this.searchInput = $('#searchInput');
    this.priceInputValue = $('#price-product-input');
    this.countInputValue = $('#count-product-input');
    this.nameInputValue = $('#name-product-input');
    this.emailInputValue = $('#email-supplier-input');
  }

  empty = () => {
    this.tableBody.empty();
  };

  renderTable = (array) => {
    this.empty();

    array.forEach((item) => {
      const tableRowTemplate = 
        `<tr id="${item.id}" >
          <td>${item.name}<span class="badge badge-pill badge-dark float-right">${item.count}</span></td>
          <td>${item.price}</td>
          <td data="${item.id}"></td>
        </tr>`;

      this.tableBody.append(tableRowTemplate);

      const buttonEdit = $('<input>', {
        "type": "button",
        "value": "Edit",
        "class": 'btn btn-warning',
        "id": item.id,
        "data-action": "openEditWindow",             
      });

      const buttonDelete = $('<input>', {
        "type": "button",
        "value": "Delete",
        "class": 'btn btn-danger',
        "id": item.id,
        "data-action": "openDeleteWindow",                                  
      });

      $(`[data="${item.id}"]`).append(buttonEdit, buttonDelete);
    });
  }

  sortTableName = (array) => {
    let sortedArray = array;

    if (this.reverseName === false) {
      sortedArray.sort((a, b) => a["name"].localeCompare(b["name"]));
      this.reverseName = true;
      this.sortLabelName.removeClass('button--down')  
                        .addClass('button--up');
    } else {
      sortedArray.sort((a, b) => b["name"].localeCompare(a["name"]));
      this.reverseName = false;
      this.sortLabelName.removeClass('button--up')
                        .addClass('button--down');
    
    }
    this.renderTable(sortedArray);
  }

  sortTablePrice = (array) => {
    let sortedArray = array;

    if (this.reversePrice === false) {
      sortedArray.sort((a, b) => a.price - b.price);
      this.reversePrice = true;
      this.sortLabelPrice.removeClass('button--down')
                        .addClass('button--up');
    } else {
      sortedArray.sort((a, b) => b.price - a.price);
      this.reversePrice = false;
      this.sortLabelPrice.removeClass('button--up')
                        .addClass('button--down');
    }
    this.renderTable(sortedArray);
  }

  changeStateOfWindow = (window, state) => {
    window.css("display", state);
  }

  changeOverlayState = (state) => {
    if (state) this.overlay.fadeIn(400)
    else this.overlay.fadeOut(400)
  }

  renderAfterDelete = (identificator, array) => {
    let changedArray = array;
    const removeIndex = changedArray.map( item => item.id).indexOf(identificator);
    changedArray.splice(removeIndex, 1);
    this.renderTable(changedArray);
  }

  fillInputs = (currentItem) => {
    let {name, price, count, email} = currentItem;

    this.nameInputValue.val(name);
    this.priceInputValue.val(price);
    this.countInputValue.val(count);
    this.emailInputValue.val(email);
  }

  clearInputs = () => {
    this.nameInputValue.val('');
    this.priceInputValue.val('');
    this.countInputValue.val('');
    this.emailInputValue.val('');
  }

}

