var detailedItem;
var img;
var colorSelector;
var lastItemClicked = undefined;

function clickMe(itemId) {
    // Disappear header
    document.getElementById('header-desktop').style.display = "none";
    document.getElementById('header-principal').style.display = "none";
    document.getElementsByClassName('section')[0].style.display = "none";

    // Add list page to history
    history.pushState({}, "List", "home.html");

    // Constants definition
    const hiddenBottom = document.getElementById('hidden-item-bottom');
    const categories = document.getElementById('top-menu');
    const item = document.getElementById(itemId);
    const buyButton = document.getElementById('button-buy');
    img = item.getElementsByClassName('item-img')[0];
    const descriptionSection = document.getElementById('description-section');
    const itemName = item.getElementsByClassName('item-name')[0];
    const itemPrice = item.getElementsByClassName('item-price')[0];
    const buttonLike = document.getElementById('button-like');
    colorSelector = document.getElementById('color-selector');
    const colorLabel = document.getElementById('color-text');
    const priceLabel = document.getElementById('price-text');
    const descriptionContent = document.getElementById('description-content');

    // Change background color
    document.body.style.backgroundColor = item.style.backgroundColor;

    // Get item details
    detailedItem = list.findById(itemId);

    lastItemClicked = itemId;

    item.onclick = function() {}

    // Put colorSelector options for this item
    for (let i = 0; i < detailedItem.colors.length; i++) {
        var opt = document.createElement('option');
        opt.value = i;
        opt.innerHTML = detailedItem.colors[i];
        colorSelector.appendChild(opt);
    }

    // Put description from the item
    descriptionContent.innerHTML = detailedItem.description;

    document.getElementById('list-container').style.padding = '0px';

    hiddenBottom.style.backgroundColor = item.style.backgroundColor;
    item.style.margin = '0px';
    item.style.borderRadius = '0px';
    item.style.width = '100%';
    item.style.boxShadow = '0px 0px 0px 0px';
    item.style.cursor = 'auto';
    var divs = document.getElementsByClassName('item-div');
    var divsLength = document.getElementsByClassName('item-div').length;
    for (let i = 0; i < divsLength; i++) {
        if (divs[i].id !== itemId) {
            divs[i].style.display = 'none';
        }
    }
    categories.style.display = 'none';
    buyButton.style.position = 'absolute';
    buyButton.style.top = '-22px';
    item.style.animation = 'grow-green-bg 0.1s forwards';
    hiddenBottom.style.animation = 'slideup 0.5s forwards';
    hiddenBottom.style.animationDelay = '0.1s';
    setTimeout(function() {hiddenBottom.style.display = 'block'; hiddenBottom.style.opacity = 0}, 0);
    var height = window.screen.height - 350;
    setTimeout(function() {
        descriptionSection.style.height = height + 'px';
        descriptionSection.style.margin = '0px'
    }, 100);
    setTimeout(function() {
        buttonLike.style.display = 'block'; 
        buttonLike.style.position = 'absolute'; 
        buttonLike.style.top = '20px'; 
        buttonLike.style.right = '20px';
    }, 500);
    if (window.innerWidth < '400') {
        itemName.style.maxWidth = '180px';
        img.style.animation = 'move-down-glasses-400 1s forwards ease';
        itemName.style.animation = 'move-title-up-400 1s forwards ease';
        itemPrice.style.animation = 'move-price-down-400 1s forwards ease';
        colorSelector.style.animation = 'showVersionSelector-400 1s forwards ease';
        colorLabel.style.animation = 'showVersionLabel-400 1s forwards ease';
        priceLabel.style.animation = 'showPriceLabel-400 1s forwards ease';
    }
    else if (window.innerWidth < '550') {
        itemName.style.maxWidth = '250px';
        img.style.animation = 'move-down-glasses-550 1s forwards ease';
        itemName.style.animation = 'move-title-up-550 1s forwards ease';
        itemPrice.style.animation = 'move-price-down-550 1s forwards ease';
        colorSelector.style.animation = 'showVersionSelector-550 1s forwards ease';
        colorLabel.style.animation = 'showVersionLabel-550 1s forwards ease';
        priceLabel.style.animation = 'showPriceLabel-550 1s forwards ease';
    }
    else if (window.innerWidth < '700') {
        itemName.style.maxWidth = '1000px';
        img.style.animation = 'move-down-glasses-700 1s forwards ease';
        itemName.style.animation = 'move-title-up-700 1s forwards ease';
        itemPrice.style.animation = 'move-price-down-700 1s forwards ease';
        colorSelector.style.animation = 'showVersionSelector-700 1s forwards ease';
        colorLabel.style.animation = 'showVersionLabel-700 1s forwards ease';
        priceLabel.style.animation = 'showPriceLabel-700 1s forwards ease';
    }
    else if (window.innerWidth < '765') {
        img.style.animation = 'move-down-glasses-765 1s forwards ease';
        itemName.style.animation = 'move-title-up-765 1s forwards ease';
        itemPrice.style.animation = 'move-price-down-765 1s forwards ease';
        colorSelector.style.animation = 'showVersionSelector-765 1s forwards ease';
        colorLabel.style.animation = 'showVersionLabel-765 1s forwards ease';
        priceLabel.style.animation = 'showPriceLabel-765 1s forwards ease';
    }
    else {
        img.style.animation = 'move-down-glasses-major 1s forwards ease';
        itemName.style.animation = 'move-title-up-major 1s forwards ease';
        itemPrice.style.animation = 'move-price-down-major 1s forwards ease';
        colorSelector.style.animation = 'showVersionSelector-major 1s forwards ease';
        colorLabel.style.animation = 'showVersionLabel-major 1s forwards ease';
        priceLabel.style.animation = 'showPriceLabel-major 1s forwards ease';
    }

    setTimeout(function() {
        descriptionSection.style.height = descriptionSection.offsetHeight + 100 + 'px';
    }, 200);
    
}

