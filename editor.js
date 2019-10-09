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

    let i = 0;
    if(freeSpaceEnabled) {
        $('tbody td:not(.free) span').each(function() {
            $(this).text(tiles[i++]);
        });
        $('tbody td.free span').text($('.space.free-space textarea').val());
        $('tbody td.free strong').removeClass('d-none');
    } else {
        $('tbody td span').each(function() {
            $(this).text(tiles[i++]);
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

function addSection(context) {
    const clone = editorSectionTemplate.content.cloneNode(true);
    context.parentNode.insertBefore(clone, context.nextSibling);
    updateCard();
}

function removeSection(context) {
    context.remove();
}

jQuery(function($) {
    toggleFreeSpace($('.space.free-space .tgl')[0].checked);

    editorSectionTemplate = document.querySelector('template#editorSection');

    $('tbody td').click(function() {
        
    })
});