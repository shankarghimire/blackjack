 //globar variables to hold cards information
 var suits = ["spades","hearts","clubs","diams"];
 var numbers = ["A","2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
 var deckOfCards=[]; //an empty array to hold 52 cards
 var cardCount = 0; //
 var playerCard=[];
 var dealerCard=[];

 
 //variables to hold DOMs
 var output;
 var message;
 var btnStart;
 var start;
 var dealerHand;
 var playerHand;



 //Adds event listener
 window.addEventListener('load',init);
 btnStart = document.addEventListener('click', startGame,false); 

 //function to initialize the basic config info when browser loads
 function init(){
     //initiales global variables
     suits = ["spades","hearts","clubs","diams"];
     numbers ;
     deckOfCards = []; //an empty array to hold 52 card objects
     cardCount = 0;  //to count the top card to deal
     playerCard = [];
     dealerCard = [];

     //initializes all DOMs to varibles
     output = document.getElementById('output');
     message = document.getElementById('message');
     btnStart = document.getElementById('btnStart');
     start = document.getElementById('start');
     dealerHand = document.getElementById('dealerHand');
     playerHand = document.getElementById('playerHand');
     
     //section to call other functions
     createDeckOfCards();   
 }

 //function to create a deck of cards consisting of 52 different cards
 function createDeckOfCards(){
     for(s in suits){
         let suit = suits[s][0].toUpperCase();
         let bgcolor = (suit == 'S' || suit == 'C') ? "#000000" : "#ff0000";
         for(n in numbers){
             let cardValue =( ( n > 9 ) ? 10 : (parseInt(n) + 1) );
             //creates a Card Object
             let aCard = {
                 suit: suit,
                 icon: suits[s],
                 bgcolor: bgcolor,
                 cardNum: numbers[n],
                 cardValue: cardValue,
             }
             deckOfCards.push(aCard);
             //console.log(numbers[n]+ "&" +  suits[s]  + ";");
         }   
     }
     console.log(" Deck of Cards -before Shuffuling:");
     console.log(deckOfCards);  
     //randomCard();     
 }

 function randomCard(){
     let randomNum = Math.floor(Math.random() * 52 );
     output.innerHTML += "<span style='color:" + deckOfCards[randomNum].bgcolor +"';> &" +  deckOfCards[randomNum].icon + ";" + deckOfCards[randomNum].cardNum+ "</span> ";
     //output.innerHTML += "<span style='color:" + deckOfCards[0].bgcolor +"';> &" +  deckOfCards[0].icon + ";" + deckOfCards[0].cardNum+ "</span> ";
 }

 //function to shuffle the deck of cards
function  shuffleDeckOfCards(cardArray){
    for(let i = (cardArray.length-1); i >=0; i--){
        let j = Math.floor(Math.random() * (i + 1));
        let temp = cardArray[i];
        cardArray [i] = cardArray[j];
        cardArray[j] = temp;
    }
    console.log("Deck of Cards after shuffling: ");
    console.log(deckOfCards);
    return cardArray;
}


function startGame(){
    //alert("Testing click event from start button");
   shuffleDeckOfCards(deckOfCards);

   //function call to deal cards
   dealNewCards();
   //console.log("After start button is clicked: ");
   //console.log(deckOfCards);
   
}

function dealNewCards(){
    //alert("Testing from 'dealNewCards() function!'");
    playerCard = [];
    dealerCard = [];
    dealerHand.innerHTML = "";
    playerHand.innerHTML = "";
    let x;
    for(x = 0; x < 2; x++){
        dealerCard.push(deckOfCards[cardCount]);
        dealerHand.innerHTML += cardOutput(cardCount, x);
        
        //code to hide first Dealer Card
        if(x == 0){
            dealerHand.innerHTML += '<div id="cover" style="left: 100px;"></div>';
        }
        cardCount++;
        playerCard.push(deckOfCards[cardCount]);
        playerHand.innerHTML += cardOutput(cardCount, x);
        cardCount++;
    }
    console.log("Cards at Dealer's Hand : ");
    console.log(dealerCard);
    console.log("Cards at Player's Hand : ")
    console.log(playerCard);

}
 function cardOutput(n,x){
      //returns on GUI form
    var hpos = (x > 0 ) ? x * 60 + 100: 100;
    var card = '<div class="icard ' +  deckOfCards[n].icon +'" style=left:' + hpos +'px;><div class="top-card suit">' + deckOfCards[n].cardNum  +' <br></div> <div class="content-card suit">  </div>  <div class="bottom-card suit">' + deckOfCards[n].cardNum +'<br></div></div>';

    return card;
     //returns on CUI form
    //return "<span style='color:" + deckOfCards[n].bgcolor + "';>" + deckOfCards[n].cardNum + "&" + deckOfCards[n].icon + ";</span>";

   
 }