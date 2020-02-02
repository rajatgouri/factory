
(function ($) {
    "use strict";

    $('.errorMessage').hide();
    

    $.getJSON('/javascripts/countries.json')
    .then(stateObject => {
        var countySel = $(".countrySel")
        var stateSel = $(".stateSel")
        for (var country in stateObject) {
            countySel[0].options[countySel[0].options.length] = new Option(country, country);
        }
        $(".countrySel").on('change', () => {
            $('.stateSel').empty();
            stateSel.length = 1;
            let value = $(".countrySel").val();
            for (let state in stateObject[value]) {
                stateSel[0].options[stateSel[0].options.length] = new Option(state, state);
            }
        });
    })
    .catch(error => console.log(error))

    $('.validate-form .input100').each(function () {
        $(this).focus(function () {
            hideValidate(this);
        });
    });


    function validate(input) {
        if ($(input).attr('type') === 'text' && $(input).attr('name') === 'email') {
            if ($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) === null) {
                showValidate($(input))
                return false;
            } else {
                return true
            }
        } else if ($(input).attr('type') === 'text' && $(input).attr('name') === 'password') {
            if ($(input).val().trim() !== null && $(input).val().trim().length === 8) {
                return true;
            } else {
                showValidate($(input))
                return false
            }
        } else if ($(input).attr('type') === 'text' &&   $(input).attr('name') === 'name') {
            if($(input).val().length > 0) {
                return true;
            } else {
                showValidate($(input))
                return false
            }
        } else if ($(input).attr('type') === 'text' &&   $(input).attr('name') === 'phone') {
            if($(input).val().length  === 10) {
                return true;
            } else {
                showValidate($(input))
                return false
            }
        }  else if ($(input).attr('type') === 'select' &&   $(input).attr('name') === 'country') {
            if($(input).val().length > 0) {
                return true;
            } else {
                showValidate($(input))
                return false
            }            
        } else if ($(input).attr('type') === 'select' &&   $(input).attr('name') === 'state') {
            if($(input).val().length > 0) {
                return true;
            } else {
                showValidate($(input))
                return false
            }            
        }

        else {
            if ($(input).val().trim() === '') {
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();
        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();
        $(thisAlert).removeClass('alert-validate');
    }



    $('.signup100-form-btn').on('click', function () {
        $('.errorMessage').hide();
        let validatedEmail = validate($('.email'));
        let validatedPassword = validate($('.password'));
        let validateName = validate($('.name'));
        let validatePhone = validate($('.phone'));
        let validateCountry = validate($('.countrySel'));
        let validateState = validate($('.stateSel'));

        if (validatedEmail && validatedPassword && validateName && validatePhone && validateCountry && validateState) {
            $.ajax({
                type: "POST",
                url: '/signup',
                data: {
                    username: $('.email').val(),
                    password: $('.password').val(),
                    name: $('.name').val(),
                    phone: $('.phone').val(),
                    country: $('.countrySel').val(),
                    state: $('.stateSel').val()
                },
                success: (result) => {
                    console.log(result);
                },
            });
        } else {
            $('.errorMessage').show();
        }
    });

})(jQuery);