let callApi = new CallApi()
getDataList()
let cart = new Cart();
let productList = [];
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
  let addBtn  = `<button class="btn btn-success" onclick="addDetail('${data.id}')">Add to cart</button>`;
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
    .then(function(result){
      console.log("Item Added: ", result.data);
      let product = new Product(
        result.data.id,
        result.data.name,
        result.data.price,
        result.data.screen,
        result.data.backCamera,
        result.data.frontCamera,
        result.data.img,
        result.data.desc,
        result.data.type
      )
      productList.push(product)
      renderCart(productList)
    })
    .catch(function(error){
      console.log(error);
    })
};


function renderCart(data) {
  let contentHTML = "";
  for(let i = 0; i < data.length; i++) {
    contentHTML += 
    `
    <tr>
      <td>${data[i].name}</td>
      <td>${data[i].price}</td>
    </tr>
    `  
  };
  document.getElementById("renderCart").innerHTML = contentHTML;
}
