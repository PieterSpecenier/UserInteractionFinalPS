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
    email.classList.add("has-error");
    error.innerHTML = message;
}

function removeErrorMessage(email, error){
    email.classList.remove("has-error");
    error.innerHTML = "";
}


 function emailValidation(email){
     if(isEmpty(email.value))
     {
         errorMessage(email, error, "");
     }
     else if(!_isValidEmailAddress(email.value))
     {
        errorMessage(email, error, "");
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
        console.log("error fixed");
    })

     subscribe.addEventListener("click", function(e){
         console.log("checking for error");
        emailValidation(email);
        e.preventDefault();
     })

 }

 document.addEventListener("DOMContentLoaded", function(){
     validator();
 })