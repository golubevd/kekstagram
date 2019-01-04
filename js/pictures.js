'use strict';

(function(){
    
    var sortFilters = document.querySelector('.filters');
    var uploadForm = document.querySelector('.upload-form');

    //Генерация рандомных значений в промежутке мин макс
    var generateBetweenRandom = function(min, max){
        var rand = min - 0.5+ Math.random()*(max - min + 1);
        rand = Math.round(rand);
        return rand;
    };

    var ALLOW_FORMATS = ['jpeg','jpg','bmp','gif','png'];

    var COMMENTS = ['Всё отлично!','В целом всё неплохо. Но не всё.','Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.','Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.','Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.','Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

    //Генерация рандомного фото
    var generateRandomPhoto=function(num){
        return Math.round(Math.random()*(num-1));
    };
    
    //Генерация рандомного коммента
    var generateRandomComments=function(num){
        return Math.round(Math.random()*(num.length-1));
    };


    var allObjects=[];
    var allPictures=[];
    
    //Создание объекта генерации
    var generateObj = function(){
        var simpleObj = {
            url:'',
            comments:'',
            likes:0,
        };
        
     var pictureUrl = 'photos/';
          for (var i = 0; i < MAX_PICTURE_COUNT; i++){
          simpleObj[i] = {
            url: pictureUrl + (i + 1) + '.jpg',
            comments: COMMENTS[generateRandomComments(COMMENTS)],
            likes: generateBetweenRandom(15, 250)

        };
            allObjects.push(simpleObj[i]);
        }
    };
    //Делаем поле сортировки видимым
    var showSortfilters=function(){
        sortFilters.classList.remove('hidden');
    };

    //Отрисовка фото по фильтрации
    
    var renderPhoto = function(data) {
       window.picture.renderPictures(data);

    };

    var sortByRecommend = function(data) {
      var recommend = window.data.load(loadData);
        return recommend;
    };

    var sortByLikes = function(data) {
     data.sort(function(x,y) {return y.likes - x.likes}); 
     window.picture.renderPictures(data);
    };

    var sortByComments = function(data) {
      data.sort(function(x,y){ return y.comments.length - x.comments.length}); 
         window.picture.renderPictures(data);
    };

    var randomSort = function(data) {
        var tempArray = [];
        while(tempArray.length < 10){
               var element = data[generateBetweenRandom(0, data.length - 1)];
          if (tempArray.indexOf(element) === -1) {
            tempArray.push(element);
          }
           }

           window.picture.renderPictures(tempArray);
       }


    var recommendFilter = sortFilters.querySelector('#filter-recommend');
    var popularFilter = sortFilters.querySelector('#filter-popular');
    var dicussedFilter = sortFilters.querySelector('#filter-discussed');
    var randomFilter = sortFilters.querySelector('#filter-random');

    var checkFilter = function(evt,callback) {
        var filteredElement = evt.target;

        if(filteredElement && typeof callback === 'function'){
            callback();
            };
        };

    var loadData = function(data) {
        allPictures = data.slice();
        showSortfilters();
        renderPhoto(allPictures);

        recommendFilter.addEventListener('click', function(evt) {

            checkFilter(evt.target, sortByRecommend(allPictures));
        });

        popularFilter.addEventListener('click', function(evt) {
            checkFilter(evt.target, sortByLikes(allPictures));
        });

        dicussedFilter.addEventListener('click', function(evt) {
            checkFilter(evt.target, sortByComments(allPictures));
        });

         randomFilter.addEventListener('click', function(evt) {
            checkFilter(evt.target, randomSort(allPictures));
        });

    };


    window.data.load(loadData,window.data.renderErrorMessage);

    })();