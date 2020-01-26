/* Classes declaration */
class List {
    constructor() {
        this.glasses = [];
        this.numGlasses = 0;
    }

    writeItem(item) {
        this.numGlasses++;
        this.glasses.push(item);
        document.getElementById('items-section').innerHTML += '<div id="' + item.id + '" style="background-color: ' + item.bgColor + '" class="item-div" itemscope itemtype="http://schema.org/Product" onclick="clickMe(\'' + item.id + '\')"><div id="item-img" class="item-img-wrap"><img class="item-img" src="' + item.images[0] + '" alt="' + item.title + '"></div><div class="item-text-div"><h2 id="item-name" class="item-name" itemprop="name">' + item.title + '</h2><p id="item-price" class="item-price" itemprop="price">' + item.price + '€</p></div></div>';
    }

    findById(id) {
        var aux = undefined;
        this.glasses.forEach(g => {
            if (g.id === id) {
                aux = g;
            }
        });
        return aux;
    }
}

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

/* Constants declaration */
const list = new List();
const header = new Header();


/* API Calls */
axios.get('http://puigpedros.salle.url.edu/pwi/glasses/api/list/init')
    .then(function (response) {
        // handle success
        token = response.data.split(': ')[1];
        axios.get('http://puigpedros.salle.url.edu/pwi/glasses/api/list/' + token)
            .then(function (response) {
                var glassesArray = response.data.data.glasses;
                glassesArray.forEach(g => {
                    list.writeItem(g);
                });
                document.getElementById("list").innerHTML = "LIST (" + glassesArray.length + ")";
                document.getElementById("list2").innerHTML = "LIST (" + glassesArray.length + ")";
            })
            .catch(function(error) {

            })
            .finally(function() {

            });
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .finally(function () {
        
    });


document.getElementById('search-input-mobile').addEventListener('input', function(event) {
    var entered = false;    
    // Delete previous items
    document.getElementById('items-section').innerHTML = "";
    // Search items
    list.glasses.forEach(item => {
        if (item.title.toLowerCase().indexOf(this.value.toLowerCase()) !== -1) {
            // Write item into html
            document.getElementById('items-section').innerHTML += '<div id="' + item.id + '" style="background-color: ' + item.bgColor + '" class="item-div" itemscope itemtype="http://schema.org/Product" onclick="clickMe(\'' + item.id + '\')"><div id="item-img" class="item-img-wrap"><img class="item-img" src="' + item.images[0] + '" alt="' + item.title + '"></div><div class="item-text-div"><h2 id="item-name" class="item-name" itemprop="name">' + item.title + '</h2><p id="item-price" class="item-price" itemprop="price">' + item.price + '€</p></div></div>';
            entered = true;
        }
    });
    if (!entered) {
        document.getElementById('items-section').innerHTML += '<p>No hay resultados.</p>'
    }
});

document.getElementById('search-input-desktop').addEventListener('input', function(event) {
    var entered = false;    
    // Delete previous items
    document.getElementById('items-section').innerHTML = "";
    // Search items
    list.glasses.forEach(item => {
        if (item.title.toLowerCase().indexOf(this.value.toLowerCase()) !== -1) {
            // Write item into html
            document.getElementById('items-section').innerHTML += '<div id="' + item.id + '" style="background-color: ' + item.bgColor + '" class="item-div" itemscope itemtype="http://schema.org/Product" onclick="clickMe(\'' + item.id + '\')"><div id="item-img" class="item-img-wrap"><img class="item-img" src="' + item.images[0] + '" alt="' + item.title + '"></div><div class="item-text-div"><h2 id="item-name" class="item-name" itemprop="name">' + item.title + '</h2><p id="item-price" class="item-price" itemprop="price">' + item.price + '€</p></div></div>';
            entered = true;
        }
    });
    if (!entered) {
        document.getElementById('items-section').innerHTML += '<p>No hay resultados.</p>'
    }
});
