var callApi = new CallApi();
function getEle(id){
    return document.getElementById(id);
} 
var hinhAnhFromServer = "";
getListProduct();   
  function getListProduct(){
    callApi.fetchListData()
    .then(function(result){
        renderData(result.data);
    })
    .catch(function(error){
        console.log(error);
    });
  }
  function renderData(data){
        var content = "";
        data.forEach(function(product,i){
            content += `
            <tr>
             <td>${i+1}</td>
             <td>${product.name}</td>
              <td>${product.price}</td>
              <td>${product.screen}</td>
              <td>${product.backCamera}</td>
              <td>${product.frontCamera}</td>
<td>
<img scr="./img/${product.img} " width = "50""/>
<td>${product.desc}</td>
<td>${product.type}</td>
<td>
<button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="handleEdit(${product.id})">Edit</button>
</td>
<td>
<button class="btn btn-danger" onclick="handleDelete(${product.id})">Delete</button>
</td>
</tr>
            `;
        });
        getEle("tblDanhSachSP").innerHTML = content;
  }
  function handleDelete(id){
        callApi.deleteProduct(id)
        .then(function(){
            getListProduct();
        })  
        .catch(function(error){
            console.log(error);
        });
    }
    getEle("btnThemSP").addEventListener("click",function(){
        document.getElementsByClassName("modal-title")[0].innerHTML="Add";
        var btnAdd = `<button class= "btn btn-success" onclick="handleAdd()">Add</button>`;
        document.getElementsByClassName("modal-footer")[0].innerHTML =btnAdd;
    });
    function handleEdit(id){
        // update title
        document.getElementsByClassName("modal-title")[0].innerHTML = "Edit";
    
        var btnUpdate = `<button class="btn btn-success" onclick="handleUpdate(${id})">Update</button>`;
        document.getElementsByClassName("modal-footer")[0].innerHTML=btnUpdate;
    
    callApi.getProductById(id)
    .then(function(result){
        var product = result.data;
    //    dom toi cac the input show value
        getEle("name").value = product.name;
        getEle("price").value = product.price;
        getEle("screen").value = product.screen;
        getEle("backCamera").value = product.backCamera;
        getEle("frontCamera").value = product.frontCamera;
        getEle("desc").value = product.desc;
        getEle("type").value = product.type;

// cap nhat hinh anh
hinhAnhFromServer = product.img;
    })  
    .catch(function(error){
console.log(error);
    })
    }
    // update product
    function handleUpdate(){
            var name = getEle("name").value;
            var price = getEle("price").value;
            var screen = getEle("screen").value;
            var backCamera = getEle("backCamera").value;
            var frontCamera = getEle("frontCamera").value;
            var desc = getEle("desc").value;
            var type = getEle("type").value;
        if(getEle("img").files.length>0){
            img = getEle("img").file[0].name;
        }
        if(!img){
            img = hinhAnhFromServer;
        }
        var product = new Product(id, name, price , screen , backCamera, frontCamera,desc,type);
        callApi.updateProduct(product)
        .then(function(result){
            console.log(result.data);
            getListProduct();
            document.getElementsByClassName("close")[0].click();
            hinhAnhFromServer="";
        })
        .catch(function(error){
            console.log(error);
        });
    }
// add product
function handleAdd(){
    var name = getEle("name").value;
            var price = getEle("price").value;
            var screen = getEle("screen").value;
            var backCamera = getEle("backCamera").value;
            var frontCamera = getEle("frontCamera").value;
            var desc = getEle("desc").value;
            var type = getEle("type").value;
        if(getEle("img").files.length>0){
            img = getEle("img").file[0].name;
        }
        var product = new Product("",name,price,screen , backCamera, frontCamera,desc,type);
        callApi.addProduct(product)
        .then(function(result){
            console.log(result.data);
            getListProduct();
            document.getElementsByClassName("close")[0].click();    
        }) .catch(function(error){
            console.log(error);
        });
}