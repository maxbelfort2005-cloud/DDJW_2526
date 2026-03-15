$(document).ready(function() {
    
    // Botón Play
    $('#play').on('click', function() {
        let nom = prompt("Nom del personatge:");
        console.log("Iniciant partida amb el nom: " + nom);
        alert("El teu nom de jugador és " + nom + "!");
        
        // En jQuery seguimos usando window.location para redirecciones
        window.location.assign("./html/game.html");
    });

    // Botón Options
    $('#options').on('click', function() {
        console.error("Opció no implementada");
    });

    // Botón Saves
    $('#saves').on('click', function() {
        console.error("Opció no implementada");
    });

    // Botón Exit
    $('#exit').on('click', function() {
        console.warn("No es pot sortir!");
    });

});