function calculateCart(buy) {
    var arrayFromStorage = JSON.parse(localStorage.getItem("cesta"));
    var numItemsCesta = arrayFromStorage.length;
    header.setNumItemsCesta(numItemsCesta);
    document.getElementById("cart-desktop").innerHTML = "CART (" + numItemsCesta + ")";
    document.getElementById("cart-mobile").innerHTML = "CART (" + numItemsCesta + ")";
    if (buy){
        canviarHTML('cart');
    }
}

function buyClick() {
    var actualChart = localStorage.getItem('cesta') ? JSON.parse(localStorage.getItem('cesta')) : [];
    var value = document.getElementById("color-selector").options[document.getElementById("color-selector").selectedIndex].value;
    var src = detailedItem.images[value];
    var detailedItemAux = {
        id: detailedItem.id,
        images: src,
        price: detailedItem.price,
        title: detailedItem.title,
        bgColor: detailedItem.bgColor,
        colors: detailedItem.colors,
        description: detailedItem.description
    };
    detailedItemAux.images = src;
    actualChart.push(detailedItemAux);
    localStorage.setItem('cesta', JSON.stringify(actualChart));
    calculateCart(true);
}

function addItemToChart() {
    if (confirm('Do you want to add the item to the chart?')) {
        buyClick();
    }
}

function likeGlasses() {
    alert(detailedItem.title + ' have been added to the wishlist.');
}

function onChangeSelect() {
    var value = document.getElementById("color-selector").options[document.getElementById("color-selector").selectedIndex].value;
    img.src = detailedItem.images[value];
}

(function(){
    window.onpopstate = function(event) {     
        if (event) {
            window.location.reload();
        }        
    }
})();



// Decideix quin dels dos items del menu s'obren
var i = 0;

// Per controlar si el menu està obert o no (1 obert)
var c = 0;
var aux;
var clickMenu = 0;
var clickBuscador = 0;
var headerAux = document.getElementById('header-principal');

