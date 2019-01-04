'use strict';

(function(){
    
    var pictureTemplate = document.querySelector('#picture-template').content;
    var picturesList = document.querySelector('.pictures');
    var fragment = document.createDocumentFragment();
    
    //Создание шаблона изображения
    var createTeampleate = function(data) {
    var pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('img').src = data.url;
    pictureElement.querySelector('.picture-comments').textContent = data.comments.length;
    pictureElement.querySelector('.picture-likes').textContent = data.likes;
    return pictureElement;
};
//Отрисовка шаблона
var renderPictures = function(data) {
    picturesList.innerHTML = '';
    data.forEach(function(elem){
    var photo = createTeampleate(elem); 
    fragment.appendChild(photo); 
    });
    
    picturesList.appendChild(fragment); 
    Array.prototype.forEach.call(picturesList.querySelectorAll('.picture'), function(item,index) {
        item.dataSource = data[index];
    });
};
   // удаление фото 
    var removePicture = function(){
        var allPhoto = picturesList.querySelectorAll('.picture');
        console.log(allPhoto);
        allPhoto.forEach(function(it){
            it.remove();
        });
    };

    
    window.picture={
        renderPictures:renderPictures,
        picturesList:picturesList,
        removePicture:removePicture
    }
    
})();