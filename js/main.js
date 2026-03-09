import $ from '../library/jquery-4.0.0.slim.module.min.js';

$(function() {
    $('#play').on('click', function() {
        let nom = prompt("Nom del personatge:");
        console.log("Iniciant partida amb el nom: " + nom);
        alert("El teu nom de jugador és " + nom + "!");
        $(location).attr('href', "./html/game.html");
    });

    $('#options').on('click', function() {
        console.error("Opció no implementada");
    });

    $('#saves').on('click', function() {
        console.error("Opció no implementada");
    });

    $('#exit').on('click', function() {
        console.warn("No es pot sortir!");
    });
});