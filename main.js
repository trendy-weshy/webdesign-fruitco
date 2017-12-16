// holds information about the creator and owner of the website
var owner = {
    email: '',
    name: ''
};

/**
 * Main JavaScript code
 * @param {Window} $ - DOM window object
 * @param {Site} site - Site class object
 */
(function ($, site) {
    'use strict';

    /**
     * register all site event listeners and site functionality
     * @event DOMContentLoad
     */
    $.document.addEventListener('DOMContentLoaded', function () {

        /**
         * perform form submission by sending an email
         * @event onclick - #guestbook-submit
         */
        guestBook.submitBtn.addEventListener('click', function (e) {
            // create a data pocket
            var data = {
                name: guestBook.name.value,
                email: guestBook.email.value
            };
            // validate user form inputs
            if (!data.name || data.name.length === 0) {
                $.alert('Please make sure to fill in your name');
                return false;
            }
            if (!data.email || data.email.length === 0) {
                $.alert('Please make sure to fill in your email address');
                return false;
            }
            if (!site.EMAIL_REGEX.test(data.email)) {
                $.alert('Please enter a valid email address');
                return false;
            }
            // sign the guestbook
            site.signGuestbook(data);
        });
    });

})(window, new Site(
    (owner.email.length === 0 || owner.email.length === 0) ? { email: 'waweruj00@gmail', name: 'John Waweru' } : owner
));
