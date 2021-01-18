'use strict'
var leftImageElement = document.getElementById('left-image');
var middleImageElement = document.getElementById('middle-image');
var rightImageElement = document.getElementById('right-image');
var divimages = document.getElementById('imagediv');
var maxvotes = 25;
var userClickCounter = 0;
var leftImageIndex;
var rightImageIndex;
var middleImageIndex;
var showResultButton = document.getElementById('FinalResultButton');
var roundsForm = document.getElementById('maxrounds');



// var buttonElement = document.getElementById('Results-list');



function Products(name, source) {
    this.name = name;
    this.source = source;
    this.showingTimes = 0;
    this.votes = 0;
    Products.prototype.allProducts.push(this);
}

Products.prototype.allProducts = [];
var image1 = new Products('bag', '../assets/img/bag.jpg');
var image2 = new Products('banana', '../assets/img/banana.jpg');
var image3 = new Products('bathroom', '../assets/img/bathroom.jpg');
var image4 = new Products('boots', '../assets/img/boots.jpg');
var image5 = new Products('breakfast', '../assets/img/breakfast.jpg');
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

function generateRandomIndex() {
    return Math.floor(Math.random() * (Products.prototype.allProducts.length));
}

divimages.addEventListener('click', handelUserClick);

showResultButton.addEventListener('click', showResults);
roundsForm.addEventListener('submit', setMaxRounds);

function renderThreeRandomImages() {
    
    leftImageIndex = generateRandomIndex();
    //  middleImageIndex = generateRandomIndex();
    //  rightImageIndex = generateRandomIndex();


    do {
        rightImageIndex = generateRandomIndex();
        middleImageIndex = generateRandomIndex();
        //  leftImageIndex = generateRandomIndex();
    } while (leftImageIndex === middleImageIndex || leftImageIndex === rightImageIndex || middleImageIndex === rightImageIndex);
    leftImageElement.src = Products.prototype.allProducts[leftImageIndex].source;
    Products.prototype.allProducts[leftImageIndex].showingTimes++;
    middleImageElement.src = Products.prototype.allProducts[middleImageIndex].source;
    Products.prototype.allProducts[middleImageIndex].showingTimes++;
    rightImageElement.src = Products.prototype.allProducts[rightImageIndex].source;
    Products.prototype.allProducts[rightImageIndex].showingTimes++;

    // removeDuplicate();
}

renderThreeRandomImages();




function handelUserClick(event) {


    if (userClickCounter < maxvotes) {
        console.log('click');
        console.log(event.target.id);
        if (event.target.id === 'left-image') {
            // Products.prototype.allProducts[leftImageIndex].showingTimes++;
            userClickCounter++;
            Products.prototype.allProducts[leftImageIndex].votes++;
            // removeDuplicate();
            renderThreeRandomImages();
            console.log(event.target.id);

        }
        else if (event.target.id === 'middle-image') {
            userClickCounter++;
            Products.prototype.allProducts[middleImageIndex].votes++;
            // removeDuplicate();
            renderThreeRandomImages();
            // Products.prototype.allProducts[middleImageIndex].showingTimes++;

            console.log(event.target.id);
        } else if (event.target.id === 'right-image') {
            userClickCounter++;
            Products.prototype.allProducts[rightImageIndex].votes++;
            // removeDuplicate();
            renderThreeRandomImages();
            // Products.prototype.allProducts[rightImageIndex].showingTimes++;
            console.log(event.target.id);
        }
    } else {
     

        // showResults();
        //  resultlist.appendChild(votesResults);

        console.log(event.target.id);
        imagediv.removeEventListener('click', handelUserClick);
        showResultButton.disabled = false;   

    }



}


function setMaxRounds (event){
    event.preventDefault();
   maxvotes =  parseInt(event.target.rounds.value);
}





// renderThreeRandomImages();
// handelUserClick();
// renderThreeRandomImages();






















// roundsForm.addEventListener('submit',submitter);

// function submitter (event){
//     event.preventDefault();
//     //  maxvotes = parseInt(event.target.maxvotes.value)

//     maxvotes = parseInt(event.target.rounds.value)

// }







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
// var imageNames = ["bag", "banana", "bathroom", "boots", "breakfast", "chair'", "cthulhu", "dog-duck", "dragon", "pen", "pet-sweep", "scissors", "shark", "sweep", "tauntaun", "unicorn", "usb", "water-can", "wine-glass", "bubblegum" ];
// function removeDuplicate (data){
    
//     preventDefault();
//     return data.filter((value, index) => data.indexOf(value) === index);
    
// }
// var ctx = document.getElementById('barChart').getContext('2d');
// var chart = new Chart(ctx, {
//     type: 'bar',

//     // The data for our dataset
//     data: {
//         imageNames:["bag", "banana", "bathroom", "boots", "breakfast", "chair'", "cthulhu", "dog-duck", "dragon", "pen", "pet-sweep", "scissors", "shark", "sweep", "tauntaun", "unicorn", "usb", "water-can", "wine-glass", "bubblegum" ]; 
         
//             backgroundColor: 'rgb(255, 99, 132)',
//             borderColor: 'rgb(255, 99, 132)',
//             data: votes 
//             data: showingTimes
//         }
//     },

//     // Configuration options go here
//     // options: {}
// });