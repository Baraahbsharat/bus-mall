'use strict'
var leftImageElement = document.getElementById('left-image');
var middleImageElement = document.getElementById('middle-image');
var rightImageElement = document.getElementById('right-image');
var divimages = document.getElementById('image-div');
var maxvotes =25;
var userClickCounter = 0;
var leftImageIndex;
var middleImageIndex;
var rightImageIndex;
var buttonElement = document.getElementById('Results-list');



function Products(name,source){
    this.name = name;
    this.source = source;
    this.showingTimes = 0;
    this.votes =0;
    Products.prototype.allProducts.push(this);
}

Products.prototype.allProducts = [];
var image1 = new Products('bag','../assets/img/bag.jpg');
var image2 = new Products('banana','../assets/img/banana.jpg');
var image3 = new Products('bathroom','../assets/img/bathroom.jpg');
var image4 = new Products('boots','../assets/img/boots.jpg');
var image5 = new Products('breakfast','../assets/img/breakfast.jpg');
var image6 = new Products('chair','../assets/img/chair.jpg');
var image7 = new Products('cthulhu', '../assets/img/cthulhu.jpg');
var image8 = new Products('dog-duck','../assets/img/dog-duck.jpg');
var image9 = new Products('dragon','../assets/img/dragon.jpg');
var image10 = new Products('pen','../assets/img/pen.jpg');
var image11 = new Products('pet-sweep','../assets/img/pet-sweep.jpg');
var image12 = new Products('scissors','../assets/img/scissors.jpg');
var image13 = new Products('shark','../assets/img/shark.jpg');
var image14 = new Products('sweep','../assets/img/sweep.png');
var image15 = new Products('tauntaun','../assets/img/tauntaun.jpg');
var image16 = new Products('unicorn','../assets/img/unicorn.jpg');
var image17 = new Products('usb','../assets/img/usb.gif');
var image18= new Products('water-can','../assets/img/water-can.jpg');
var image19= new Products('wine-glass','../assets/img/wine-glass.jpg');
var image20= new Products('bubblegum','../assets/img/bubblegum.jpg');

renderThreeRandomImages();
// handelUserClick();

leftImageElement.addEventListener('click',handelUserClick);
rightImageElement.addEventListener('click',handelUserClick);
middleImageElement.addEventListener('click',handelUserClick);






function handelUserClick(event){
 userClickCounter++;

if (userClickCounter <= maxvotes){
    renderThreeRandomImages();
    console.log('click');
    if(event.target.id === 'left-image'){
        Products.prototype.allProducts[leftImageIndex].votes++;
        Products.prototype.allProducts[leftImageIndex].showingTimes++;

    }
} else if (event.target.id === 'middle-image'){
    Products.prototype.allProducts[middleImageIndex].votes++;
    Products.prototype.allProducts[middleImageIndex].showingTimes++;


} else if (event.target.id === 'right-image') {
    Products.prototype.allProducts[rightImageIndex].votes++;
    Products.prototype.allProducts[rightImageIndex].showingTimes++;

} else {
    
    var resultlist = document.getElementById('Results-list');

    var votesResults;
    
    for (var i = 0; i < Products.prototype.allProducts.length; i++){
         votesResults = document.createElement('li');
         votesResults.textContent = Products.prototype.allProducts[i].name + ' had ' + Products.prototype.allProducts[i].votes + ' votes ' +  ' and was seen ' +  Products.prototype.allProducts[i].showingTimes + 'times';
         buttonElement.addEventListener('click',handelUserClick);
         resultlist.appendChild(votesResults);
        //  resultlist.appendChild(votesResults);
      
         
         
    }
    rightImageElement.removeEventListener('click', handelUserClick);
    leftImageElement.removeEventListener('click', handelUserClick);
    middleImageElement.removeEventListener('click', handelUserClick);
   
    
}


}




function renderThreeRandomImages(){
     leftImageIndex = generateRandomIndex();
    //  middleImageIndex = generateRandomIndex();
    //  rightImageIndex = generateRandomIndex();


    do {
     rightImageIndex = generateRandomIndex(); 
     middleImageIndex = generateRandomIndex();
    //  leftImageIndex = generateRandomIndex();
    } while( leftImageIndex === middleImageIndex || leftImageIndex === rightImageIndex || middleImageIndex === rightImageIndex );
    leftImageElement.src = Products.prototype.allProducts[leftImageIndex].source;
middleImageElement.src = Products.prototype.allProducts[ middleImageIndex].source;
rightImageElement.src = Products.prototype.allProducts[rightImageIndex].source;
generateRandomIndex();
}




function generateRandomIndex(){
   return Math.floor(Math.random() * (Products.prototype.allProducts.length));
}