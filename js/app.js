/*
 * Create a list that holds all of your cards
 */
let card = document.getElementsByClassName("card");
let cards = [...card] 
let moves = 0;
let counter = document.querySelector('.moves');
const deck = document.getElementById('deck-card');
let flippedCard = [];
let matchedCard = document.getElementsByClassName('match');
var interval;
var timer = document.querySelector('.timer');
const stars = document.querySelectorAll('.fa-star');
let modal = document.getElementById('myModal');
let closeicon = document.querySelector('.close');
let cardMatched = 0;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

document.body.onload = startGame();



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

//Start a new game
function startGame() {

	cards = shuffle(cards);

 	for(let i = 0; i < cards.length; i++) {
 		deck.innerHTML = '';
 		[].forEach.call(cards, function(item) {
 			deck.appendChild(item);
 		});
 		cards[i].classList.remove('show', 'open', 'match', 'disabled');
 		flippedCard = [];
 	}


 	//reset moves
 	moves = 0;
 	counter.innerHTML=moves;

 	//reset timer
 	timer.innerHTML = '0 hrs 0 mins 0 secs';
 	clearInterval(interval);

 	//reset ratings
 	for (let i = 0; i < stars.length; i++) {
 		stars[i].style.visibility = 'visible';
 	}
}


//counting the player's moves
function moveCounter() {
	moves++;
	counter.innerHTML = moves;
	if(moves == 1) {
		second = 0;
		minute = 0;
		hour = 0;
		startTime();
	}

	//setting rates
	if (moves > 10 && moves < 14) {
		for (i = 0; i < 3; i++) {
			if (i > 1) {
				stars[i].style.visibility = 'collapse';
			}
		}
	}

	else if (moves >15) {
		for (i = 0; i < 3; i++) {
			if (i > 0) {
				stars[i].style.visibility = 'collapse';
			}
		}
	}
}

//function to add the game time
function startTime() {
	var second = 0, minute = 0, hour = 0;
 	interval = setInterval(function() {
 		timer.innerHTML = hour+"hrs "+minute+"mins "+second+"secs";
 		second++;
 		if(second == 60) {
 			minute++;
 			second=0;
 		}
 		if(minute == 60){
 			hour++;
 			minute = 0;
 		}
 	},1000)
 }

//open and show class to display cards

function displayCard() {

	this.classList.toggle('show');
	this.classList.toggle('open');
	this.classList.toggle('disabled');
	
	//add opened cards to openedCards list and check if cards are a match or not
	flippedCard.push(this);
	
	if(flippedCard.length === 2){
		moveCounter();

		if (flippedCard[0].innerHTML === flippedCard[1].innerHTML){
			matched();
			cardMatched++;
		}
		else {
			unmatched();
		}
	}	
};

//function for when cards match
function matched() {
	flippedCard[0].classList.add('match');
	flippedCard[1].classList.add('match');
	flippedCard[0].classList.remove('show', 'open');
	flippedCard[1].classList.remove('show', 'open');
	flippedCard = [];
};

//function to disable cards temporarily
function disableCards() {
	Array.prototype.filter.call(cards, function(card){
		card.classList.add('disabled');
    });
}

//function for when cards do not match
function unmatched() {
	flippedCard[0].classList.add('unmatched');
	flippedCard[1].classList.add('unmatched');
	disableCards();
		setTimeout (function(){
			flippedCard[0].classList.remove('show', 'open', 'unmatched', 'disabled');
			flippedCard[1].classList.remove('show', 'open', 'unmatched', 'disabled');
			enable();
			flippedCard = [];
		}, 1000);	
}

//function to enable cards and disable matched cards	
function enable() {
	Array.prototype.filter.call(cards, function(card){
        card.classList.remove('disabled');
        for(let i = 0; i < matchedCard.length; i++){
            matchedCard[i].classList.add("disabled");
        }
    });
}	

//function for when all cards match and show total moves, time and star rating
function congratulations() {
	//if (matchedCard.length === 16) {
	if (cardMatched === 8) {
		clearInterval(interval);
		finalTime = timer.innerHTML;

		modal.classList.add('show');
		let starRating = document.querySelector('.stars').innerHTML;

		document.getElementById("totalMove").innerHTML = moves;
		document.getElementById("starRating").innerHTML = starRating;
		document.getElementById("totalTime").innerHTML = finalTime;

    	//closeicon on modal
    	closeModal();
    	cardMatched = 0;
    };
}

//function to close icon on the modal
function closeModal(){
    closeicon.addEventListener("click", function(event){
        modal.classList.remove("show");
        startGame();
    });
}

//desciption for user to play Again 
function playAgain(){
    modal.classList.remove("show");
    startGame();
}

//add event listeners to cards	
for (let i = 0; i < cards.length; i++) {
	card = cards[i];
	card.addEventListener('click', displayCard);
	card.addEventListener('click', congratulations);
};