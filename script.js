window.onload = function () {

    const result = document.querySelector('.resultAll');
    const sendButton = document.querySelector('#send');
    const itemPhone = {value: '', checked: false};
    const itemEmail = {value: '', checked: false};
    const itemName = {value: '', checked: false};
    function checkInput(targetInput, reg, targetResult, item) {
        const input = document.querySelector(targetInput);
        const result = document.querySelector(targetResult);
        input.addEventListener('input', (event) => {
            item.value = event.target.value;
            if (reg.test(event.target.value) === false) {
                result.textContent = 'Введены некоректные данные';
                item.checked = false;
            } else {
                result.textContent = 'Данные введены верно';
                item.checked = true;
            }
        });
    }
    function checkPaste(targetInput, reg, item) {
        const input = document.querySelector(targetInput);
        input.addEventListener('paste', (event) => {
            let paste = (event.clipboardData || window.clipboardData).getData('text');
            paste = paste.replace(reg, "");
            event.target.value = paste;
            item.value = event.target.value;
            event.preventDefault();
        });
    }
    function sendData(itemPhone, itemEmail, itemName) {
        if (itemPhone.checked && itemEmail.checked && itemName.checked) {
            const data = {
                'name': itemName.value,
                'email': itemEmail.value,
                'phone': itemPhone.value
            }
            console.log('Имя:'+data.name)
            console.log( 'Email:'+data.email)
            console.log('Телефон:'+ data.phone)
            let formData = new FormData();
            formData.append("Имя", data.name);
            formData.append("Email", data.email);
            formData.append("Телефон", data.phone);
            result.textContent = 'Отправляем...';
            let request = new XMLHttpRequest();
            request.open("POST", "submitform.php");
            request.send(formData);
            result.textContent = 'Успешно отправлено!';
        } else {
            console.log('Ошибочка вышла');
            result.textContent = 'Укажите правильные данные';
        }
    }

    checkInput('#phone', /^((7|8|\+7|)[\-]?)+(\(?\d{3}\)?[\-]?)?[\d\-]{10,14}$/, '.phoneResult', itemPhone);
    checkInput('#email', /^([A-Za-z0-9_\-\.])+\@gmail.com$/, '.emailResult', itemEmail);
    checkInput('#name', /^[А-ЯЁ][а-яё]*([-][А-ЯЁ][а-яё]*)?\s[А-ЯЁ][а-яё]*\s[А-ЯЁ][а-яё]*$/, '.nameResult', itemName);

    checkPaste('#phone', /[^0-9\-\+]+/gi, itemPhone);
    checkPaste('#email', /[^A-Za-z0-9_\-\.\@]+/gi, itemEmail);
    checkPaste('#name', /[^А-ЯЁа-яё\-]+/gi, itemName);

    sendButton.addEventListener('click', (event) => {
        event.preventDefault();
        sendData(itemPhone, itemEmail, itemName);
    })
}