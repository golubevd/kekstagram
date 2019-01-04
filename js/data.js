'use strict';
(function(){
    //URL загрузки и сохранения данных
    var LOAD_URL = 'https://js.dump.academy/kekstagram/data';
    var SAVE_URL = 'https://js.dump.academy/kekstagram';
    
    //Вывод ошибок в соответствии с их кодом
    var errorMessages = {
        LOAD_ERROR: 'Произошла ошибка загрузки. Пожалуйста обновите страницу',
        SERVER_ERROR: 'Произошла ошибка соединения. Пожалуйста обновите страницу',
        TIMEOUT_ERROR: 'Сервер не отвечает. Пожалуйста обновите страницу'
    };
    
    //Создаем подключение к базе данных
    var createXHR = function(method, url, onLoad, onError) {
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.addEventListener('load', function(){
            if(xhr.status === 200){
                onLoad(xhr.response);
            } else {
                onError(errorMessages.LOAD_ERROR);
            }
        });
        
        xhr.addEventListener('error', function() {
           onError(errorMessages.SERVER_ERROR);
        });
        
        xhr.addEventListener('timeout', function() {
            onError(errorMessages.TIMEOUT_ERROR); 
        });
        
        xhr.open(method, url);
        return xhr;
    };
    //Загрузка данных
    var load = function(onLoad, onError) {
        createXHR('GET', LOAD_URL, onLoad,onError).send();
    };
    //Сохранение данных
    var upload = function(onLoad, onError, data) {
        createXHR('POST', SAVE_URL, onLoad, onError).send(data);
    };
    
   //Вывод ошибок на экран 
    var renderErrorMessage = function(errorMessage) {
       var messageContainer = document.querySelector('.upload-message');
        var messageField = messageContainer.querySelector('.upload-message-container');
        messageContainer.classList.remove('hidden');
        var paragrph = document.createElement('p');
        var errorIcon = document.createElement('img');
        paragrph.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: yellow;';
        paragrph.style.fontSize = '30px';
        paragrph.style.color = 'black';
        paragrph.textContent = errorMessage;
        paragrph.className = 'error';
        errorIcon.style.width = '50px';
        errorIcon.style.height = '50px';
        errorIcon.style = 'margin-bottom:50px';
        errorIcon.className = 'error';
        errorIcon.src ='./img/icon-warning.png';
        messageField.insertAdjacentElement('afterbegin', paragrph);
        messageField.insertAdjacentElement('afterbegin', errorIcon);
    };
    
   
    
    window.data = {
       load:load,
        upload:upload,
        renderErrorMessage:renderErrorMessage
    };   
    
    
})();