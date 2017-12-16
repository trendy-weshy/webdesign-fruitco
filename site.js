var guestBook = {
    submitBtn: document.querySelector('#guestbook-submit'),
    name: document.querySelector('#guest-name'),
    email: document.querySelector('#guest-email')
};

/**
 * used to add more functionality to the website
 * @class Site
 * @param {Window} $ - DOM window object
 */
var Site =(function ($) {
    'use strict';

    /**
     * @param {Object} owner - information about the site owner
     * @param {string} owner.name
     * @param {string} owner.email
     * @function constructor
     */
    function Class(owner) {
        this.EMAIL_REGEX = /^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]\@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$/gm;
        /**
         * validates data from guestbook form and creates a formal message to send via e-mail
         * @param {Object} data - guestbook form data
         * @param {string} data.name - name of guest
         * @param {string} data.email - email address of the guest
         */
        this.signGuestbook = function (data) {
            // create a html page
            var message = 'Hey '+ owner.name +',\n\n';
            message += 'My name is ' + data.name + ' ';
            message += 'I checked out your website it looks great. Awesome job keep it up.\n\n\n';
            message += 'Sent by: ' + data.name + '\n';
            message += 'E-mail address: ' + data.email + '\n';

            var mail = 'mailto:' + owner.email;
            mail += '?cc=' + 'mukushh@gmail.com';
            mail += '&subject=' + encodeURIComponent('Hello, just signing your guestbook');
            mail += '&body=' + encodeURIComponent(message);

            // using mailto tag to open user mail client *(on new window)*
            $.open(mail, '__blank');
        };
    }

    return Class;
})(window);
