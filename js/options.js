import {$} from "../library/jquery-4.0.0.slim.module.min.js";

var options = function(){
    const default_options = {
        pairs: 2,
        difficulty: 'normal'
    } 

    var pairs = $('#pairs');
    var difficulty = $('#dif');

    var options = Object.create(default_options);

    pairs.on('change', function (){
        options.pairs = pairs.val();
    });

    difficulty.on('change', function (){
        options.difficulty = difficulty.val();
    });

    return {
        applyChanges: function(){
            // TODO: Save
        },
        defaultValues: function(){
            options.pairs = default_options.pairs;
            options.difficulty = default_options.difficulty;
            pairs.val(options.pairs);
            difficulty.val(options.difficulty);
        }
    }
}();

$('#default').on('click', function(){
    options.defaultValues();
})

$('#apply').on('click', function(){
    options.applyChanges();
    location.assign("../");
});
