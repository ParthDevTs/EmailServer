const contactform = document.querySelector('.contact_form');

let names = document.getElementById('name');
let emails = document.getElementById('email');
let subjects = document.getElementById('subject');
let messages = document.getElementById('message');




contactform.addEventListener('submit',(e)=>{
    e.preventDefault();

    let formData = {
        name: names.value,
        email: emails.value,
        subject: subjects.value,
        message: messages.value
    }

    let xhr = new XMLHttpRequest();

    xhr.open('POST', '/');
    xhr.setRequestHeader('content-type', 'application/json');


    xhr.onload= function(){
        console.log(xhr.responseText);
        if(xhr.responseText == 'success'){
            alert('email sent');
            names.value='';
            emails.value='';
            subjects.value='';
            messages.value='';
        }else{
            alert('something went wrong');
        }
    }

    xhr.send(JSON.stringify(formData));
})