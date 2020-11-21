// ==UserScript==
// @name        focus-spoofer
// @namespace   Violentmonkey Scripts
// @match       *://*.*/*
// można ustawić na dowolne
// @grant       none
// @version     1.1
// @author      -
// @description catch me if you can :>
// @run-at        document-start
// ==/UserScript==

//https://stackoverflow.com/questions/1833588/javascript-clone-a-function
//¯\_(ツ)_/¯

Function.prototype.clone = function() {
    var that = this;
    var temp = function temporary() {
        return that.apply(this, arguments);
    };
    for (var key in this) {
        if (this.hasOwnProperty(key)) {
            temp[key] = this[key];
        }
    }
    return temp;
};


Function.prototype.__oldToString = Function.prototype.toString.clone(); //klonujemy toString do późniejszego użytku


function __toStringHooked() {
    if ((this.name == "")||(this.name == "hasFocus")) //hasFocus z jakiegoś powodu nie ma nazwy na firefoxie, nie nadpisuje to żadnych ważnych funkcji więc zostawiam jak jest ¯\_(ツ)_/¯
    {
        return eval+"" //to matchuje regexa
    } else {
        return this.__oldToString(); //zwracamy normalną wartość
    }
}

Function.prototype.toString = __toStringHooked
document.hasFocus = () => true
