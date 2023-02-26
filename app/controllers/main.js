var callApi = new CallApi();
function getEle(id){
    return document.getElementById(id);
} 
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
</td>
<button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="handleEdit(${product.id})">Edit</button>
<button class="btn btn-danger" onclick="handleDelete(${product.id})">Delete</button>
</td>
</tr>
            `;
        });
        getEle("tblDanhSachSP").innerHTML = content;
  }