'use strict'
// Global variables 

var leftImageElement = document.getElementById('left-image');
var middleImageElement = document.getElementById('middle-image');
var rightImageElement = document.getElementById('right-image');
var divimages = document.getElementById('imagediv');
var maxvotes = 25;
var userClickCounter = 0;
var leftImageIndex;
var rightImageIndex;
var middleImageIndex;
var previousLeftImageIndex = -1;
var previousRightImageIndex = -1;
var previousCenterImageIndex = -1;
var showResultButton = document.getElementById('FinalResultButton');
var roundsForm = document.getElementById('maxrounds');
var imageNames = [];


// Creare a constructor 

function Products(name, source) {
    this.name = name;
    this.source = source;
    this.showingTimes = 0;
    this.votes = 0;
    Products.prototype.allProducts.push(this);
    imageNames.push(name);
}


Products.prototype.allProducts = [];
var image1 = new Products('bag', 'assets/img/bag.jpg');
var image2 = new Products('banana', 'assets/img/banana.jpg');
var image3 = new Products('bathroom', 'assets/img/bathroom.jpg');
var image4 = new Products('boots', 'assets/img/boots.jpg');
var image5 = new Products('breakfast', 'assets/img/breakfast.jpg');
var image6 = new Products('chair', '../assets/img/chair.jpg');
var image7 = new Products('cthulhu', '../assets/img/cthulhu.jpg');
var image8 = new Products('dog-duck', '../assets/img/dog-duck.jpg');
var image9 = new Products('dragon', '../assets/img/dragon.jpg');
var image10 = new Products('pen', '../assets/img/pen.jpg');
var image11 = new Products('pet-sweep', '../assets/img/pet-sweep.jpg');
var image12 = new Products('scissors', '../assets/img/scissors.jpg');
var image13 = new Products('shark', '../assets/img/shark.jpg');
var image14 = new Products('sweep', '../assets/img/sweep.png');
var image15 = new Products('tauntaun', '../assets/img/tauntaun.jpg');
var image16 = new Products('unicorn', '../assets/img/unicorn.jpg');
var image17 = new Products('usb', '../assets/img/usb.gif');
var image18 = new Products('water-can', '../assets/img/water-can.jpg');
var image19 = new Products('wine-glass', '../assets/img/wine-glass.jpg');
var image20 = new Products('bubblegum', '../assets/img/bubblegum.jpg');


// Create an algorithm that will randomly generate three images 
var imageNames;
function generateRandomIndex() {
    return Math.floor(Math.random() * (Products.prototype.allProducts.length));
}

// Attach eventlistener to HTML section where the element displayed
divimages.addEventListener('click', handelUserClick);

showResultButton.addEventListener('click', showResults);
roundsForm.addEventListener('submit', setMaxRounds);

//  make sure that we have three different image each time
var forbiddenImagesIndex = [];
function renderThreeRandomImages() {
    forbiddenImagesIndex = [previousCenterImageIndex, previousLeftImageIndex, previousRightImageIndex];

    do {
        leftImageIndex = generateRandomIndex();
    }
    
    while (forbiddenImagesIndex.includes(leftImageIndex));
    previousLeftImageIndex = leftImageIndex;
    forbiddenImagesIndex.push(leftImageIndex);

    do {
        rightImageIndex = generateRandomIndex();

    }
    while (forbiddenImagesIndex.includes(rightImageIndex));
    previousRightImageIndex = rightImageIndex;
    forbiddenImagesIndex.push(rightImageIndex);


    do {
        middleImageIndex = generateRandomIndex();

    } while (forbiddenImagesIndex.includes(middleImageIndex));
    previousCenterImageIndex = middleImageIndex;
  
    console.log("left img", Products.prototype.allProducts[leftImageIndex]);
    leftImageElement.src = Products.prototype.allProducts[leftImageIndex].source;

    Products.prototype.allProducts[leftImageIndex].showingTimes++;
    middleImageElement.src = Products.prototype.allProducts[middleImageIndex].source;
    Products.prototype.allProducts[middleImageIndex].showingTimes++;
    rightImageElement.src = Products.prototype.allProducts[rightImageIndex].source;
    Products.prototype.allProducts[rightImageIndex].showingTimes++;
}



renderThreeRandomImages();

// increment the voting numbers at each time

function handelUserClick(event) {


    if (userClickCounter < maxvotes) {
      
        if (event.target.id === 'left-image') {
          
            userClickCounter++;
            console.log('vote property',  Products.prototype.allProducts[leftImageIndex] )
            Products.prototype.allProducts[leftImageIndex].votes++;
        
            renderThreeRandomImages();
          

        }
        else if (event.target.id === 'middle-image') {
            userClickCounter++;
            Products.prototype.allProducts[middleImageIndex].votes++;
            
            renderThreeRandomImages();
           

            console.log(event.target.id);
        } else if (event.target.id === 'right-image') {
            userClickCounter++;
            Products.prototype.allProducts[rightImageIndex].votes++;
           
            renderThreeRandomImages();
           
            console.log(event.target.id);
        }
    } else {


       

        console.log(event.target.id);
        imagediv.removeEventListener('click', handelUserClick);
        showResultButton.disabled = false;
        renderChart();
   
    }

    storeProducts();

}

//  add a function to enable the user to choose the number of rounds
function setMaxRounds(event) {
    event.preventDefault();
    maxvotes = parseInt(event.target.rounds.value);
}

//  create a function to call the final results
function showfinalResult() {
    showResults();
    renderChart();
    // storeProducts();
}

//  create a chart
function renderChart() {
    var votesArray = [];
    var timeshowingArray = [];
    for (var i = 0; i < Products.prototype.allProducts.length; i++) {
        votesArray.push(Products.prototype.allProducts[i].votes);
        timeshowingArray.push(Products.prototype.allProducts[i].showingTimes);
    }

    var ctx = document.getElementById('barChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: imageNames,
            datasets: [{
                label: 'votes',
                backgroundColor: 'rgb(219, 112, 147)',
                borderColor: 'rgb(0, 0, 0)',
                data: votesArray,
            }, {
                label: 'showingTimes',
                backgroundColor: 'rgb(255, 235, 205)',
                borderColor: 'rgb(0, 0, 0)',
                data: timeshowingArray,

            }
            ]
        }
    })
}


//  create a local storage and add the values to the image array 
function storeProducts (){
    var myProducts = JSON.stringify(Products.prototype.allProducts );
    localStorage.setItem('myProducts', myProducts);
    }
    function getData(){
    var list = localStorage.getItem('myProducts');
    
    if (list ){
        Products.prototype.allProducts = JSON.parse(list);
        
        renderChart();
         }
   
    }
    getData();
    



   

































//  create a list for the result values 

var resultlist = document.getElementById('Results-list');

function showResults(event) {
    event.preventDefault();

    var votesResults;

    for (var i = 0; i < Products.prototype.allProducts.length; i++) {
        votesResults = document.createElement('li');
        votesResults.textContent = Products.prototype.allProducts[i].name + ' had ' + Products.prototype.allProducts[i].votes + ' votes ' + ' and was seen ' + Products.prototype.allProducts[i].showingTimes + 'times.' + 'The percentage of selecting this product is : ' + (Products.prototype.allProducts[i].votes * 100 / Products.prototype.allProducts[i].showingTimes) + '%';


        resultlist.appendChild(votesResults);

    }
}