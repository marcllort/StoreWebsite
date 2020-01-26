class Header{
    
    constructor(){
    
    }
    setToken(token){
        this.token = token;
    }
    setNumUlleres(numUlleres){
        this.numUlleres = numUlleres;
    }
    setNumItemsCesta(numItemsCesta){
        this.numItemsCesta = numItemsCesta;
    }
   
}

var header = new Header();

var a = function contaUlleres(){
    axios.get('http://puigpedros.salle.url.edu/pwi/glasses/api/list/' + header.token)
        .then(function (response) {
            // handle success
            var numUlleres = response.data.data.glasses.length;                
            header.setNumUlleres(numUlleres); 
            document.getElementById("list").innerHTML = "LIST (" + numUlleres + ")";
            document.getElementById("list2").innerHTML = "LIST (" + numUlleres + ")";
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
    });
}

axios.get('http://puigpedros.salle.url.edu/pwi/glasses/api/list/init')
  .then(function (response) {
        // handle success
        var data = response.data;
        var token = data.split(": ")[1];
        header.setToken(token);
        //this.header = new Header(token);
        a();
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .finally(function () {
        // always executed
});

//var array = [1, 2, 3]; 
//localStorage.setItem('cesta', JSON.stringify(array));
var arrayFromStroage = JSON.parse(localStorage.getItem("cesta"));
var numItemsCesta = arrayFromStroage.length;
header.setNumItemsCesta(numItemsCesta);
//document.getElementById("cart").innerHTML = "CART (" + numItemsCesta + ")";
//document.getElementById("cart2").innerHTML = "CART (" + numItemsCesta + ")";