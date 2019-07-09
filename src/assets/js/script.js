
    //open/close lateral filter
    //$('.cd-filter-trigger').on('click', function () {
    function cdFilter() {
        debugger;
        triggerFilter(true);
    }
    //});
    //$('.cd-filter .cd-close').on('click', function () {
    function cdClose() {
        debugger;
        triggerFilter(false);
    }


    //});

    function triggerFilter($bool) {
        var elementsToTrigger = $([$('.cd-filter-trigger'), $('.cd-filter'), $('.cd-tab-filter'), $('.cd-gallery')]);
        elementsToTrigger.each(function () {
            $(this).toggleClass('filter-is-visible', $bool);
        });
    }
