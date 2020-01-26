var z = 0;
var c = 0;
var aux;
var clickMenu = 0;
var clickBuscador = 0;
var marc_obert = 0;
var alex_obert = 1;

function canviaPayment(){
    marc_obert = 1;
    alex_obert = 0;
}
function canviaCard(){
    marc_obert = 0;
    alex_obert = 1;
    obraMenu2();
}

function obraCartDesktop(){
    var marc = document.getElementById("marc");
    var alex = document.getElementById("alex");
    marc.style.display = "none";
    alex.style.display = "flex";
}

function obraMenu2(){
    document.getElementsByClassName('container')[0].style.minHeight = '0px';

    clearTimeout(aux);
    var x = document.getElementById("nav-menu");
    var y = document.getElementById("search");
    var a = document.getElementById("icon-header-right");
    var b = document.getElementById("logo");
    var marc = document.getElementById("marc");
    var alex = document.getElementById("alex");
    var span1 = document.getElementById("span-adalt");
    var span2 = document.getElementById("span-abaix");
    var span3 = document.getElementById("span-mig");

    if(c !== 0){
        span1.style.animation = "buscador-adalt 1.5s forwards"
        span3.style.animation = "buscador-mig 1.5s forwards"
        span2.style.animation = "buscador-abaix 1.5s forwards"
        a.style.animation = "apareixer 1.5s forwards";
        b.style.animation = "apareixer 1.5s forwards";
        //alex.style.animation = "apareixer 1.5s forwards";
        //marc.style.animation = "apareixer 1.5s forwards";
        y.style.animation = "opacity 0.75s forwards";
        a.style.visibility = "visible";
        b.style.visibility = "visible";
        span2.style.opacity = "1";
        aux = setTimeout(function(){
            y.style.display = "none";
            if(alex_obert === 1){
                alex.style.display = "flex";
                alex.style.animation = "apareixer 0.5s forwards";
            } else if(marc_obert == 1) {
                marc.style.display = "flex";
                marc.style.animation = "apareixer 0.5s forwards";
            }
            
        }, 975);
        c = 0;
        clickBuscador = 0;

    }else if (z === 0){
        span1.style.animation = "creu-menu-adalt 1.5s forwards"
        span3.style.animation = "creu-menu-mig 1.5s forwards"
        span2.style.animation = "creu-menu-abaix 1.5s forwards"
        a.style.animation = "opacity 1.5s forwards";
        b.style.animation = "opacity 1.5s forwards";
        marc.style.animation = "opacity 0.7s forwards";
        alex.style.animation = "opacity 0.7s forwards";
        aux = setTimeout(function(){
            x.style.display = "block";
            x.style.animation = "slidein 1s forwards";
            span2.style.opacity = "0";
        }, 525);
        aux= setTimeout(function(){
            marc.style.display = "none";
            alex.style.display = "none"
        }, 175);
        aux = setTimeout(function(){
            a.style.visibility= "hidden";
            b.style.visibility= "hidden";
        }, 975);  
        z = 1;
        clickMenu = 1;

    
    } else {
        x.style.animation = "slideout 1.5s forwards";
        span1.style.animation = "menu-adalt 1.5s forwards"
        span3.style.animation = "menu-mig 1.5s forwards"
        span2.style.animation = "menu-abaix 1.5s forwards"
        a.style.animation = "apareixer 1.5s forwards";
        b.style.animation = "apareixer 1.5s forwards";
        //alex.style.animation = "apareixer 1.5s forwards";
        //marc.style.animation = "apareixer 1.5s forwards";
        a.style.visibility = "visible";
        b.style.visibility = "visible";
        aux = setTimeout(function(){
            span2.style.opacity = "1";
            x.style.display = "none";
            if(alex_obert === 1){
                alex.style.display = "flex"
                alex.style.animation = "apareixer 0.5s forwards";
            } else if(marc_obert == 1) {
                marc.style.display = "flex";
                marc.style.animation = "apareixer 0.5s forwards";
            }
            document.getElementsByClassName('container')[0].style.minHeight = '100vh';
        }, 975);
        z = 0;
        clickMenu = 0;
    }
}

function obraBuscadorURL(){
    window.location.href = 'home.html?search=on';
    /*
    clearTimeout(aux);
    var x = document.getElementById("search");
    var a = document.getElementById("icon-header-right");
    var b = document.getElementById("logo");
    var marc = document.getElementById("marc");
    var alex = document.getElementById("alex");
    var span1 = document.getElementById("span-adalt");
    var span2 = document.getElementById("span-abaix");
    var span3 = document.getElementById("span-mig");

    if(c === 0){
        span1.style.animation = "creu-buscador-adalt 1.5s forwards"
        span3.style.animation = "creu-buscador-mig 1.5s forwards"
        span2.style.animation = "creu-buscador-abaix 1.5s forwards"
        a.style.animation = "opacity 1.5s forwards";
        b.style.animation = "opacity 1.5s forwards";
        marc.style.animation = "opacity 1s forwards";
        alex.style.animation = "opacity 1s forwards";
        aux = setTimeout(function(){
            span2.style.opacity = "0";
            x.style.display = "flex";
            x.style.animation = "apareixer 0.75s forwards";
            marc.style.display = "none";
            alex.style.display = "none"
        }, 700);
        aux = setTimeout(function(){
            a.style.visibility= "hidden";
            b.style.visibility= "hidden";
        }, 1300);  
      
        c = 1;
    }
    clickBuscador = 1;
    */
}

/*window.onresize = function(){
    
    if(window.screen.width < 720){
        document.getElementById("nav-menu").style.display = "none";
        document.getElementById("buscar").style.display = "none";
        cont
    } else {
        if(clickBuscador === 1){
            document.getElementById("buscar").style.display = "block";
            document.getElementById("nav-menu").style.display = "none";
        } else if(clickMenu === 1){
            document.getElementById("nav-menu").style.display = "block";
            document.getElementById("buscar").style.display = "none";
        }
        
        
    }
}*/