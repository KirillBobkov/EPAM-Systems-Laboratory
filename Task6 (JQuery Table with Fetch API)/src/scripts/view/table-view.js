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

    this.delivery = $('#delivery-product');
    this.blockCountry = $('.block-country');
    this.blockCity = $('.block-city');
    this.form = $('.form-add-product');

    this.spinner = $('.spin-wrapper');
  }

  empty = () => {
    this.tableBody.empty();
  }

  renderTable = (array) => {
    this.empty();

    array.forEach((item) => {
      const tableRowTemplate = 
        `<tr id="${item.id}" >
          <td><a class="arrow" data-action="openEditWindow">${item.name}</a><span class="badge badge-pill badge-dark float-right">${item.count}</span></td>
          <td>$ ${item.price.toString().replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1,')}</td>
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
    const removeIndex = changedArray.map(item => item.id).indexOf(identificator);
    changedArray.splice(removeIndex, 1);
    this.renderTable(changedArray);
  }

  getInputsValues = () => {
    let name =  this.nameInputValue.val();
    let price = this.priceInputValue.val();
    let count = this.countInputValue.val();
    let email = this.emailInputValue.val();

    const newItem = {
      delivery: {
        country: "bif",
        city: "bif"
      },
      count: count,
      price: price,
      name: name,
      email: email,
      id: 1111,
    }
    return newItem;
  }

  fillInputs = (currentItem) => {
    let {
      count,
      price,
      name,
      email,
    } = currentItem;

    // if (country) {
    //  this.blockCountry.css("display", "flex");

    //   let template = `<label for="${country}1">
    //   <input type="radio" id="${country}1">
    //   ${country}</label>`;
      
    //   this.blockCountry.append(template);
    // }

    // if (rest.length) {
    //   this.changeStateOfWindow( this.blockCity, "flex");

    //   rest.forEach(city => {
    //     let template = `<label for="${city}1">
    //     <input type="checkbox" id="${city}1">
    //     ${city}</label>`;

    //     this.blockCity.append(template);
    //   });
    // }

    this.nameInputValue.val(name);
    this.priceInputValue.val(price);
    this.countInputValue.val(count);
    this.emailInputValue.val(email);
  }

  fillDelivery = (defaultDelivery) => {
      const selectedCheckbox = $('#delivery-product :selected');
      
      if (selectedCheckbox.text() === 'Country') {
        this.changeStateOfWindow( this.blockCity, "none");
        this.changeStateOfWindow( this.blockCountry, "flex");

        this.blockCountry.empty();
        for (let key in defaultDelivery) {
          let template = `<label for="${key}-identificator">
          <input class="radio-buttons" name="country" type="radio" value="${key}" id="${key}-identificator">
          ${key}</label>`;
        
          this.blockCountry.append(template);
        } 
      } else if (selectedCheckbox.text() === 'City') {
          this.changeStateOfWindow( this.blockCity, "flex");
          this.changeStateOfWindow( this.blockCountry, "none");
    
          this.blockCity.empty();
          for (let key in defaultDelivery) {
                defaultDelivery[key].forEach(item => {
      
                this.changeStateOfWindow( this.blockCity, "flex");
      
                let template = `<label for="${item}-identificator">
                <input class="checkbox-buttons" type="checkbox" value="${item}" id="${item}-identificator">
                ${item}</label>`;
        
                this.blockCity.append(template);
              });   
          }
        } else if (selectedCheckbox.text() === 'Choose region'){
          this.changeStateOfWindow( this.blockCity, "none");
          this.changeStateOfWindow( this.blockCountry, "none");
        }
      } 

  
//   fillDeliveryCity = (defaultDelivery) => {
//     const selectedCheckbox = $('#delivery-product :selected');
    
    // if (selectedCheckbox.text() === 'City') {
    //   this.changeStateOfWindow( this.blockCity, "flex");
    //   this.changeStateOfWindow( this.blockCountry, "none");

    //   this.blockCity.empty();
    //   for (let key in defaultDelivery) {
    //   let template = `<label for="${key}-identificator">
    //   <input class="radio-buttons" name="country" type="radio" value="${key}" id="${key}-identificator">
    //   ${key}</label>`;
    
    //   this.blockCountry.append(template);
    //   } 
    // }

    
// }




  // fillDeliveryCity = (event, defaultDelivery) => {
  //   this.blockCity.empty();

   
  // }

  // fillDeliveryOfCurrentItem = (event, defaultDelivery) => {
  //   this.blockCountry.empty();

  //   this.changeStateOfWindow( this.blockCountry, "flex");
  //   this.changeStateOfWindow( this.blockCity, "flex");

  //     for (let key in defaultDelivery) {
  //       let template = `<label for="${key}-identificator">
  //       <input class="radio-buttons" name="country" type="radio" value="${key}" id="${key}-identificator">
  //       ${key}</label>`;
  //       this.blockCountry.append(template);



  //       if (event.target.value == key) {
  //         defaultDelivery[key].forEach(item => {
  //         let template = `<label for="${item}-identificator">
  //         <input class="checkbox-buttons" type="checkbox" value="${item}" id="${item}-identificator">
  //         ${item}</label>`;
  //         this.blockCity.append(template);
  //       });   
  //     }

  //     }
  // }
  

  clearInputs = () => {
    this.form.trigger("reset");
    this.blockCity.empty();
    this.blockCountry.empty();
    this.changeStateOfWindow( this.blockCity, "none");
    this.changeStateOfWindow( this.blockCountry, "none");
  }
}

