let email,
    subscribe,
    error;


//validating wether or not email is valid
const _isValidEmailAddress = function(emailAddress) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress);
};

const isEmpty = function(fieldValue) {
    return !fieldValue || !fieldValue.length;
 };

function errorMessage(email, error, message){
    inputField.classList.add("");
    error.innerHTML = "";
}

function removeErrorMessage(email, error){
    field.classList.remove("");
    error.innerHTML = "";
}


 function emailValidation(email){
     if(isEmpty(email.value))
     {
         errorMessage(email, error, "Please enter an email address");
     }
     else if(!_isValidEmailAddress(email.value))
     {
        errorMessage(email, error, "Please enter a valid email address");
     } 
     else
     {
        removeErrorMessage(email, error);
        email.value = "";
     }
 }

 function validator(){
     email = document.querySelector(".js-email");
     subscribe = document.querySelector(".js-subscribe");
     error = document.querySelector(".js-error");
    
     email.addEventListener("input", function(){
        removeErrorMessage(email, error);
    })

     subscribe.addEventListener("click", function(){
        emailValidation(email);
     })

 }

 document.addEventListener("DOMcontentLoaded", function(){
     validator();
 })