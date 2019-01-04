'use strict';

(function(){
    
  var uploadEffect = document.querySelector('.upload-effect');
  var uploadEffectControls = uploadEffect.querySelector('.upload-effect-controls');
  var uploadEffectLevelLine = uploadEffectControls.querySelector('.upload-effect-level-line');
  var uploadEffectLevelVal = uploadEffectLevelLine.querySelector('.upload-effect-level-val');
  var uploadEffectLevelPin = uploadEffectLevelLine.querySelector('.upload-effect-level-pin');
   
    //Выбор фильтра по клику
    var initilazeFilter = function(setFilterCallback, changeFilterLevelCallback){
       uploadEffectControls.addEventListener('click',function(evt){
           if(evt.target.type==='radio' && typeof setFilterCallback ==='function'){
               setFilterCallback(evt.target);
           }
       });
        // Изменяем уровень насыщености фильтров перетаскиванием ползунка 
        uploadEffectLevelPin.addEventListener('mousedown', function(evt) {
            evt.preventDefault();
            
            var startCoords = evt.clientX;
            var moveLimit = uploadEffectLevelLine.offsetWidth;
            
            var getNewCoordinates = function(shiftX) {
                var newCoordinate = (uploadEffectLevelPin.offsetLeft-shiftX) / moveLimit*100;
                if(newCoordinate < 0) {
                    newCoordinate = 0;
                }else if( newCoordinate > 100){
                    newCoordinate = 100;
                }
                
                return newCoordinate;
            };
            
            var onMouseMove = function(moveEvt) {
                moveEvt.preventDefault();
                
                var shiftX = startCoords - moveEvt.clientX;
                
                startCoords = moveEvt.clientX;
                
                var newCoordinateX = getNewCoordinates(shiftX);
                
               uploadEffectLevelPin.style.left = newCoordinateX + '%';
                uploadEffectLevelVal.style.width = newCoordinateX + '%';
                
                if(typeof changeFilterLevelCallback === 'function'){
                    changeFilterLevelCallback(newCoordinateX);
                }
                
            };
            
            var onMouseUp=function(evt) {
            evt.preventDefault();
            
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };
        
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
                  
        });
            
    };
    
    window.gallery = {
       initilazeFilter:initilazeFilter 
    }
    
})();