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
    this.panelBody = $('.panel-body');
    this.deleteWindowYes = $('#deleteWindowYes');
    this.overlay = $('#overlay');
    this.searchInput = $('#searchInput');
    this.priceInputValue = $('#price-product-input');
    this.countInputValue = $('#count-product-input');
    this.nameInputValue = $('#name-product-input');
    this.emailInputValue = $('#email-supplier-input');
    this.delivery = $('#delivery-product');
    this.blockCountry = $('.block-country');
    this.blockCity = $('.block-city');
    this.form = $('.form-add-product');
    this.formControls = $('.form-control');
    this.spinner = $('.spin-wrapper');
  }

  empty = () => {
    this.tableBody.empty();
  }

  renderTable = (array) => {
  this.empty();

  const editedArray = this.editPriceForRenrering(array);

  editedArray.forEach((item) => {
      const tableRowTemplate = 
        `<tr id="${item.id}" >
          <td><a class="arrow" data-action="openEditWindow">${item.name}</a><span class="badge badge-pill badge-dark float-right">${item.count}</span></td>
          <td>${item.price}</td>
          <td class="action-buttons" data="${item.id}"></td>
        </tr>`;

      this.tableBody.append(tableRowTemplate);

      const buttonEdit = $('<input>', {
        type: "button",
        value: "Edit",
        class: 'btn btn-warning',
        id: item.id,
        "data-action":"openEditWindow",             
      });

      const buttonDelete = $('<input>', {
        type: "button",
        value: "Delete",
        class: 'btn btn-danger',
        id: item.id,
        "data-action": "openDeleteWindow",                                  
      });

      $(`.action-buttons`).empty().append(buttonEdit, buttonDelete);
    });
  }

  editPriceForRenrering = array => {
    const edited = array.map(a => Object.assign({}, a));
    const formatter = new Intl.NumberFormat('en', {
      style: 'currency',
      currency: 'USD',
      });

      edited.forEach((item) => {
      item.price = formatter.format(item.price);
    });
    return edited;
  }

  sortTableName = array => {
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

  sortTablePrice = array => {
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

  getInputsValues = (obj, cities, country) => {
    let clone = {};

    if (obj !== undefined) {
      clone = Object.assign({}, obj);
    }

    clone.name =  this.nameInputValue.val();
    clone.price = this.priceInputValue.val();
    clone.count =this.countInputValue.val();
    clone.email = this.emailInputValue.val();
    clone.delivery = {
      country: country,
      city: cities
    }
    return clone;
  }

  fillInputs = (currentItem, changedPrice, defaultDelivery) => {
    let {
      count,
      name,
      email,
      delivery: {
        country,
        city
      }
    } = currentItem;

    this.nameInputValue.val(name);
    this.priceInputValue.val(changedPrice);
    this.countInputValue.val(count);
    this.emailInputValue.val(email);

    if (country) country = country.toLowerCase();
  
    for (let key in defaultDelivery) {
      let template = `<label for="${key}-identificator">
      <input class="radio-buttons" name="country" type="radio" value="${key}" id="${key}-identificator">
      ${key}</label>`;

      this.blockCountry.append(template);
     
      if (key === country) { 
        $(`#${key}-identificator`).prop("checked", true);

        let checkedCountry = key;
      
        defaultDelivery[checkedCountry].forEach(item => {
          let template = `<label for="${item}-identificator">
          <input class="checkbox-buttons" type="checkbox" value="${item}" id="${item}-identificator">
          ${item}</label>`;
    
          this.blockCity.append(template);

          city.forEach(town => {
            if (item === town) {
              $(`#${item}-identificator`).prop("checked", true);
            }
          });
        });  
      }
    }
  }

  chooseRegion = () => {
    const selectedCheckbox = $('#delivery-product :selected');

    if (selectedCheckbox.text() === 'Choose region') {
      this.changeStateOfWindow(this.blockCity, "none");
      this.changeStateOfWindow(this.blockCountry, "none");
    }
  }

  fillDeliveryCountry = (checkedCountry, defaultDelivery) => {
      const selectedCheckbox = $('#delivery-product :selected');
      
      if (selectedCheckbox.text() === 'Country') {
        this.changeStateOfWindow(this.blockCity, "none");
        this.changeStateOfWindow(this.blockCountry, "flex");
        this.blockCountry.empty();
    
        for (let key in defaultDelivery) {
          let template = `<label for="${key}-identificator">
          <input class="radio-buttons" name="country" type="radio" value="${key}" id="${key}-identificator">
          ${key}</label>`;
        
          this.blockCountry.append(template);
        } 

        $(`[value=${checkedCountry}]`).prop("checked", true);
      }  
      this.radioButtons = $('.radio-buttons');
  }

  fillDeliveryCity = (checkedCountry,  checkedCities, defaultDelivery) => {
    const selectedCheckbox = $('#delivery-product :selected');
    
    if (selectedCheckbox.text() === 'City' && checkedCountry)  {
      this.changeStateOfWindow(this.blockCity, "flex");
      this.changeStateOfWindow(this.blockCountry, "none");
      this.blockCity.empty();

      this.blockCity.append(`<label for="selectAll-identificator">
      <input class="selectAll" name="selectAll" type="checkbox" value="selectAll" id="selectAll-identificator">
      Select All</label>`);

      for (let key in defaultDelivery) {
        if (checkedCountry == key) {
          defaultDelivery[key].forEach(item => {
            let template = `<label for="${item}-identificator">
            <input class="checkbox-buttons" type="checkbox" value="${item}" id="${item}-identificator">
            ${item}</label>`;
            
            this.blockCity.append(template);
          });   
        }
      }

      if (checkedCities.length) {
        checkedCities.forEach(city => {
          $(`[value=${city}]`).prop("checked", true);
        });
      }
    
    }
    this.selectAll = $('.selectAll');
    this.checkboxButtons = $('.checkbox-buttons');
  }

  stopScroll = () => {
    this.body.addClass("modal-open");
  }

  addScrollOfPage = () => {
    this.body.removeClass("modal-open");
  }

  changeStateOfWindow = (window, state) => {
    window.css("display", state);
  }

  changeOverlayState = state => {
    if (state) this.overlay.fadeIn(400)
    else this.overlay.fadeOut(400)
  }
  
  clearInputs = () => {
    this.form.trigger("reset");
    this.blockCity.empty();
    this.blockCountry.empty();
    this.changeStateOfWindow( this.blockCity, "none");
    this.changeStateOfWindow( this.blockCountry, "none");
  }

  showError = (field, text) => {
    field.css('border-color', '#eb7e87');
    field.next().html(text);
    field.next().css('color', 'red');
    field.next().css('display', 'inline-block');
  }

  hideError = (field) => {
    field.css('border-color', '#ccc');
    field.next().css('display', 'none');
  }

  clearStyles = (field) => {
    field.css('border-color', '#ced4da');
    field.next().css('display', 'none');
  }
}

