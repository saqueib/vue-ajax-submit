// laravel error response 
function handleValidationError(err) {
    if(err) {
    	// Remove errors to start fresh
    	removeErrorHighlight();

    	$.each(err, function(fieldName, e) {
            errMsg = e[0];

            // apply error highlight
            highlightInput(fieldName, errMsg);
        });
    }
}

// Highlight Input with error
function highlightInput(inputName, errorMsg) {
		// get the input by name
        var inputField = $('[name=' + inputName + ']');

        if( inputField.length ) {
            var parentDiv = inputField.closest('.form-group');
                // apply has-error class
                parentDiv.addClass('has-error');

                // add the error msg
                var helpBlock = parentDiv.find('.help-block');
                if( helpBlock.length ) {
                	helpBlock.text(errorMsg);
                } else {
                	// create and append 
                	parentDiv.append($('<p />').addClass('help-block').text(errorMsg));
                }
        }

        // focus first error
        inputField[0].focus();
}

// Reset highlight 
function removeErrorHighlight() {
	$('.form-group').each(function(){
		$(this).removeClass('has-error');
		$(this).find('.help-block').remove();
	});
}

// Default error response handler 
function responseErrorHandler(response) {
    // handle authorization error
    if( response.status === 401 ) {
        swal({
            title: response.statusText,
            text: response.body.msg,
            timer: 1500
        }, function(){
            window.location.reload();
        });
    }

    // any other error
    if( response.status >= 400 ) {
        if( response.status === 422 ) {
            // validation error
            handleValidationError(response.body);
        } else {
            // handle other errors
            var msg = response.body.msg || 'Unable to process your request.';
            swal(response.statusText, msg, 'error');
        }
    }
}

// Default success response handler
function responseSuccessHandler (response) {
	console.log(response);
	// we will check if returend response has a url
	if ( response.body.startsWith('http') ) {
		// redirect to asked url
    	window.location = response.body;
    } else {
    	// reload the page 
        window.location.reload();
    }
}

// Directive
Vue.directive('ajax-submit', {
    bind: function (el, binding, vnode) {
    	
    		// form element
        var $el = $(el),
        	// Submit input button
            submitBtn = $el.closest('form').find(':submit'),
            // Submit input value
            submitBtnText = submitBtn.val(),
            // Loading text, use data-loading-text if found
            loadingText = submitBtn.data('loading-text') || 'Submitting...',
            // Form Method
            method = $el.find('input[name=_method]').val() || $el.prop('method'),
            // Action url for form
            url = $el.prop('action');

        // On form submit handler
        $el.on('submit', function(e) {
        	// Prevent default action
            e.preventDefault();

            // Serialize the form data
            var formData = $el.serialize();

            // Disable the button and change the loading text
            submitBtn.val(loadingText);
            submitBtn.prop('disabled', true);

        	// make http call using jQuery
            $.ajax({ url: url,  method: method,  data: formData })
                .done(function(res) {
                    // Adding a body property to keep the same api
                    res.body = res;

                    // Remove highlights 
                    removeErrorHighlight();

                    // Reset the form
                    $el[0].reset();

                    // check success handler is present
                    if( vnode.data.on && vnode.data.on.success ) {
                        vnode.data.on.success.fn.call(this, res);
                    } else {
                        // run default handler 
                        responseSuccessHandler(res);
                    }
                }).fail( function(err) {
                    // Adding a body property to keep the same api
                    err.body = err.responseJSON;

                    // check error handler is present
                    if( vnode.data.on && vnode.data.on.error ) {
                        vnode.data.on.error.fn.call(this, err);
                    } else {
                        // run default handler
                        responseErrorHandler(err);
                    }
                }).always(function() {
                    // Re-enable button with old value 
                    submitBtn.val(submitBtnText);
                    submitBtn.prop('disabled', false);
                });
        });
    }
});