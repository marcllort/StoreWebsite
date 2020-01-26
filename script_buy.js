var token;
var glasses = new Array();

var canLoad = false;
var glassesFinal = [];


function getApiToken() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "http://puigpedros.salle.url.edu/pwi/glasses/api/list/init", false);
  xhr.send();
  if (xhr.status == 200) {
    var array = xhr.responseText.split(" ");
    token = array[4];
    this.canLoad = true;
  }
}

function resetStock() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "http://puigpedros.salle.url.edu/pwi/glasses/api/reset/" + token, false);
  xhr.send();
  if (xhr.status == 200) {
    //console.log(token);
  }
  else {
    console.log("Error");
  }
}

function isInCartAlready(title, cart) {
  if (cart.length == 0) {
    return -1;
  }
  for (i = 0; i < cart.length; i++) {
    if (cart[i].title === title) {
      return i;
    }
  }
  return -1;
}

function addQuantity(position) {
  glassesFinal[position].quantity++;
}

window.onload = function () {
  getApiToken();

  document.body.addEventListener('click', clickAnywhere, true);

  glasses = JSON.parse(localStorage.getItem('cesta'));
  var a = document.getElementById("container");
  var element;
  cont = 0;
  while (!canLoad) { }
  glasses.map(v => {
    var elementPosition = this.isInCartAlready(v.title, glassesFinal);
    // Si encara no s'ha afegit
    if (elementPosition == -1) {
      var nom = v.title;
      var foto = v.images;
      var preu = v.price;
      var quantity;
      if (v.quantity == '') {
        v.quantity = 1;
      }
      quantity = v.quantity;


      if (element != this.undefined) {
        element = element + "<div class='rcornersauto'><div class='rcorners2'><input class='i1' id='im" + cont + "' value='" + quantity + "' type='number' name='quantity' min='1' max='5' onclick='buttonClick(" + cont + ")'><input class= 'i2' id='foto" + cont + "' type='image' src='" + foto + "' style='width:150px;' alt='Image not available' /><div class='i3'>" + nom + "</div><div class='i4'>" + preu + "€</div></div></div><br><br>";
      } else {
        element = "<div class='rcornersauto'><div class='rcorners2'><input class='i1' id='im" + cont + "' value='" + quantity + "' type='number' name='quantity' min='1' max='5' onclick='buttonClick(" + cont + ")'><input class= 'i2' id=foto" + cont + " type='image' src='" + foto + "' style='width:150px;' alt='Image not available' /><div class='i3'>" + nom + "</div><div class='i4'>" + preu + "€</div></div></div><br><br>";
      }
      cont++;
      //v.quantity = 1;
      glassesFinal.push(v);
    }
    else {
      var aux = 'im' + elementPosition + '';
      addQuantity(elementPosition);
      setTimeout(function () {
        document.getElementById(aux).value = parseInt(document.getElementById(aux).value) + 1;
      }, 200);
    }
  })
  a.innerHTML = element;

  for (var i = 0; i < glassesFinal.length; i++) {
    updateQuantity(i);
  }

  calculatePrice();

};

function clickAnywhere() {
  for (var i = 0; i < glassesFinal.length; i++) {
    updateQuantity(i);
  }
  calculatePrice();
}

function calculatePrice() {
  var price = 0;
  glassesFinal.map(v => {
    price += v.price * v.quantity;
  })

  document.getElementById('price1').value = price + '€';
}

function buyGlasses(id) {

  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://puigpedros.salle.url.edu/pwi/glasses/api/remove/" + token, false);
  xhr.send({ "id": id });

  if (xhr.status == 200) {
    //console.log(token);
    return 0;
  }
  else {
    console.log("Error, id not found or not enough storage");
    return -1;
  }
}

function updateQuantity(a) {
  var quantity = document.getElementById("im" + a).value;
  if (quantity == '') {
    quantity = 1;
    document.getElementById("im" + a).value=1;
  }
  glassesFinal[a].quantity = quantity;

  localStorage.setItem('cesta', JSON.stringify(glassesFinal));

}


function buttonClick(a) {
  document.getElementById("foto" + a).className = 'tada';
  setTimeout(function () {
    document.getElementById("foto" + a).classList.remove('tada');
  }, 1000);
  updateQuantity(a);
  calculatePrice();
}

function takeStock() {
  var price = document.getElementById('price').value;
  glasses = JSON.parse(localStorage.getItem('cesta'));

  var error = false;
  var newGlasses = new Array();
  glasses.map(v => {
    if (!error) {
      if (buyGlasses(v.id) == -1) {
        if (confirm("Error! Not enough stock left. Do you want to continue to Checkout page?")) {
          document.getElementById("alex").style.display = "none";
          document.getElementById("marc").style.display = "flex";
          error = true;
        }
        else {
          resetStock();
          error = true;
        }
      }
      else {
        newGlasses.push({ id: v.id, title: v.title, price: v.price, images: v.images });
        p++;
      }
      i++;
    }
  });

  if (!error) {
    document.getElementById("alex").style.display = "none";
    document.getElementById("marc").style.display = "flex";
  }

  localStorage.setItem('glasses', JSON.stringify(newGlasses));
  localStorage.setItem('price', document.getElementById('price1').value);
  document.getElementById("price").value = document.getElementById('price1').value;
  history.pushState({}, "Cart", "cart.html");
}

window.onscroll = function () {
  var scroll = window.pageYOffset;
  if (scroll > 0) {
    document.getElementById('header-principal').classList.add('active');
    document.getElementById('header-desktop').classList.add('active');
  }
  else {
    document.getElementById('header-principal').classList.remove('active');
    document.getElementById('header-desktop').classList.remove('active');
  }
}
