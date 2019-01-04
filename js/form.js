'use strict';

(function(){
    //Объявляем переменные
    var uploadForm = document.querySelector('#upload-select-image');
    var uploadOverlay = uploadForm.querySelector('.upload-overlay');
    var sizeControlContainer = uploadOverlay.querySelector('.upload-resize-controls');
    var displaySizeValue = sizeControlContainer.querySelector('.upload-resize-controls-value')
    var minusImageSize = sizeControlContainer.querySelector('.upload-resize-controls-button-dec');
    var plusImageSize = sizeControlContainer.querySelector('.upload-resize-controls-button-inc');
    var uploadFormPreview = uploadOverlay.querySelector('.upload-form-preview');
    var previewImg = uploadFormPreview.querySelector('.effect-image-preview');
    var uploadEffectsLevel = uploadOverlay.querySelector('.upload-effect-level');
    var uploadEffectsPin = uploadEffectsLevel.querySelector('.upload-effect-level-pin');
    var uploadEffectsVal = uploadEffectsLevel.querySelector('.upload-effect-level-val');
    var closePreviewBtn = uploadOverlay.querySelector('#upload-cancel');
    var submitBtn = uploadOverlay.querySelector('#upload-submit');
    var descriptionField = uploadOverlay.querySelector('.upload-form-description');
    var hashTagsField = uploadOverlay.querySelector('.upload-form-hashtags');
   
        
    var DEFAULT_PRRVIEW_IMG = 'img/upload-default-image.jpg';
    var FILE_TYPES = ['jpg', 'jpeg', 'bmp', 'png', 'gif', 'avi'];
    var fileChoiser = uploadForm.querySelector('#upload-file');
    
    //Смена адреса превью
    var changePreviewSrc = function(src) {
       previewImg.src = src; 
    };
    
    //Проверяем верен ли тип загружаемого файла
    var checkFileType = function(file) {
        return FILE_TYPES.some(function(it) {
            return file.name.toLowerCase().endsWith(it);
        });
    };
   //Загрузка изображения 
    var loadImage = function(choiser, func) {
        var files = Array.from(choiser.files).filter(checkFileType);
        if(files) {
            files.forEach(function(it) {
                var reader = new FileReader();
                reader.addEventListener('load', function(evt) {
                    func(evt.target.result);
                });
                reader.readAsDataURL(it);
            });
        }
    };   
      
   // Закрытие превью 
     var onClosePreview = function(evt) {
        uploadOverlay.classList.add('hidden');
        displaySizeValue.value = '100%';
        closePreviewBtn.removeEventListener('click', onClosePreview);
        document.removeEventListener('keydown', onPreviewEscPress);
        closePreviewBtn.removeEventListener('keydown', onCloseBtnEnterPress);
        dropImageParametrs(previewImg);
        uploadForm.reset();
    };
   //Сброс параметров редактируемого изображения 
    var dropImageParametrs = function(evt) {
         evt.src = DEFAULT_PRRVIEW_IMG;
         evt.style.transform = 'scale(1)';
         evt.removeAttribute('style');
         evt.removeAttribute('class');
         evt.classList.add('effect-image-preview');
    };
    //Закрытие превью по нажатию на клавишу ESC
      var onPreviewEscPress = function(evt) {
       if(evt.keyCode === window.utils.ESC_KEYCODE) {
           onClosePreview();
       }
      };
    
    //Закрытие превью по нажатию на клавишу Enter
    var onCloseBtnEnterPress = function(evt) {
       if(evt.keyCode === window.utils.ENTER_KEYCODE) {
           onClosePreview();
       }
      };
    
    //Изменение загруженных данных в окне превью    
    var onPreviewChange = function(evt) {
        loadImage(evt.target, changePreviewSrc);
        setTimeout(function() {
        uploadOverlay.classList.remove('hidden');  
        uploadEffectsLevel.classList.add('hidden');
        },1000);
        displaySizeValue.value = '100%';
        closePreviewBtn.style.cursor = 'pointer';
        closePreviewBtn.addEventListener('click', onClosePreview);
        closePreviewBtn.addEventListener('keydown', onCloseBtnEnterPress);
        document.addEventListener('keydown', onPreviewEscPress);
        
    };
    
    
      descriptionField.addEventListener('focus', function() {
       document.removeEventListener('keydown', onPreviewEscPress);
   });
    
     descriptionField.addEventListener('blur', function() {
       document.addEventListener('keydown', onPreviewEscPress);
   });
        
    
    fileChoiser.addEventListener('change', onPreviewChange);
    
 //Изменения размера загружеаемого изображения   
    var resizePreview = function(elementValue, resizeElement){
         resizeElement.style.transform = 'scale(' + parseInt(elementValue.value) / 100 + ')';   
        };
    
    var changePreviewSize = function(totalValue, addValue, removeValue){
        
        var valuesLimit = {
            min:25,
            max:100
        };
                          
        addValue.addEventListener('click', function() {            
            if(parseInt(totalValue.value) < valuesLimit.max){
                totalValue.value = parseInt(totalValue.value) + valuesLimit.min + '%';
            } 
             resizePreview(totalValue, previewImg);
                        
        });
        
        removeValue.addEventListener('click', function() {            
             if(parseInt(totalValue.value) > valuesLimit.min){
               totalValue.value = parseInt(totalValue.value) - valuesLimit.min + '%';
            }
               resizePreview(totalValue,previewImg);                      
        });
                      
    };
    
    var defaulyFilterLevel = 20;
    var choisenFilter;
    //Установка фотоэфектов по умолчанию
    var setEffectControlBydefault = function() {
        if(previewImg.classList.contains('effect-none')) {
            uploadEffectsLevel.classList.add('hidden');
            previewImg.style.filter = 'initial';
        } else {
           uploadEffectsLevel.classList.remove('hidden');
           uploadEffectsPin.style.left = defaulyFilterLevel + '%';
            uploadEffectsVal.style.width = defaulyFilterLevel + '%';
        }
        changeFilterLevel(defaulyFilterLevel);
    };
   //Применение фильтров 
    var setFilterOnPhoto = function(target) {
        previewImg.removeAttribute('class');
        previewImg.classList.add('effect-image-preview');
        var targetId = target.id;
        var filterName = targetId.replace('upload-', '');
        previewImg.classList.add(filterName);
        choisenFilter=filterName.replace('effect-', '');
        setEffectControlBydefault();
    };
    
   //Изменение уровня насыщености фильтров 
    var changeFilterLevel = function(value) {
        var filters = {
            chrome: 'grayscale(' + value / 100 + ')',
            sepia: 'sepia(' + value / 100 + ')',
            marvin: 'invert(' + value + '%)',
            phobos: 'blur(' + value / 100 * 3 + 'px)',
            heat: 'brightness(' + value / 100 * 3 + ')'
        };
        
        previewImg.style.filter = filters[choisenFilter]; 
        
    };
   //Проверка полей хэштег и описание на валидность 
     var onDescriptionFiledValid = function() {
       descriptionField.setCustomValidity('');
        descriptionField.style.outline = '';
    };
    
     var onHashTagsValidField = function() {
        hashTagsField.setCustomValidity('');
        hashTagsField.style.outline = '';
    };
    
      
    var checkDescriptionValidity = function() {
        if(!descriptionField.validity.valid) {
            descriptionField.style.outline = '2px sloid red';
            
            if(descriptionField.validity.tooLong) {
                descriptionField.setCustomValidity('Описание не может быть больше 140 символов!');
            } 
            if(descriptionField.validity.tooShort) {
                descriptionField.setCustomValidity('Описание не может быть меньше 2 символов!'); 
            }
        }
    };
    
       
descriptionField.addEventListener('change', onDescriptionFiledValid);
    
    var checkHastagsValidity = function() {
        var fieldValue = (hashTagsField.value || '').trim().replace(/\s{2,}/g, ' ');
        hashTagsField.value = fieldValue;
        
        if(fieldValue) {
            var hashtagsArray = fieldValue.split(' ');
            if(hashtagsArray.length > 5 ){
                hashTagsField.setCustomValidity('Хэш-тегов не может быть больше пяти!');
              }else {
            
             var customValidityMessage = null;
                         
            for(var i = 0; i < hashtagsArray.length && customValidityMessage === null; i++){
                if(!(hashtagsArray[i].startsWith('#'))){
                    customValidityMessage = 'Хэш-тег должен начинаться с символа #';
                } else
                if (hashtagsArray[i].split('#').length > 2 ){
                    customValidityMessage = 'Хэш-теги должны быть разделены пробелом.';
                }else
                if(hashtagsArray.indexOf(hashtagsArray[i]) !== i){
                    customValidityMessage = 'Один и тот же Хэш-тег нельзя использовать дважды';
                }else
                if(hashtagsArray[i].length > 21){
                  customValidityMessage = 'Максимальная длина хэш-тега 20 символ.';  
                } 
                
            }
            
            if(customValidityMessage) {
                hashTagsField.style.outline = '2px solid red'; 
                hashTagsField.setCustomValidity(customValidityMessage);
            } else{
              onHashTagsValidField();
            }
          }
        }
     }
    
    
    hashTagsField.addEventListener('change', onHashTagsValidField);
    
     //Вывод сообщения о успешной загрузке фото 
        var onSuccess = function() {
            var node = document.createElement('div');
            node.classList.add('success-message');
            node.textContent = 'Фото успешно отправлено';
            document.body.insertAdjacentElement('afterbegin', node);
            onClosePreview();
            setTimeout(function(){
            document.body.removeChild(node);
            }, 3000);
            var messageContainer = document.querySelector('.upload-message');
            if(!messageContainer.classList.contains('.hidden')){
                messageContainer.classList.add('hidden');
            }
          
        };
    //Удалаяем дубли сообщения о ошибке если они есть
    var removeErrorMessage = function() {
      var errors = uploadForm.querySelectorAll('.error');
        for(var i = 0; i< errors.length; i++){
            errors[i].remove();
        }
        
    };
    
    submitBtn.addEventListener('click', function() {
        checkHastagsValidity();
        checkDescriptionValidity();
    });
    
    uploadForm.addEventListener('submit', function(evt) {
        evt.preventDefault();
        removeErrorMessage();
        window.data.upload(onSuccess, window.data.renderErrorMessage, new FormData(uploadForm));
       });
    
 
    changePreviewSize(displaySizeValue,plusImageSize, minusImageSize);
    window.gallery.initilazeFilter(setFilterOnPhoto, changeFilterLevel);

    
})();