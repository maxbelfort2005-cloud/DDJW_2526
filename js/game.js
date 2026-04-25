import {$} from "../library/jquery-4.0.0.slim.module.min.js";
import {clickCard, items, selectCards, startGame} from "./memory.js";

var cards = [];
var game = $('#game');

selectCards();
items.forEach(function (value, idx)
{
    game.append(`<img id="${idx}" title="card">`);  // Add element
    cards.push($(`#${idx}`));                       // Obtain element
    setValue(idx, value);                           // Modify values
});

export function setValue(idx, value){
    cards[idx].attr('src', value);
}

export function clickOff(idx){
    cards[idx].off('click');
}

export function clickOn(idx){
    cards[idx].on('click', function(){
        clickCard(idx);
    });
}
$(function() {
	$('#sortir').on('click', function(){
			window.location.assign("../index.html");
		});
});

startGame();
import {clickCard, gameItems, selectCards, startGame, initCard, saveGame} from "./memory.js";

var game = $('#game');

selectCards();
gameItems.forEach(function (value, idx)
{
    game.append(`<img id="${idx}" title="card">`);  // Add element
    let card = $(`#${idx}`);                       // Obtain element
    card.on('click', function(){
        clickCard(idx);
    });
    card.attr('src', value);                  // Modify values   
    initCard(val => card.attr('src', val));        
});
startGame();

$('#save').on('click', ()=>saveGame());