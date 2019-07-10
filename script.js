var searchParams;

function random(seed) {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

// http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array, seed) {
    var currentIndex = array.length
      , temporaryValue
      , randomIndex
      ;
    
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
    
        // Pick a remaining element...
        randomIndex = Math.floor(random(seed) * currentIndex);
        currentIndex -= 1;
        
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
  
    return array;
}

function newSeed() {
    return Math.floor(Math.random() * 500);
}

function gen(seed) {
    let text = atob(searchParams.get('q')).split('\n').slice(0, 25);
    let array = shuffle(text, seed / 500);
    let i = 0;
    $('tbody td span:not(.free)').each(function() {
        $(this).text(array[i++]);
    });

    if(searchParams.has('free')) {
        $('tbody td span.free').text(atob(searchParams.get('free')));
    }

    let url = new URL(window.location);
    url.searchParams.set('seed', seed);
    $('#url input').val(url);
}

jQuery(function($) {
    searchParams = new URLSearchParams(window.location.search);
    if(searchParams.has('q')) {
        let seed = newSeed();
        if(searchParams.has('seed')) {
            seed = searchParams.get('seed');
        }
        gen(seed);
    } else {
        $('.d-none').removeClass('d-none');
        $('.row.only-if-valid').remove();
    }
    $('tbody td').click(function() {
        $(this).toggleClass('done');
    });  
});

function toggleURL() { // eslint-disable-line no-unused-vars
    $('#url').toggleClass('hidden');
}

function copyURL() { // eslint-disable-line no-unused-vars
    $('#url input').select();

    document.execCommand('copy');
}