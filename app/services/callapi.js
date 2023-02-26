function CallApi(){
    this.fetchListData = function(){
        return axios({
            url:"https://63df6ff78b24964ae0edc536.mockapi.io/api/product?fbclid=IwAR125H7ylQm0B1LTt7lFecEdQ8mJJRcWkMGYEd-XZA9RoWJLr-N1uXnd_tg/products",
            method: "GET",
        });
    };
}