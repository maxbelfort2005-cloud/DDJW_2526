addEventListener('load', function() {
    document.getElementById('play').addEventListener('click', function(){
        let nom = prompt("Nom del personatge:");
		console.log("Iniciant partida amb el nom: " + nom);
		alert("El teu nom de jugador és "+ nom + "!");
    document.getElementById('play').addEventListener('click', 
    function(){
        window.location.assign("./html/game.html");
    });
    document.getElementById('options').addEventListener('click', function(){
        console.error("Opció no implementada");
    });

    document.getElementById('saves').addEventListener('click', function(){
        console.error("Opció no implementada");
    });

    document.getElementById('exit').addEventListener('click', function(){
        console.warn("No es pot sortir!");
    });
});