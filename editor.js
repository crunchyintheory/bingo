var freeSpaceEnabled,
    editorSectionTemplate;

function toggleURL() { // eslint-disable-line no-unused-vars
    $('#url').toggleClass('hidden');
}

function copyURL() { // eslint-disable-line no-unused-vars
    $('#url input').select();

    document.execCommand('copy');
}

function updateCard() {
    let tiles = [];
    $('.space:not(.free-space) textarea').each(function() {
        tiles.push($(this).val());
    });

    $('tbody td span').each(function() {
        $(this).text('');
    });

    let i = 0;
    if(freeSpaceEnabled) {
        $('tbody td:not(.free) span').each(function() {
            $(this).text(tiles[i]);
            $(this).parent().attr('index', i++);
        });
        $('tbody td.free span').text($('.space.free-space textarea').val());
        $('tbody td.free strong').removeClass('d-none');
    } else {
        $('tbody td span').each(function() {
            $(this).text(tiles[i]);
            $(this).parent().attr('index', i++);
        });
        $('tbody td.free strong').addClass('d-none');
    }

    let url = new URL(window.location);
    url.pathname = url.pathname.split('/').slice(0, -1).join('/');
    $('#url input').val(url.toString());
}

function toggleFreeSpace(force = null) {
    freeSpaceEnabled = (!!force === force) ? force : !freeSpaceEnabled;
    $('.space.free-space textarea').attr('disabled', !freeSpaceEnabled);
    updateCard();
}

function addSection(context, skipUpdate = false, text = null) {
    const clone = editorSectionTemplate.content.cloneNode(true);
    
    if(text !== null) {
        clone.querySelector('textarea').value = text;
    }
    
    context.parentNode.insertBefore(clone, context.nextSibling);
    if(!skipUpdate) {
        updateCard();
    }
}

function removeSection(context) {
    context.remove();
}

function toggleImport() {
    $('#importWrapper').toggleClass('d-none');
    $('.space').toggleClass('d-none');
}

function runImport() {
    const text = $('textarea#import').val();
    const arr = text.split('\n').slice(0, 25);
    
    $('#cb2')[0].checked = arr.length < 25;
    toggleFreeSpace(arr.length < 25);
    const start = $('.space:nth-child(3)');
    let next;
    while((next = start.next()).length) {
        next.remove();
    }

    next = start;
    for(let i = 0; i < arr.length; i++) {
        addSection(next[0], true, arr[i]);
        next = next.next();
        next.addClass('d-none');
    }

    start.remove();

    updateCard();
}

jQuery(function($) {
    toggleFreeSpace($('.space.free-space .tgl')[0].checked);

    editorSectionTemplate = document.querySelector('template#editorSection');

    $('tbody td').click(function() {
        if(freeSpaceEnabled && $(this).is('.free')) {
            $('.space.free-space textarea')[0].focus();
        }
        const textareas = $('.space textarea');
        if(textareas.length - 1 > +$(this).attr('index')) {
            textareas[+$(this).attr('index') + 1].focus();
        }
    })
});