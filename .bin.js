// dumb code

var xhr = null; // to hold the XMLHttpRequest object
/**
 * create the XMLHttpRequest with fallback capabilities for IE support
 */
var xhrInit = function () {
    try {
        // Opera 8.0+, Firefox, Safari
        xhr = new XMLHttpRequest();
    } catch (e) {
        // Internet Explorer Browsers
        try {
            xhr = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
                // Something went wrong
                alert("Your browser broke! Or version not supported");
                return false;
            }
        }
    }
};
/**
 * sends email to the site owner
 * @param {any} mail - sendgrid REST Api v3 mail object
 * @param {Function} done - callback function
 */
var sendMail = function (mail, done) {
    xhrInit(); // create XMLHttpRequest object

    if (!xhr) {
        return done(new Error("Can't perform ajax request due to support issues"));
    }

    xhr.open('POST', 'https://api.sendgrid.com/v3/mail/send', true); // open request
    xhr.withCredentials = true; // allow Access-Control from the Browsers end
    xhr.timeout = 4000;
    xhr.responseType = 'JSON';
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', 'Bearer ' + MAIL_KEY);
    xhr.send(JSON.stringify(mail)); // send a JSON document

    // if request errors out
    xhr.onerror = function (err) {
        return done(err);
    };
    // if request gets aborted
    xhr.onabort = function () {
        return done(new Error('Mailing request aborted'));
    };
    // react to change in request state
    xhr.onreadystatechange = function () {
        switch(xhr.readyState) {
            case 1:
                console.log('Connected to SendGrid server');
                break;
            case 2:
                console.log('Request sent');
                break;
            case 3:
                console.log('mail request being processed');
                break;
            case 4:
                if (xhr.status === 202 || xhr.status === 200 || xhr.status === 201) {
                    console.log('e-mail sent successfully');
                    return done(null);
                } else {
                    console.log('Error occured while sending e-mail');
                    return done(new Error('SendGrid errored out'));
                }
        }
    };

};