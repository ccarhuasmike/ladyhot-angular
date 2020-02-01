//open/close lateral filter    
function cdFilter() {
    triggerFilter(true);
}

function cdClose() {
    triggerFilter(false);
}

function triggerFilter($bool) {
    var elementsToTrigger = $([$('.cd-filter-trigger'), $('.cd-filter'), $('.cd-tab-filter'), $('.cd-gallery')]);
    elementsToTrigger.each(function() {
        $(this).toggleClass('filter-is-visible', $bool);
    });
}