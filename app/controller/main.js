let callApi = new CallApi()
getDataList();
let cart = [];
/**
 * function get data from Api
 */
function getDataList() {
  callApi
    .fetchDataList()
    .then(function (result) {
      console.log(result.data)
      renderProduct(result.data)
    })
    .catch(function (error) {
      console.log(error);
    })

};

/**
 * Function display product on webite
 * @param {*} data 
 */
function renderProduct(data) {
  let contentHTML = "";
  data.forEach(product => {
    contentHTML +=
      `
      <div class="col-xl-4 col-sm-6 col-12">
        <div class="card product-item">
          <img class="card-img-top" src="${product.img}" alt="product">
          <div class="card-body">
            <h4 class="card-title">$ ${product.price}</h4>
            <p class="card-text">${product.name}</p>
            <span>
              <img src="./images/star.png" alt="">
              <img src="./images/star.png" alt="">
              <img src="./images/star.png" alt="">
              <img src="./images/star.png" alt="">
            </span>
          </div>
          <div class="product-footer">
            <button class = "btn btn-success" onclick = "viewDetail('${product.id}')"
            >Detail</button>
          </div>
        </div>
      </div>
    `
  });
  document.getElementsByClassName("product-list")[0].innerHTML = contentHTML;
};

/**
 * Get product detail
 * @param {*} id 
 */
function viewDetail(id) {
  callApi
    .findProduct(id)
    .then(function (result) {
      console.log(result.data);
      document.getElementById("open-detail").click();
      renderProductDetail(result.data);
    })
    .catch(function (error) {
      console.log(error);
    })
};


/**
 * Print detail inofmation of product on website
 * @param {*} data 
 */
function renderProductDetail(data) {
  let addBtn = `<button class="btn btn-success" onclick="addDetail('${data.id}')">Add to cart</button>`;
  let detailHTML =
    `
    <div class="row">
      <div class="col-6">
        <div class="detail-img">
          <img src="${data.img}" alt="" class="img-fluid">
        </div>
      </div>
      <div class="col-6">
        <div class="detail-info">
          <p><b>Name</b>: ${data.name} </p>
          <p><b>Price</b>: ${data.price}</p>
          <p><b>Name</b>: ${data.screen}</p>
          <p><b>Back Camera</b>: ${data.backCamera}</p>
          <p><b>Front Camera</b>: ${data.frontCamera}</p>
          <p><b>Description</b>: ${data.desc}</p>
          <p><b>Type</b>: ${data.type} </p>
        </div>
      </div>
    </div>
  `
  document.querySelector(".modal-body").innerHTML = detailHTML;
  document.querySelector(".modal-footer").innerHTML = addBtn;
};


/**
 * Get data of product to add to cart
 * @param {*} id 
 */
function addDetail(id) {
  callApi
    .findProduct(id)
    .then(function (result) {

      addToCart(result.data.id, result.data.name, result.data.price, result.data.img);
      renderCart(cart)
    })
    .catch(function (error) {
      console.log(error);
    })
};

/**
 * add product to cart
 * @param {*} data 
 * @returns 
 */
function addToCart(id, name, price ,img) {
  var product = new Product(id, name, price, 1 ,img)

  for (let i in cart) {
    if (cart[i].id === product.id) {
      cart[i].count++;
      return
    }
  }
  cart.push(product)
};

function removeCart(id){
  for(let i in cart) {
    if(cart[i].id === id) {
      cart[i].count --;
      if(cart[i].count === 0) {
        cart.splice(i, 1);
      }
      break;
    }
}
};

function removeCartAll(id){
  for (let i in cart){
    if (cart[i].id === id){
      cart.splice(i, 1);
    }
    break;
  }
}

/**
 * total count in cart
 * @returns 
 */
function totalCount() {
  var totalCount = 0;
  for (var i in cart) {
    totalCount += cart[i].count;
  }
  return totalCount;
};



/**
 * render table cart
 * @param {*} data 
 */
function renderCart(data) {
  let cart = [];
  cart = data;
  console.log(cart.length);
  let contentHTML = "";
  if(cart.length == 0){
    contentHTML = `
    <tr>
      <td colspan="4">
        <p style="font-size: 18px;">"Your cart is empty"</p>
      </td>
    </tr>
    `
  }
  for (let i = 0; i < cart.length; i++) {
    contentHTML +=
      `
    <tr>
      <td class="pt-3 pb-3"><img src="${cart[i].img}" alt="" width = 100px></td>
      <td class="">${cart[i].name}</td>
      <td class="">${cart[i].price}</td>
      <td class="">
        <span>
          <button class="btn btn-secondary" onclick="minusItem('${cart[i].id}')">-</button>
            ${cart[i].count}
          <button class="btn btn-secondary" onclick="plusItem('${cart[i].id}','${cart[i].name}','${cart[i].price}')">+</button>  
        <span>
      </td>
      <td>
        <button class="btn btn-danger" onclick="deleteItem('${cart[i].id}')">Delete</button>
      </td>
    </tr>
    `
  };
  document.getElementById("renderCart").innerHTML = contentHTML;
}

/**
 * Plus item in cart
 * @param {*} id 
 * @param {*} name 
 * @param {*} price 
 */
function plusItem(id, name, price){
  addToCart(id, name, price);
  renderCart(cart)
};

function minusItem(id) {
  removeCart(id)
  renderCart(cart)
};

function deleteItem(id) {
  removeCartAll(id);
  renderCart(cart)
};

