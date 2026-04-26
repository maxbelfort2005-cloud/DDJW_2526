import {$} from "../library/jquery-4.0.0.slim.module.min.js";

var options = function(){
    // Valors per defecte de l'aplicació
    const default_options = {
        pairs: 2,
        difficulty: 'normal',
        groupSize: 2, // Apartat 2a
        mode: 1       // Apartat 2b (Mode 1: Estàndard, Mode 2: Progrés)
    } 

    // Referències als elements del DOM (HTML)
    var pairs = $('#pairs');
    var difficulty = $('#dif');
    var groupSize = $('#group-size');
    var gameMode = $('#game-mode');
    
    // Intentem recuperar opcions guardades, si no, usem l'objecte per defecte
    var savedOptions = localStorage.options && JSON.parse(localStorage.options);
    var options = Object.assign({}, default_options, savedOptions);

    // Actualitzem els camps del formulari amb els valors actuals
    pairs.val(options.pairs);
    difficulty.val(options.difficulty);
    groupSize.val(options.groupSize);
    gameMode.val(options.mode);

    // Listeners per detectar canvis i actualitzar l'objecte en memòria
    pairs.on('change', function (){
        options.pairs = parseInt(pairs.val());
    });

    difficulty.on('change', function (){
        options.difficulty = difficulty.val();
    });

    groupSize.on('change', function (){
        options.groupSize = parseInt(groupSize.val());
    });

    gameMode.on('change', function (){
        options.mode = parseInt(gameMode.val());
    });

    // Mètodes públics per aplicar canvis o restaurar
    return {
        applyChanges: function(){
            localStorage.options = JSON.stringify(options);
            console.log("Opcions guardades:", options);
            location.assign("../"); // Torna al menú principal
        },
        defaultValues: function(){
            // Restaurem l'objecte i la interfície
            Object.assign(options, default_options);
            pairs.val(options.pairs);
            difficulty.val(options.difficulty);
            groupSize.val(options.groupSize);
            gameMode.val(options.mode);
        }
    }
}();

// Vinculació dels botons del peu de pàgina
$('#default').on('click', function(){
    options.defaultValues();
});

$('#apply').on('click', function(){
    options.applyChanges();
});