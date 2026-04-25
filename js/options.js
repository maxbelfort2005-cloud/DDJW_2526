import {$} from "../library/jquery-4.0.0.slim.module.min.js";

var options = function(){
    const default_options = {
        pairs: 2,
        difficulty: 'normal',
        type: 2 // Afegim el valor per defecte (parelles)
    } 

    var pairs = $('#pairs');
    var difficulty = $('#dif');
    var type = $('#type'); // Seleccionem el nou desplegable
    
    var savedOptions = localStorage.options && JSON.parse(localStorage.options);
    var options = Object.create(default_options);

    // Carreguem la configuració guardada si existeix
    if (savedOptions){
        if (savedOptions.pairs) options.pairs = savedOptions.pairs;
        if (savedOptions.difficulty) options.difficulty = savedOptions.difficulty;
        if (savedOptions.type) options.type = savedOptions.type; // Carreguem el tipus
    }

    // Assignem els valors als elements de la interfície
    pairs.val(options.pairs);
    difficulty.val(options.difficulty);
    type.val(options.type); // Posem el valor al select de l'HTML

    // Escoltadors per quan l'usuari canvia les opcions
    pairs.on('change', function (){
        options.pairs = pairs.val();
    });

    difficulty.on('change', function (){
        options.difficulty = difficulty.val();
    });

    type.on('change', function (){
        options.type = type.val(); // Actualitzem l'objecte quan canvia el select
    });

    return {
        applyChanges: function(){
            localStorage.options = JSON.stringify(options); // Desa l'objecte sencer
        },
        defaultValues: function(){
            // Restaurem valors per defecte a l'objecte
            options.pairs = default_options.pairs;
            options.difficulty = default_options.difficulty;
            options.type = default_options.type;
            
            // Actualitzem la part visual
            pairs.val(options.pairs);
            difficulty.val(options.difficulty);
            type.val(options.type);
        }
    }
}();

$('#default').on('click', function(){
    options.defaultValues();
})

$('#apply').on('click', function(){
    options.applyChanges();
    location.assign("../"); // Torna al menú principal
});