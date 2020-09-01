 //globar variables to hold cards information
 var suits = ["spades","hearts","clubs","diams"];
 var numbers =["A","2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"] ;
 var deckOfCards=[]; //an empty array to hold 52 cards
 var cardCount = 0; //
 var playerCard=[];
 var dealerCard=[];
 var hideFirstCard = true;
 var totalAmount = 100;
 var endGame = false;
 var playerBusted = false;
 var playerBlackJack = false;
 var dealerBlackJack = false;


 
 //variables to hold DOMs
 var output;
 var message;
 var btnStart;
 var btnHit;
 var btnHold;
 var btnDouble;
 var btnNewDeal;
 var start;
 var dealerHand;
 var playerHand;
 var dealerCardValue ;
 var playercardValue ;
 var betAmount;
 var totalDollars;
 var playerActions;
 var coverCard;
 var btnDealSetting;
 


 //Adds event listener
 window.addEventListener('load',init);
 //btnStart = document.getElementById('btnStart').addEventListener('click', startGame,false); 

 //function to initialize the basic config info when browser loads
 function init(){

     //initializes all DOMs to varibles
     output = document.getElementById('output');
     message = document.getElementById('message');
     btnStart = document.getElementById('btnStart');
     start = document.getElementById('start');
     btnHold = document.getElementById('btnHold');
     btnHit = document.getElementById('btnHit');
     btnDouble = document.getElementById('btnDouble');
     btnNewDeal = document.getElementById('btnNewDeal');
     dealerHand = document.getElementById('dealerHand');
     playerHand = document.getElementById('playerHand');
     dealerCardValue = document.getElementById('dealerCardValue');
     playerCardValue = document.getElementById('playerCardValue');
     betAmount = document.getElementById('betAmount');
     totalDollars = document.getElementById('totalDollars');
     playerActions = document.getElementById('playerActions');
     coverCard = document.getElementById('coverCard');
     btnDealSetting = document.getElementById('btnDealSetting');


     
     //section to call other functions
     createDeckOfCards();   

     //Adds Event Listener
     btnStart.addEventListener('click',startGame,false);
     btnHold.addEventListener('click',()=>{
         //alert("Testing 'Hold' button" );
         cardAction('hold');

         //btnDeal.style.display = "block";
         //playerActions.style.display = "none";
     },false);
     btnHit.addEventListener('click',()=>{
        //alert("Testing 'Hit' button" );
        // let btnValue = 'hit';
        cardAction('hit');
    },false);
    btnDouble.addEventListener('click',()=>{
        //alert("Testing 'Double' button" );
        cardAction('double');
    },false);

    btnNewDeal.addEventListener('click',()=>{
        //console.log("Testing from btnNewDeal ");
        //alert("Testing 'New Deal' button" );
        dealNewCards();

    },false);

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
    message.innerHTML = "";
    playerBusted = false;
    dealerBlackJack = false;
    playerBlackJack = false;
    cardCount = 0;
    //alert("Testing click event from start button");
   shuffleDeckOfCards(deckOfCards);

   //function call to deal cards
   dealNewCards();

   //function call to check BlackJack has occurred or not
   checkBlackJack()

   //Hide Start Button
   btnStart.style.display = "none";
   //document.getElementById('start').style.display = 'none';
   //totalDollars.innerHTML = totalAmount;
   //console.log("After start button is clicked: ");
   //console.log(deckOfCards); 
}

function dealNewCards(){
    //alert("Testing from 'dealNewCards() function!'");
   
    playerCard = [];
    dealerCard = [];
    dealerHand.innerHTML = "";
    playerHand.innerHTML = "";
    message.innerHTML = "";
    playerActions.style.display = 'block';
    btnNewDeal.style.display = 'none';
    
    //calls function
    deal();
    console.log("cardCount: ");
    console.log(cardCount);
}
function deal(){
    let x;
    for(x = 0; x < 2; x++){
        dealerCard.push(deckOfCards[cardCount]);
        dealerHand.innerHTML += cardOutput(cardCount, x);
        
        //code to hide first Dealer Card
        if(x == 0){
            dealerHand.innerHTML += '<div id="coverCard" style="left: 100px;"></div>';
        }
        cardCount++;
        playerCard.push(deckOfCards[cardCount]);
        playerHand.innerHTML += cardOutput(cardCount, x);
        cardCount++;
    }

    //print dealer card value
    dealerCardValue.innerHTML = dealerValue();
    //print player card value
    //playerCardValue.innerHTML = calculatePlayerCardValue();
    playerCardValue.innerHTML = checkTotal(playerCard);

    console.log("Cards at Dealer's Hand : ");
    console.log(dealerCard);
    console.log("Cards at Player's Hand : ")
    console.log(playerCard);
}

function cardAction(a){
    console.log("Player Actions- Hit | Hold | Double : ");
    console.log(a);
    switch(a){
        case 'hit':
            //alert("Testing-Hit button pressed!")
            dealNextCard();
            break;
        case 'hold':
            //alert("Testing-Hold button pressed!")
            endPlay();
            break;
        case 'double':
            //alert("Testing-Double button pressed!")
            //logics to be added later
            break;
        default:
            console.log('done');
            endPlay();
    }
}

