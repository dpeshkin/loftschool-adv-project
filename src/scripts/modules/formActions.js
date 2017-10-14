const formActions = (() => {
    const form = document.querySelector('form');

    // выводим собщение об успешной отправке формы
    const notificationInit = () => { 
        const notification = document.querySelector('.notification');
        if(notification){
            notification.classList.add('notification_visible');
            const closeNotification = notification.querySelector('.btn');
            closeNotification.addEventListener('click', (e) => {
                e.preventDefault();
                notification.classList.remove('notification_visible');
                form.reset();
            });
        }
    };
    // проверяем инпуты формы
    const checkInput = (input) => {
        if (input.value.trim() === ''){
            input.classList.add('form__input_empty');
        }else{
            input.classList.remove('form__input_empty');
        }
    };
    // проверяем чекбоксы
    const checkBox = (input, wrongRadio) => {
        if (!input.checked || wrongRadio.checked){
            input.classList.add('form__c_empty');
        }else{
            input.classList.remove('form__c_empty');
        }
    };

    // прослушка чекбоксов по click
    const checkboxAddListeners = (formCheckboxes, wrongRadio) => {
        if(formCheckboxes && wrongRadio) {
            wrongRadio.onclick = () => {
                formCheckboxes.forEach(checkBox);
            };
            formCheckboxes.forEach((element) => {
                element.addEventListener('click', () => {
                    formCheckboxes.forEach(checkBox);
                });
            });
        }
    };

    // прослушка инпутов по onblur
    const inputAddListeners = (formFields) => {
        formFields.forEach((element) => {
            element.addEventListener('blur', function(){
                checkInput(element);
            });
        });
    };

    // проверка формы при сабмите
    const formSubmit = (formFields, formCheckboxes) => {
        form.addEventListener('submit', (e) =>{
            e.preventDefault();
            const formAction = form.getAttribute('action');
            const formMethod = form.getAttribute('method');
            formFields.forEach(checkInput);
            formCheckboxes.forEach(checkBox);
            if (!document.querySelector('.form__input_empty') && !document.querySelector('.form__c_empty')){
                const formData = new FormData(form);
                const xhr = new XMLHttpRequest();
                xhr.open(formMethod, formAction);
                xhr.send(formData);
                notificationInit();
            }
        });
    };

    // инииализация модуля
    const formActionsInit = () => {
        if(form){
            const formFields = form.querySelectorAll('.form__input');
            const formCheckboxes = form.querySelectorAll('.form__c'); 
            const wrongRadio = document.getElementById('robot-radio-2');
            formSubmit(formFields, formCheckboxes);
            inputAddListeners(formFields);
            checkboxAddListeners(formCheckboxes, wrongRadio);
        }
    };

    return {
        init:formActionsInit,
    };
})();



module.exports = formActions.init;