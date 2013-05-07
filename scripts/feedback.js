var xmlhttp;
if (window.XMLHttpRequest) {
    // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp=new XMLHttpRequest();
} else {
    // code for IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
}
function setup_feedback() {
    // Attach feedback click listener
    $('#feedback_link').click(function(e) {
        preventDefaultAction(e);
        $('#feedback_modal').modal('show');
    })

    // Attach click listener for submit feedback button
    $('#submit_feedback').click(function(e) {
        var the_form = getById('feedback_form');
        var form_is_valid = true;
        var email = getById('email').value;
        if (email) {
            if (!isValidEmail(email)) {
                form_is_valid = false;
                $('.email_errortip').tooltipster('enable');
                $('.email_errortip').tooltipster('show');
                return;
            }
            else {
                $('.email_errortip').tooltipster('disable');
            }
        }

        var message = getById('message').value;
        if (message == "") {
            form_is_valid = false;
            $('.message_errortip').tooltipster('enable');
            $('.message_errortip').tooltipster('show');
        } else {
            $('.message_errortip').tooltipster('disable');
        }
        if (form_is_valid) {
            var feedback_form = getById('modal_body_content');
            toggle_view(feedback_form, 'loading');
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState==4 && xmlhttp.status==200) {
                    var modal_content = $('.modal_body div');
                    var notification_str = '<div id="modal_body_content"><span class="notification_success_text">Your feedback was submitted successfully. <br />Thank you.</span></div>'
                    var notification = $(notification_str);
                    modal_content.replaceWith(notification);
                    var notification_div = $("#modal_body_content");
                    setTimeout(function() {
                        $("#feedback_modal").modal("hide");
                        notification_div.replaceWith(feedback_form);
                    }, 2000);
                }
            }
            var request_url = '/feedback?email=' + email + '&message=' + message;
            xmlhttp.open('GET', request_url, true);
            setTimeout('xmlhttp.send()', 1500);
            the_form.reset();
        }
    });
}