//function to deal next card after player hits 'Hit' button
function dealNextCard(){
    playerCard.push(deckOfCards[cardCount]);
    playerHand.innerHTML += cardOutput(cardCount, (playerCard.length -1));
    cardCount++;
    let rValue = checkTotal(playerCard);
    playerCardValue.innerHTML = rValue;
    if(rValue > 21){
        //message.innerHTML = "Player Busted!!!";
        playerBusted = true;
        endPlay();
    }
    
    
}
 function cardOutput(n,x){
      //returns on GUI form
    var cardHorizontalPosition = (x > 0 ) ? x * 60 + 100: 100;
    var card = '<div class="icard ' +  deckOfCards[n].icon +'" style=left:' + cardHorizontalPosition +'px;><div class="top-card suit">' + deckOfCards[n].cardNum  +' <br></div> <div class="content-card suit">  </div>  <div class="bottom-card suit">' + deckOfCards[n].cardNum +'<br></div></div>';
    return card;
     //returns on CUI form
    //return "<span style='color:" + deckOfCards[n].bgcolor + "';>" + deckOfCards[n].cardNum + "&" + deckOfCards[n].icon + ";</span>";
 }

 function checkTotal(arr){
     //Logic I:
    //  let rValue = 0;
    //  let aceAdjust = false;
    //  for(let i in arr){
    //      if(arr[i].cardNum =='A' && !aceAdjust){
    //         rValue = rValue + 10;
    //         aceAdjust = true;
    //      }
    //      rValue = rValue + arr[i].cardValue;
    //  }
    //  if(aceAdjust && rValue > 21){
    //      rValue = rValue -10;
    //  }
    //  return rValue;

    //Logic II:
    let rValue = 0;
    let aceValue = 0;
     for(let i in arr){
         //Checks the card is 'Ace' or other 
         if(arr[i].cardNum =='A'){
             //determines 'A' is 1 or 11 as required
             if(rValue < 11){
                aceValue = 11;
             }
             else{
                 aceValue = 1;
             }
            rValue = rValue + aceValue;   
         }
         else{
            rValue = rValue + arr[i].cardValue;
         }   
     }
     return rValue;
 }

 function endPlay(){
     //alert("Testing-endPlay() function");
    endGame = true;
    document.getElementById('coverCard').style.display = 'none';

    playerActions.style.display = "none";
    btnNewDeal.style.display = 'block';
  
    message.innerHTML += "<br>Game Over!!!";

    //calculates Dealer's Card value
    let dealerValue = checkTotal(dealerCard);
    let playerValue = checkTotal(playerCard);
    dealerCardValue.innerHTML = dealerValue;
    if(playerBusted == false){
        while(dealerValue < 17 || dealerValue < playerValue ){
            //deal next card to Delaer
            dealerCard.push(deckOfCards[cardCount]);
            dealerHand.innerHTML += cardOutput(cardCount,(dealerCard.length-1));
            cardCount++;
            dealerValue = checkTotal(dealerCard);
            dealerCardValue.innerHTML = dealerValue;
        }
        //function call to determine winner
        declareWinner(dealerValue,playerValue);
    }  
 }
 function declareWinner(dealerValue,playerValue){
    let payoutJack  = 1;
    let betValue = betAmount.value;
    // alert("bet value : " + betValue);
    if(playerBlackJack && dealerBlackJack){
        message.innerHTML += "Player BlackJack! Dealer BlackJack! <br>PUSH";
    }
    else if(playerBlackJack){
        message.innerHTML += "Player BlackJack!";
    }
    else if(playerBusted){
        message.innerHTML +="<br>Player Busted!";
    }
    else if(playerValue == 21 && playerCard.length == 2){
        message.innerHTML += "<br>Player BlackJack!!!";
        payoutJack = 1.5;

    }
    else if((playerValue <=21 && playerValue > dealerValue)|| (dealerValue > 21 && playerValue <= 21)){
        message.innerHTML +=  "<br>Congratulations! You WIN!";
    }
    else if(playerValue > 21){
        message.innerHTML == "<br>Dealer WINS! Try Again.";

    }
    else if(playerValue == dealerValue){
        message.innerHTML += "<br>PUSH!";
    }
    else{
        message.innerHTML += "<br>Dealer WINS! Try Again.";
    }
    //console.log("testing");
    btnDealSetting.style.display = "block";
    //console.log("testing");
 }
 /*
 function calculatePlayerCardValue(){
     //alert("Testing from calculatePlayerCardValue()");
     let total = 0;
     let cardsInfo = "";
     for(let i = 0; i < playerCard.length; i++){
         total += playerCard[i].cardValue;
         if(i != (playerCard.length -1)){
            cardsInfo += playerCard[i].cardNum + "+";
         }else{
            cardsInfo += playerCard[i].cardNum ;
         }
        
     }
     let returnValue = total + "(" +  cardsInfo +")";
     //alert (returnValue);
     return (total +" (" + cardsInfo + ")");
 }
*/
 dealerValue = () =>{
     //alert("testing from dealerValue");
     let firstCard = "?";
    if(hideFirstCard){
        return firstCard + "+" + dealerCard[1].cardValue;
    }
    else{
        let total = 0;
        let cardsInfo = "";
        for(let i = 0; i < erCard.length; i++){
            total += dealerCard[i].cardValue;
            if(i != (dealerCard.length -1)){
               cardsInfo += dealerCard[i].cardNum + "+";
            }else{
               cardsInfo += dealerCard[i].cardNum ;
            }
           
        }
        let returnValue = total + "(" +  cardsInfo +")";
        //alert (returnValue);
        return (total +" (" + cardsInfo + ")");
    }
    
 };
 function calculateDealerCardValue(){
    //alert("Testing from calculateDealerCardValue()");
   
}
function checkBlackJack(){
    let pValue = checkTotal(playerCard);
    let dValue = checkTotal(dealerCard);
    if(dValue == 21 && dealerCard.length == 2){
        dealerBlackJack = true;
    }
    if(pValue == 21 && playerCard.length == 2){
        playerBlackJack = true;
        endPlay();
    }

}