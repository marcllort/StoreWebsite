// Event listeners setup
window.addEventListener("load", function (event) {

    var name_input = document.getElementById('myInput');
    var ship_input = document.getElementById('shippingInput');
    //Fer un getLocalstorage preu total i posarlo al html

    name_input.addEventListener("keyup", function (event) { hinter(event) });
    event.target.addEventListener("keydown", function (e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            ship_input.focus();
        }
    });

    document.getElementById("btnComplete").addEventListener("click", function (event) {
        event.preventDefault();
        checkCredit();
    });

    var totalPrice = localStorage.getItem('price');
    document.getElementById("price").value = totalPrice ;

    window.hinterXHR = new XMLHttpRequest();
});

// Autocomplete Countries
function hinter(event) {

    var input = event.target;
    var huge_list = document.getElementById('huge_list');
    var min_characters = 0;

    if (input.value.length < min_characters) {
        return;
    } else {

        window.hinterXHR.abort();
        window.hinterXHR.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var response = JSON.parse(this.responseText);
                huge_list.innerHTML = "";

                response.forEach(function (item) {
                    var option = document.createElement('option');
                    option.value = item.name;
                    huge_list.appendChild(option);
                });
            }
        };

        window.hinterXHR.open("GET", 'https://restcountries.eu/rest/v2/name/' + input.value, true);
        window.hinterXHR.send()
    }

}

// Complete button Check action
function checkCredit() {
    var error = true;
    var radios = document.getElementsByName('credit-card');
    for (const radio of radios) {
        if (radio.checked) {
            error = false;
            break;
        }
    }
    if (error) {
        alert("Error! Payment method not selected");
    }
}