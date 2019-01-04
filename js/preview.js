'use strict';

(function(){
    
    var gallery= document.querySelector('.gallery-overlay');
    var galleryPreview = gallery.querySelector('.gallery-overlay-preview');
    var galleryOverlayClose = gallery.querySelector('.gallery-overlay-close');
    
    //Отрисовка и взаимодействие с шаблоном предварительного просмотра
    var showGalleryPreview=function(target, galleryOverlay, callback) {
    var targetData = target.dataSource || target.parentElement.dataSource;
    if(targetData) {
    galleryOverlay.querySelector('img').src = targetData.url;
    galleryOverlay.querySelector('.likes-count').textContent = targetData.likes;
    galleryOverlay.querySelector('.comments-count').textContent = targetData.comments.length; 
        
            if(typeof callback === 'function') {
            callback();
            }
        }
    };
    
    var onGalleyOverlayEscPress = function(evt) {
   if(evt.keyCode === window.utils.ESC_KEYCODE) {
       onGalleryOverlayClose();
   }
};

var onGalleyOverlayEnterPress = function(evt,action) {
   if(evt.keyCode === window.utils.ENTER_KEYCODE) {
       action();
   }
};

var onGalleryOverlayOpen = function() {
    gallery.classList.remove('hidden');
    document.addEventListener('keydown',onGalleyOverlayEscPress);
    
};

var onGalleryOverlayClose = function() {
    gallery.classList.add('hidden');
    document.removeEventListener('keydown', onGalleyOverlayEscPress);
};

window.picture.picturesList.addEventListener('click', function(evt) {
    evt.preventDefault();
    showGalleryPreview(evt.target, gallery, onGalleryOverlayOpen);
});

window.picture.picturesList.addEventListener('keydown', function(evt) {
    onGalleyOverlayEnterPress(evt, function() {
      evt.preventDefault();
       showGalleryPreview(evt.target, gallery, onGalleryOverlayOpen);   
    });
                
});

galleryOverlayClose.addEventListener('click',onGalleryOverlayClose);

galleryOverlayClose.addEventListener('keydown',function(evt){
    onGalleyOverlayEnterPress(evt, function(){
      evt.preventDefault();
       onGalleryOverlayClose();   
    });
});

    
})();