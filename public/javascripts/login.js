
(function ($) {
  "use strict";

  $('.errorMessage').hide();

  $('.validate-form .input100').each(function(){
      $(this).focus(function(){
         hideValidate(this);
      });
  });

  function validate (input) {
      if($(input).attr('type') === 'text' || $(input).attr('name') === 'username') {
          if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) === null) {
            showValidate($(input))
            return false;
          } else {
              return true
          }
      } else if($(input).attr('type') === 'password' || $(input).attr('name') === 'password') {
        if($(input).val().trim() !== null &&  $(input).val().trim().length === 8) {
            return true;
          } else {
            showValidate($(input))
              return false
          } 
      }
      else {
          if($(input).val().trim() ===''){
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
  
  $('.login100-form-btn').on('click', function() {
    $('.errorMessage').hide();
    let validatedEmail = validate($('.username'));
    let validatedPassword = validate($('.password'));
    if ( validatedEmail && validatedPassword) {     
        $.ajax({
        type: "POST",
        url: '/login',
        data: {
            username: $('.username').val(),
            password: $('.password').val()
        },
        success: (response) => {
            if(response.status.code === 200) {
                window.location.assign('dashboard')
            }
        },
        });
    } else {
       $('.errorMessage').show();
    }
  });

})(jQuery);