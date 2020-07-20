window.onload = function () {

    const resultAll = document.querySelector('.resultAll');
    const sendButton = document.querySelector('#send');
    const itemPhone = {value: '', id: '#phone', result: '.phoneResult', checked: false};
    const itemEmail = {value: '', id: '#email', result: '.emailResult', checked: false};
    const itemName = {value: '', id: '#name', result: '.nameResult', checked: false};

    function checkInput(item, reg) {
        const input = document.querySelector(item.id);
        const result = document.querySelector(item.result);
        input.addEventListener('input', (event) => {
            item.value = event.target.value;
            if (reg.test(item.value) === false) {
                result.textContent = 'Введены некоректные данные';
                item.checked = false;
            } else {
                result.textContent = 'Данные введены верно';
                item.checked = true;
            }
        });
    }

    function checkPaste(item, reg) {
        const input = document.querySelector(item.id);
        input.addEventListener('paste', (event) => {
            let paste = (event.clipboardData || window.clipboardData).getData('text');
            paste = paste.replace(reg, "");
            if (input.setRangeText) {
                input.setRangeText(paste)
            } else {
                input.focus()
                document.execCommand('insertText', false, paste);
            }
            item.value = event.target.value;
            console.log( item.value)
            event.preventDefault();
        });
    }

    function btnClick(itemPhone, itemEmail, itemName) {
        if (itemPhone.checked && itemEmail.checked && itemName.checked) {
            const data = {
                'name': itemName.value,
                'email': itemEmail.value,
                'phone': itemPhone.value
            }
            console.log('Имя:' + data.name)
            console.log('Email:' + data.email)
            console.log('Телефон:' + data.phone)
            sendData(data);
        } else {
            console.log('Ошибочка вышла');
            resultAll.textContent = 'Укажите правильные данные';
        }
    }

    sendData = async (data) => {
        let formData = new FormData();
        formData.append("Имя", data.name);
        formData.append("Email", data.email);
        formData.append("Телефон", data.phone);
        resultAll.textContent = 'Отправляем...';
        let request = new XMLHttpRequest();
        request.open("POST", "someform.php");
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
        request.send(formData);
        resultAll.textContent = 'Успешно отправлено!';

    }

    checkInput(itemPhone, /^((7|8|\+7|)[\-]?)+(\(?\d{3}\)?[\-]?)?[\d\-]{10,14}$/,);
    checkInput(itemEmail, /^([A-Za-z0-9_\-\.])+\@gmail.com$/);
    checkInput(itemName, /^[А-ЯЁ][а-яё]*([-][А-ЯЁ][а-яё]*)?\s[А-ЯЁ][а-яё]*\s[А-ЯЁ][а-яё]*$/);

    checkPaste(itemPhone, /[^0-9\-\+]+/gi);
    checkPaste(itemEmail, /[^A-Za-z0-9_\-\.\@]+/gi);
    checkPaste(itemName, /[^А-ЯЁа-яё\-]+/gi);

    sendButton.addEventListener('click', (event) => {
        event.preventDefault();
        btnClick(itemPhone, itemEmail, itemName);
    })
}