const form = document.getElementById('form');
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const password2 = document.querySelector('#confirmation');

// Event Listeners
form.addEventListener('submit', getValidation);


function getValidation(e){
    e.preventDefault();
   
    checkRequired(username,email,password,confirmation);
    
    checkLength(username, 2, 16);
    checkLength(password, 6, 20);

    
    isValidEmail(email);

    matchPassword(password,confirmation);
}
//Check required fields
function checkRequired(...inputArray){
    inputArray.forEach(element => {
        // console.log(element);
        if(!element.value){
            showError(element, `${textTransform(element)}`);
        } else {
            showSuccess(element);
        }
    })
}

//Check input length
function checkLength(input,min,max){
    if(input.value.length < min){
        showError(input, `${getFieldName(input)} must be at least ${min} characters long.`)
    } else if (input.value.length > max) {
        showError(input, `${getFieldName(input)} mustn't be more than ${max} character long.`)
    } else {
        showSuccess(input);
    }
}

// Get field name
function getFieldName(text){
    return text.id.charAt(0).toUpperCase() + text.id.slice(1);
}

// Make msg first character uppercase
function textTransform(text){
    if(text.id === 'confirmation'){
        return text.id.charAt(0).toUpperCase() + text.id.slice(1) + ` of password is required`;
    }
    return text.id.charAt(0).toUpperCase() + text.id.slice(1) + ` is required`;
} 


function isValidEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(re.test(input.value.trim())){
        showSuccess(input);
    } else {
        showError(input, 'Email is not valid');
    }
}

function matchPassword(input,input2){
    
      if(input.value !== input2.value){
        showError(input2, 'Passwords don\'t match');

     } else if(input.value === '' && input2.value === ''){
         showError(input, `${textTransform(input)}`);
         showError(input2, `${textTransform(input2)}`);
     
     } else if(input.value === '' || input2.value === ''){
        showError(input || input2,`${textTransform(input || input2)}` )
        
     } else {
       showSuccess(input);
       showSuccess(input2);
    }

}


function showError(field, msg){
    const formCtrl = field.parentElement;
    console.log(formCtrl);
    formCtrl.className = 'form-control error';
    const small = formCtrl.querySelector('small');
    small.innerText = msg;
}

function showSuccess(field){
    const formCtrl = field.parentElement;
    formCtrl.className = 'form-control success';
}


