$(function () {

    describe('RSS Feeds', function () {

        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        // Ensures that Every Feed in allFeeds Array has URL Defined & not empty
        it('every feed has a URL', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });


        // Ensures that Every Feed in allFeeds Array has name defined & not empty
        it('every feed has a name', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });


    // =======================================================================
    //                          "The menu" Test Suite
    // =======================================================================
    describe('The menu', function () {

        // Ensures that menu is hidden by defalut
        it('is hidden by default', function () {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        // Ensures that menu -when clicked- change it's visibilty
        it('changes visibility when clicked', function () {
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });


    // =======================================================================
    //                      "Initial Entries" Test Suite
    // =======================================================================
    describe('Initial Entries', function () {

        /*
         * This beforeEach() is to make sure we wait for loadFeed() to Finish
         * executing -since it's asynchronous- before we continue Testing.
         */

        beforeEach(function (done) {
            loadFeed(0, done);
        });

        /*
         * this unit test is to ensure that feed container has at least one entry.  
         * we passed 'done' here, to tell our framework that this function relies on 
         * the asynchronous execution.
         */
        it('has at least a single entry ', function (done) {
            expect($('.entry').length).not.toBe(0);
            done();
        });
    });


    // =======================================================================
    //                      "New Feed Selection" Test Suite
    // =======================================================================   
    describe('New Feed Selection', function () {

        var oldContent, newContent;

        /*
         * like previous function, we used this to manage asynchronous execution.
         * also to save initial content, and the -supposedly- updated content.
         * where we want to ensure that these two aren't the same.
         */
        beforeEach(function (done) {
            loadFeed(0, function () {
                oldContent = $('.feed').html();
                loadFeed(1, function () {
                    newContent = $('.feed').html();
                    done();
                });
            });
        });

        // to ensure that content actually changes when loaded
        it('content is changed when loaded asynchronously', function (done) {
            expect(newContent).not.toEqual(oldContent);
            done();
        });
    });

}());