function obraMenu(){
    clearTimeout(aux);
    var x = document.getElementById("nav-menu");
    var y = document.getElementById("search");
    var a = document.getElementById("icon-header-right");
    var b = document.getElementById("logo");
    var listContainer = document.getElementById('list-container');
    var span1 = document.getElementById("span-adalt");
    var span2 = document.getElementById("span-abaix");
    var span3 = document.getElementById("span-mig");

    if (c == 0 && i == 0) {
        b.style.marginLeft = '0px';
        headerAux.style.background = 'none';
    }
    else {
        headerAux.style.backgroundColor = 'white';
    }

    if(c !== 0){
        span1.style.animation = "buscador-adalt 1.5s forwards"
        span3.style.animation = "buscador-mig 1.5s forwards"
        span2.style.animation = "buscador-abaix 1.5s forwards"
        a.style.animation = "apareixer 1.5s forwards";
        b.style.animation = "apareixer 1.5s forwards";
        y.style.animation = "opacity 0.75s forwards";
        a.style.visibility = "visible";
        b.style.visibility = "visible";
        span2.style.opacity = "1";
        aux = setTimeout(function(){
            y.style.display = "none";
        }, 975);
        c = 0;
        clickBuscador = 0;
        document.getElementById('top-menu').style.animation = "apareixer 0.5s forwards";
        aux = setTimeout(function(){
            document.getElementById('top-menu').style.display = "block";
            document.getElementById('list-container').style.marginTop = '50px';
        }, 975);

        // Delete previous items
        document.getElementById('items-section').innerHTML = "";
        // Search items
        list.glasses.forEach(item => {
            document.getElementById('items-section').innerHTML += '<div id="' + item.id + '" style="background-color: ' + item.bgColor + '" class="item-div" itemscope itemtype="http://schema.org/Product" onclick="clickMe(\'' + item.id + '\')"><div id="item-img" class="item-img-wrap"><img class="item-img" src="' + item.images[0] + '" alt="' + item.title + '"></div><div class="item-text-div"><h2 id="item-name" class="item-name" itemprop="name">' + item.title + '</h2><p id="item-price" class="item-price" itemprop="price">' + item.price + '€</p></div></div>';
        });
    }else if (i === 0){
        span1.style.animation = "creu-menu-adalt 1.5s forwards"
        span3.style.animation = "creu-menu-mig 1.5s forwards"
        span2.style.animation = "creu-menu-abaix 1.5s forwards"
        x.style.display = "block";
        x.style.animation = "slidein 1.5s forwards";
        a.style.animation = "opacity 1.5s forwards";
        b.style.animation = "opacity 1.5s forwards";
        if (listContainer) {
            listContainer.style.animation = "opacity 0.2s forwards";
        }
        
        aux = setTimeout(function(){
            span2.style.opacity = "0";
            document.getElementById('list-container').style.marginTop = '0px';
        }, 525);
        aux = setTimeout(function(){
            a.style.visibility= "hidden";
            b.style.visibility= "hidden";
        }, 975);  
        i = 1;
        clickMenu = 1;
    
    } else {
        x.style.animation = "slideout 1s forwards";
        span1.style.animation = "menu-adalt 1.5s forwards"
        span3.style.animation = "menu-mig 1.5s forwards"
        span2.style.animation = "menu-abaix 1.5s forwards"
        a.style.animation = "apareixer 1.5s forwards";
        b.style.animation = "apareixer 1.5s forwards";
        //listContainer.style.animation = "apareixer 1s forwards";
        a.style.visibility = "visible";
        b.style.visibility = "visible";
        setTimeout(function(){
            span2.style.opacity = "1";
            x.style.display = "none";
            document.getElementById('list-container').style.marginTop = '50px';
            if (listContainer) {
                listContainer.style.animation = "apareixer 0.5s forwards";
            }
        }, 900);
        i = 0;
        clickMenu = 0;
    }
}

function obraBuscador(){
    clearTimeout(aux);
    var x = document.getElementById("search");
    var a = document.getElementById("icon-header-right");
    var b = document.getElementById("logo");
    var span1 = document.getElementById("span-adalt");
    var span2 = document.getElementById("span-abaix");
    var span3 = document.getElementById("span-mig");

    if (c == 0) {
        //headerAux.style.background = 'none';
    } else {
        headerAux.style.backgroundColor = 'white';
        document.getElementById('list-container').style.marginTop = '50px';
    }

    if(c === 0){
        span1.style.animation = "creu-buscador-adalt 1.5s forwards"
        span3.style.animation = "creu-buscador-mig 1.5s forwards"
        span2.style.animation = "creu-buscador-abaix 1.5s forwards"
        a.style.animation = "opacity 1.5s forwards";
        b.style.animation = "opacity 1.5s forwards";
        b.style.marginLeft = '30px';
        //console.log(document.getElementById('top-menu'));
        //document.getElementById('top-menu').style.animation = "opacity 1.5s forwards";

        setTimeout(function(){
            //document.getElementById('top-menu').style.display = "none";
            document.getElementById('search').style.marginBottom = "30px";
        }, 700);

        aux = setTimeout(function(){
            span2.style.opacity = "0";
            x.style.display = "block";
            x.style.animation = "apareixer 0.75s forwards";
            document.getElementById('list-container').style.marginTop = '0px';
        }, 700);
        aux = setTimeout(function(){
            a.style.visibility= "hidden";
            b.style.visibility= "hidden";
            document.getElementById('search-input-mobile').focus();
        }, 1300);  
      
        c = 1;
    }
    clickBuscador = 1;
}

var done = true;

window.onresize = function(){
    var ampladaPantalla = window.innerWidth;
    if(ampladaPantalla > 720){
        document.getElementById("nav-menu").style.display = "none";
        document.getElementById("search").style.display = "none";
        if (this.document.getElementById('list-container')) {
            document.getElementById('list-container').style.animation = "apareixer 0.5s forwards";
        }
        done = false;
    } else {
        if (done == false) {
            //this.obraMenu();
        }
        done = true;
    }

    // Per corregir posicio d'elements a la pantalla de item al canviar la mida de la pantalla
    if (this.lastItemClicked !== undefined) {
        this.clickMe(this.lastItemClicked);
    }
}

// Function to calculate Cart number of elements
calculateCart(false);


function canviarHTML(file){
    window.location.href = file + ".html";
}

window.onscroll = function() {
    var scroll = window.pageYOffset;
    if (scroll > 0) {
        document.getElementById('header-principal').classList.add('active');
    }
    else {
        document.getElementById('header-principal').classList.remove('active');
    }
}


window.addEventListener('load', function() {
    var query = window.location.search;
    const urlParams = new this.URLSearchParams(query);
    if (urlParams.get('search') && urlParams.get('search') === 'on') {
        obraBuscador();
    }
});
