//michael_salgado
window.onload = function () {
    document.getElementById("submit").onclick = formValidator;
    document.getElementById('nickname').onchange = validarInputs;
    document.getElementById('user').onkeyup = controlUser;
    document.getElementById('user').onchange = controlUser;
    document.getElementById('ip').onchange = validarInputs;
    document.getElementById('email').onchange = validarInputs;
    document.getElementById('pais').onchange = validarInputs;
    var radio = document.getElementsByName('curs');
    comprobarRadio(radio);
    divAccions();
}

function formValidator() {
    var correcte = true;
    var nickname = document.getElementById("nickname");
    var user = document.getElementById("user");
    var ip = document.getElementById("ip");
    var email = document.getElementById("email");
    var pais = document.getElementById("pais");
    var radio = document.getElementsByName('curs');
    var save = document.getElementById("save");

    if (!comprobarRadios(radio)) {
        correcte = false;
    }
    if (!paisSelection(pais)) {
        correcte = false;
    }
    if (!isEmail(email)) {
        correcte = false;
    }
    if (!isIp(ip)) {
        correcte = false;
    }
    if (!valUser(user)) {
        correcte = false;
    }
    if (!isChecked(save)) {
        delCookie("nickname");
    } else {
        setCookie("nickname", "nickname", 1);
    }
    if (!reviewAlphanumeric(nickname)) {
        correcte = false;
    }
    
    return correcte;
}

function validarInputs() {
    var correcte = false;
    switch (this.id) {
        case 'user':
            correcte = valUser(this);
            break;
        case 'nickname':
            correcte = reviewAlphanumeric(this);
            break;
        case 'ip':
            correcte = isIp(this);
            break;
        case 'email':
            correcte = isEmail(this);
            break;
        case 'pais':
            correcte = paisSelection(this);
            break;
        default:
            correcte = radioChecked(this);
            break;
    }
    return correcte;
}
function divAccions(){
    var div = document.createElement("div");
    var text = document.createTextNode("Accions");
    div.appendChild(text);
    document.body.appendChild(div);
}
function controlUser() {
    var alphaExp = /^([a-zA-Z]|\d)+$/;
    var user = document.getElementById("user");
    var numeros = "";
    if (user.value.match(alphaExp)) {
        return true;
    } else {
        var str = user.value;
        user.value = str.replace(/[^a-zA-Z0-9]+/, '');
        user.focus();
        return false;
    }

}
function comprobarRadio(elem) {
    var correcte = false;
    for (var i = 0; i < elem.length; i++) {
        correcte = elem[i].onchange = validarInputs;
        if (correcte) {
            correcte = true;
        }
    }
    return false;
}

function radioChecked(elem) {
    var correcte = false;
    correcte = elem.checked;
    tractaError(correcte, elem);
    return correcte;
}

function valUser(elem) {
    var resultat = isUser(elem.value);
    tractaError(resultat, elem);
    return resultat;
}

function isUser(str) {
    return (str.length >= 4 && str.length <= 9);
}

function reviewAlphanumeric(elem) {
    var resultat = isAlphanumeric(elem.value);
    tractaError(resultat, elem);
    return resultat;
}

function isAlphanumeric(s) {
    var alphaExp = /^[0-9a-zA-Z]+$/;
    return s.match(alphaExp);
}

function isIp(elem) {
    var resultat = stringIsIp(elem.value);
    tractaError(resultat, elem);
    return resultat;
}

function paisSelection(elem) {
    var resultat = isSelected(elem);
    tractaError(resultat, elem);
    return resultat;
}

function isSelected(elem) {
    return (elem.selectedIndex != "0");
}

function stringIsIp(elem) {
    var RegExp = /^\d{3}\.\d{3}\.\d{3}\.\d{3}$/;
    return elem.match(RegExp);
}

function isEmail(elem) {
    var correcte = reviewEmail(elem.value);
    tractaError(correcte, elem);
    return correcte;
}

function reviewEmail(elem) {
    var RegExp = /^\w+\@\w{4,}\.\w{3}$/;
    return elem.match(RegExp);
}

function comprobarRadios(elem) {
    var correcte = reviewRadios(elem);
    tractaError(correcte, elem[0]); //enviamos un elemento, da igual cual
    return correcte;
}

function reviewRadios(elem) {
    var correcte = false;
    for (var i = 0; i < elem.length; i++) {
        if (elem[i].checked) {
            correcte = true;
        }
    }
    return correcte;
}

function getIdMsg(elem) {
    if (elem.id) {
        return elem.id + "_error";
    } else {
        return elem.name + "_error";
    }
}

function isChecked(elem) {
    var correcte = elem.checked;
    return correcte;
}

function setCookie(name, value, days) {
    var ExpireTime = new Date();
    ExpireTime.setTime(ExpireTime.getTime() + (days * 24 * 3600 * 1000));
    document.cookie = name + "=" + escape(value) + ((days == null) ? "" : "; expires= " + ExpireTime.toGMTString());
}

function getCookie(name) {
    if (document.cookie.length > 0) {
        begin = document.cookie.indexOf(name + "=");
        if (begin != -1) {
            begin += name.length + 1;
            end = document.cookie.indexOf(";", begin);
            if (end == -1) end = document.cookie.length;
            return unescape(document.cookie.substring(begin, end));
        }
    }
}

function delCookie(name) {
    if (getCookie(name)) {
        document.cookie = name + "=" + "; expires=" + new Date(0).toGMTString();
    }
}

function tractaError(result, elem) {
    var ionError = getIdMsg(elem);
    if (result) {
        document.getElementById(ionError).style.display = "none";
    } else {
        document.getElementById(ionError).style.display = "inline-block";
        elem.focus();
    }
}
