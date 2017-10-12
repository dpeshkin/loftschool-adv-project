const formActions = function(){
    const form = document.querySelector('form');
    const formFields = form.querySelectorAll('.form__input');
    const formCheckboxes = form.querySelectorAll('.form__c');
    const wrongRadio = document.getElementById('robot-radio-2');
    const formAction = form.getAttribute('action');
    const formMethod = form.getAttribute('method');
    const notification = document.querySelector('.notification');
    const checkInput = (input) => {
        if (input.value.trim() === ''){
            input.classList.add('form__input_empty');
        }else{
            input.classList.remove('form__input_empty');
        }
    };
    const checkBox = (input) => {
        if (!input.checked || wrongRadio.checked){
            input.classList.add('form__c_empty');
        }else{
            input.classList.remove('form__c_empty');
        }
    };
    wrongRadio.onclick = () => {
        [].forEach.call(formCheckboxes, checkBox);
    };
    [].forEach.call(formFields, function(element){
        element.addEventListener('blur', function(){
            checkInput(element);
        });
    });
    formCheckboxes.forEach(function(element){
        element.addEventListener('click', function(){
            checkBox(element);
        });
    });

    if(notification){
        const closeNotification = notification.querySelector('.btn');
        closeNotification.addEventListener('click', (e) => {
            e.preventDefault();
            notification.classList.remove('notification_visible');
            form.reset();
        });
    }

    form.addEventListener('submit', (e) =>{
        e.preventDefault();
        [].forEach.call(formFields, checkInput);
        [].forEach.call(formCheckboxes, checkBox);
        if (!document.querySelector('.form__input_empty') && !document.querySelector('.form__c_empty')){
            const formData = new FormData(form);
            const xhr = new XMLHttpRequest();
            xhr.open(formMethod, formAction);
            xhr.send(formData);
            if(notification) notification.classList.add('notification_visible');
        }
    });
};

const formActionsInit = () => {
    if(document.querySelector('form'))
        formActions();
};

module.exports = formActionsInit;