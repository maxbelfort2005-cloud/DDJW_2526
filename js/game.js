import {$} from "../library/jquery-4.0.0.slim.module.min.js";
import {clickCard, gameItems, selectCards, startGame, initCard, saveGame} from "./memory.js";

var game = $('#game');
selectCards();

gameItems.forEach(function (svgContent, idx) {
    // Creem el contenidor net, sense estils inline
    game.append(`<div id="card-${idx}" class="card-container"></div>`);
    let card = $(`#card-${idx}`);
    
    card.on('click', function() {
        clickCard(idx);
    });

    initCard(newSvg => card.html(newSvg));
});
startGame();

$('#save').on('click', () => saveGame());