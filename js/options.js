import {$} from "../library/jquery-4.0.0.slim.module.min.js";

var options = function(){
    const default_options = {
        pairs: 2,
        groupSize: 2,
        mode: 1,
        difficulty: 'normal'
    } 

    var pairs = $('#pairs');
    var groupSize = $('#group-size');
    var mode = $('#game-mode');
    var difficulty = $('#dif');
    
    var savedOptions = localStorage.options ? JSON.parse(localStorage.options) : default_options;
    var options = Object.assign({}, default_options, savedOptions);

    pairs.val(options.pairs);
    groupSize.val(options.groupSize);
    mode.val(options.mode);
    difficulty.val(options.difficulty);

    return {
        applyChanges: function(){
            options.pairs = pairs.val();
            options.groupSize = groupSize.val();
            options.mode = mode.val();
            options.difficulty = difficulty.val();
            
            localStorage.options = JSON.stringify(options);
        },
        defaultValues: function(){
            options = Object.assign({}, default_options);
            pairs.val(options.pairs);
            groupSize.val(options.groupSize);
            mode.val(options.mode);
            difficulty.val(options.difficulty);
        }
    }
}();

$('#default').on('click', function(){
    options.defaultValues();
});

$('#apply').on('click', function(){
    options.applyChanges();
    location.assign("../");
});