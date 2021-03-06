//globar variables to hold cards information
 var suits = ["spades","hearts","clubs","diams"];
 var numbers =["A","2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"] ;
//var numbers =["A","A", "A", "A", "A", "A", "A", "A", "A", "10", "J", "Q", "K"] ;
 var deckOfCards=[]; //an empty array to hold 52 cards
 var cardCount = 0; 
 var playerCard=[];
 var dealerCard=[];
 var hideFirstCard = true;
 var totalAmount = 0.0;
 //var betAmount;
 //var endGame = false;
 var playerBusted = false;
 var playerBlackJack = false;
 var dealerBlackJack = false;
 var userNotRegistered = true;
 var aWidth;
 var aHeight;
 var pWidth;
 var pHeight;
 var pName = "Mr. Gamer";
 var dAmount;
 var playerHandValue =0;
 var dealerHandValue = 0;
 var isMaxEnabled = false;

 //initializes all DOMs to varibles
const output = document.getElementById('output');
const message = document.getElementById('message');
const btnStart = document.getElementById('btnStart');
const start = document.getElementById('start');
const btnHold = document.getElementById('btnHold');
const btnHit = document.getElementById('btnHit');
const btnDouble = document.getElementById('btnDouble');
const btnNewDeal = document.getElementById('btnNewDeal');
const dealerHand = document.getElementById('dealerHand');
const playerHand = document.getElementById('playerHand');
const dealerCardValue = document.getElementById('dealerCardValue');
const playerCardValue = document.getElementById('playerCardValue');
const inputBetAmount = document.getElementById('inputBetAmount');
const totalDollars = document.getElementById('totalDollars');
const playerActions = document.getElementById('playerActions');
const coverCard = document.getElementById('coverCard');
const btnDealSetting = document.getElementById('btnDealSetting');
const playerInfo = document.getElementById('playerInfo');
// const playerInfo = document.getElementById('playerInfo');
// const playerInfo = document.getElementById('playerInfo');
const gameName = document.getElementById("gameName");
const btnSettings = document.getElementById('btnSettings');
const btnRegistrationOK = document.getElementById('btnRegistrationOK');
const btnRegistrationCancel = document.getElementById('btnRegistrationCancel');
const wrapper = document.getElementById('wrapper');
const gameArea = document.getElementById('gameArea');
const playerName = document.getElementById('inputPlayerName');
const depositAmount = document.getElementById('inputDepositAmount');
const sorryMessage = document.getElementById('sorryMessage');
const maxBetAmount = document.getElementById('maxBetAmount');
const btnExitGame = document.getElementById('btnExitGame');
 //Adds event listener
 window.addEventListener('load',init);
 window.addEventListener('resize',pageLayout);
 //btnStart = document.getElementById('btnStart').addEventListener('click', startGame,false); 

 //function to initialize the basic config info when browser loads
 function init(){
     divGameSettings.style.display = 'block';
     gameArea.style.display = 'none';
     sorryMessage.style.display = 'none';
     btnExitGame.style.display = 'none';
     //calls function
     pageLayout();
     createDeckOfCards();   

     //Adds Event Listener
     btnStart.addEventListener('click',startGame,false);

     btnHold.addEventListener('click',()=>{
         //alert("Testing 'Hold' button" );
         cardAction('hold');
     },false);

     btnHit.addEventListener('click',()=>{
        //alert("Testing 'Hit' button" );
        cardAction('hit');
    },false);

    btnDouble.addEventListener('click',()=>{
        //alert("Testing 'Double' button" );
        cardAction('double');
    },false);

    btnNewDeal.addEventListener('click',()=>{
      
        //alert("Testing 'New Deal' button" );
        //Enables the inputBetAmount input
        playerHand.innerHTML = "";
        dealerHand.innerHTML = "";
        dealerCardValue.innerHTML = "";
        playerCardValue.innerHTML = "";
        message.innerHTML ="Fix Bet Amount & Click on 'Start Game'";
        inputBetAmount.disabled = false;  
        btnStart.style.display = 'block';
        btnNewDeal.style.display = 'none';
        btnExitGame.style.display = 'none';

        //function call
        enableMaxBetButton();
        //startGame();
    },false);

    btnSettings.addEventListener('click',()=>{
        //alert("Testing!!!");
        divGameSettings.style.display = 'block';
        gameArea.style.display = 'none';
        sorryMessage.style.display = 'none';
    },false);

    btnRegistrationOK.addEventListener('click',()=>{
        //alert("Testing!!!");
        registerGame();
    },false);

    btnRegistrationCancel.addEventListener('click',()=>{
        endGame();
        window.close();
        //alert("Testing!!!");
    },false);

    inputBetAmount.addEventListener('change',()=>{
        //alert("Testing!!!");
        let tAmount = parseFloat( totalDollars.innerHTML);
        let bAmount = parseFloat(inputBetAmount.value);
        if(bAmount > tAmount){
            alert("You canot bet more than your Wallet Balance!");
            inputBetAmount.value = tAmount;
        }
    },false);

    
    maxBetAmount.addEventListener('click',()=>{
        let currentTotalAmount = parseFloat(totalDollars.innerHTML);
        if(currentTotalAmount > 0 ){
            isMaxEnabled = true;
            inputBetAmount.value = totalDollars.innerHTML;
            totalDollars.innerHTML = parseFloat(totalDollars.innerHTML) - parseFloat(inputBetAmount.value);
            inputBetAmount.disabled = true;
           
            disableMaxBetButton();
        }else{
            //alert("Hey," + pName +"! your wallet is empty!");
            let msg =`Hey! ${playerName.value}, 
                you don't have sufficient blanace in your Wallet!
                Do you want to load money in your Wallet?
                `;
            //window.alert(msg);
            let ch = confirm(msg);
            if(ch === true){
                //alert("Testing loading money");
                
                divGameSettings.style.display = 'block';
                gameArea.style.display = 'none';
                inputBetAmount.disabled = false;
            }
            else{
                alert("Testing ending game!");
            }
        }
       

    },false);

    btnExitGame.addEventListener('click',()=>{
        //alert("Testing Exit Button");
        endGame();
        window.close();
    },false);

 }

 function disableMaxBetButton(){
    maxBetAmount.style.backgroundColor = "rgb(128,128,128)";
    maxBetAmount.style.color ="lightgrey";
    maxBetAmount.style.textShadow = "none";
    maxBetAmount.disabled = true;
 }

 function enableMaxBetButton(){
    maxBetAmount.style.backgroundColor = "rgb(255,0,0)";
    maxBetAmount.style.color ="#ffffff";
    maxBetAmount.style.textShadow = "2px 2px 3px #000000";
    maxBetAmount.disabled = false;
    maxBetAmount.focus();
 }

 function checkBetAmount(){
    let tAmount = parseFloat(totalAmount.innerHTML);
    let bAmount = parseFloat(inputBetAmount.value);
    if(bAmount > tAmount){
        return false;
    }
    return true;  
 }

 function pageLayout(){    
    //load globar variable
    aWidth = window.innerWidth;
    aHeight = window.innerHeight;
    //console.log("Width and Height : ");
    //console.log(aWidth +", " + aHeight);
    //for mobile screen size <= 620px
    if(aWidth  <= 620){
       pHeight = aHeight; 
       wrapper.style.width = '100%';
       wrapper.style.margin = '0';
       wrapper.style.height = pHeight +'px';
       //btnSetting
       btnSettings.style.width = '25px';
       btnSettings.style.height = '25px'
    }
    else{
        //for the screen larger than 620px
       //pWidth = aWidth - 300;
       pHeight = aHeight;
       wrapper.style.width = '80%';
       wrapper.style.height = pHeight +'px';
       wrapper.style.marginTop ='0';
       wrapper.style.marginBottom = '0';
       wrapper.style.marginLeft = 'auto';
       wrapper.style.marginRight ='auto';
       // wrapper.style.height = pHeight + 'px';
       //btnSetting
       btnSettings.style.width = '30px';
       btnSettings.style.height = '30px'
       // btnSettings.style.textAlign = 'center';
    }
 }

 //function to create a deck of cards consisting of 52 different cards
 function createDeckOfCards(){
    //  var test = 0;
    let s;
    let n;
    for(s in suits){
        let suit = suits[s][0].toUpperCase();
        let bgcolor = (suit == 'S' || suit == 'C') ? "#000000" : "#ff0000";
        for(n in numbers){
            let cardValue =( ( n >= 9 ) ? 10 : (parseInt(n) + 1) );
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
    //console.log(" Deck of Cards -before Shuffuling:");
    //console.log(deckOfCards);  
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
    //console.log("Deck of Cards after shuffling: ");
    //console.log(deckOfCards);
    return cardArray;
}

function startGame(){
    message.innerHTML = "";
    playerBusted = false;
    dealerBlackJack = false;
    playerBlackJack = false;
    cardCount = 0;
    inputBetAmount.disabled = true;
    let tAmount = parseFloat(totalDollars.innerHTML);
    let bAmount = parseFloat(inputBetAmount.value);

    //code to check MaxBet button is presse or not
    if(isMaxEnabled){
        disableMaxBetButton();
        // if(userNotRegistered){
        //     inputPlayerInformation();
        // }
        //alert("Testing click event from start button");
        shuffleDeckOfCards(deckOfCards);

        //function call to deal cards
        dealNewCards();

        //function call to check BlackJack has occurred or not
        checkBlackJack();

        //Extract bet amount
        //let currentBetAmount = parseFloat(inputBetAmount.value);
        //updateTotalAmount(-currentBetAmount);
        //updateTotalAmountAfterBet(currentBetAmount);

        //Hide Start Button
        btnStart.style.display = "none";
        //document.getElementById('start').style.display = 'none';
        //totalDollars.innerHTML = totalAmount;
    }else{
        if(bAmount <= tAmount){
            //Call function to disable maxBetButton
            disableMaxBetButton();
            // if(userNotRegistered){
            //     inputPlayerInformation();
            // }
            //alert("Testing click event from start button");
            shuffleDeckOfCards(deckOfCards);
    
            //function call to deal cards
            dealNewCards();
    
            //function call to check BlackJack has occurred or not
            checkBlackJack();
    
            //Extract bet amount
            let currentBetAmount = parseFloat(inputBetAmount.value);
            //updateTotalAmount(-currentBetAmount);
            updateTotalAmountAfterBet(currentBetAmount);
    
            //Hide Start Button
            btnStart.style.display = "none";
            //document.getElementById('start').style.display = 'none';
            //totalDollars.innerHTML = totalAmount;
        }
        else{
            // let msg =`Hey! ${playerName.value}, you don't have sufficient blanace in your Wallet!`;
            // window.alert(msg);
            let confirmMessage = `Hey, ${pName},
                you don't have sufficient blanace in your Wallet!
                Do you want to load money in your wallet?`;
            let ch = confirm(confirmMessage);
            if(ch === true){
                divGameSettings.style.display = 'block';
                gameArea.style.display = 'none';
                inputBetAmount.disabled = false;
            }
            else{
                endGame();
                window.close();
            }
            
        } 
    }
       
   //console.log("After start button is clicked: ");
   //console.log(deckOfCards); 
}

function dealNewCards(){
    //alert("Testing from 'dealNewCards() function!'");
    cardCount = 0;
    playerCard = [];
    dealerCard = [];
    playerBlackJack = false;
    dealerBlackJack = false;
    playerBusted = false;
    message.innerHTML = "";
    dealerHand.innerHTML = "";
    playerHand.innerHTML = "";
    message.innerHTML = "";
    playerActions.style.display = 'block';
    btnNewDeal.style.display = 'none';
    btnExitGame.style.display = 'none';
    
    //calls function to reshuffle the deck
    shuffleDeckOfCards(deckOfCards);
    //calls function
    deal();

    //function call to check BlackJack has occurred or not
    //checkBlackJack()
    //console.log("cardCount: ");
    //console.log(cardCount);
}
function deal(){
    let x;
    for(x = 0; x < 2; x++){
        dealerCard.push(deckOfCards[cardCount]);
        dealerHand.innerHTML += cardOutput(cardCount, x);
        
        //code to hide first Dealer Card
        if(x == 0){
            if(aWidth <= 620){
                dealerHand.innerHTML += '<div id="coverCard" style="left: 30px;"></div>';
            }else{
                dealerHand.innerHTML += '<div id="coverCard" style="left: 100px;"></div>';
            }
            
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

    //console.log("Cards at Dealer's Hand : ");
    //console.log(dealerCard);
    //console.log("Cards at Player's Hand : ")
    //console.log(playerCard);
 
}

function cardAction(a){
    //console.log("Player Actions- Hit | Hold | Double : ");
    //console.log(a);
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
            doubleEnable();
            break;
        default:
            //console.log('done');
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
    
    //console.log("cardCount: ");
    //console.log(cardCount);
}
 function cardOutput(n,x){
      //returns on GUI form
      let cardHorizontalPosition = 0 ;
    //style for mobile device
    if(aWidth <= 620){
        cardHorizontalPosition = (x > 0 ) ? x * 30 + 30: 30;
    }
    else{
        cardHorizontalPosition = (x > 0 ) ? x * 60 + 100: 100;
    }
    
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
    //Disables the input bet amount button
    inputBetAmount.disabled = true;
    //endGame = true;
    document.getElementById('coverCard').style.display = 'none';

    playerActions.style.display = "none";
    btnNewDeal.style.display = 'inline-block';
    btnExitGame.style.display = 'inline-block';
  
    message.innerHTML = "Game Over! ";

    //calculates Dealer's Card value
    let dealerValue = checkTotal(dealerCard);
    let playerValue = checkTotal(playerCard);
    dealerCardValue.innerHTML = dealerValue;
    // if(playerBusted == false){
        while(dealerValue < 17 || (dealerValue < playerValue && playerValue <= 21 )){
            //deal next card to Delaer
            dealerCard.push(deckOfCards[cardCount]);
            dealerHand.innerHTML += cardOutput(cardCount,(dealerCard.length-1));
            cardCount++;
            dealerValue = checkTotal(dealerCard);
            dealerCardValue.innerHTML = dealerValue;
        }
        //function call to determine winner
        declareWinner(dealerValue,playerValue);
    // } 
    
    isMaxEnabled = false;
 }
 function declareWinner(dealerValue,playerValue){
    let payoutJack  = 1;
    let playerWins = false;
    let gamePush = false;
    let currentBetValue = parseFloat( inputBetAmount.value);
    let newAmount = 0.0;
    // alert("bet value : " + betValue);
  
    if(playerBlackJack && dealerBlackJack){
        gamePush = true;
        message.innerHTML += "<br>PUSH!!";  
    }
    else if(playerBlackJack){
        playerWins = true;
        message.innerHTML += "Player BlackJack!";
        payoutJack = 1.5;
    }
    else if(playerValue > 21 && dealerValue > 21){
        // newAmount = currentBetValue;
        gamePush = true;
        message.innerHTML += "<br>PUSH!";
    }
    else if(playerValue > 21){
        playerWins = false;
        message.innerHTML += "Player Busted!.";
        message.innerHTML += "<br>You lost $" + currentBetValue + "!";
    }
    else if((playerValue <=21 && playerValue > dealerValue)|| (dealerValue > 21 && playerValue <= 21)){
        playerWins = true;
        // newAmount = currentBetValue +  currentBetValue; //bet amount has been alreay reduced from the total dollars
        // message.innerHTML +=  "<br>Congratulations! You WIN!";
    }
    else if(playerValue == dealerValue){
        gamePush = true;
        // newAmount = currentBetValue;
        message.innerHTML += "<br> PUSH!";
    }
    else{
        playerWins = false;
        message.innerHTML += " Dealer WIN!";
        message.innerHTML += "<br>You lost $" + currentBetValue + "!";
    }
    
    //calculate winning amount or not
    if(gamePush){
        // newAmount = currentBetValue;
        //updateTotalAmount(newAmount); 
        updateTotalAmountAfterPush(currentBetValue);
    }
    else if(playerBlackJack){
        let blackJackAmount = 0.0;
        blackJackAmount= currentBetValue * 1.5;
        newAmount = currentBetValue + blackJackAmount ;
        updateTotalAmountAfterWin(newAmount);
        //updateTotalAmount(newAmount);
        message.innerHTML += "<br>You Won $" + (blackJackAmount.toFixed(2)) + "!";
    }
    else if(playerWins){
        //currentBetValue has been already reduced from the total amount
        // currentBetValue has to be rolled back to the total amount before calculation
        newAmount = 2 * currentBetValue;
        updateTotalAmountAfterWin(newAmount);
        //updateTotalAmount(newAmount);
        message.innerHTML += "You WIN!<br>You Won $" + currentBetValue.toFixed(2) + "!";
    }
   else{
       updateTotalAmountAfterLose();
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

/*
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
 */


function dealerValue(){
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

const registerGame = () =>{
    //alert("Testing!!!");
    pName = playerName.value;
    dAmount = depositAmount.value;
    let previousDepositAmount ;
    let newTotalAmount = 0.0;
    if((isNaN(totalDollars.innerHTML))){
        previousDepositAmount = 0.0;
    }else{
        previousDepositAmount =parseFloat(totalDollars.innerHTML);
    }
    
    let isValid = true;
    if(pName == "" || pName == null){
        alert("Please, fill up the player Name !");
        
        isValid = false;
    }
    if(dAmount < 10){
        alert("Minimum deposit amount must be at least $ 10 !");
        isValid = false;
    }
    if(isValid){
        newTotalAmount = parseFloat( previousDepositAmount) + parseFloat( dAmount);
        gameArea.style.display = 'block';
        divGameSettings.style.display = 'none';
        playerInfo.innerHTML = `Hey, ${pName}`;
        totalDollars.innerHTML = `${newTotalAmount.toFixed(2)}`;
        gameName.innerHTML = "Welcome to BlackJack!";
    }  
}

const endGame = ()=>{
    //alert("Testing!!!");
    let exitMessage = `Hey, ${pName}! 
        Thanks for playing BlackJack. 
        See you soooon again. 
        ☺☺☺`;
    alert(exitMessage);
    // sorryMessage.innerHTML = "Sorry! Game is not On! <br>Please, clikc the 'Setting' button at the top-right corner and fill up the Game Registration Form.";
    // sorryMessage.style.display = 'block';
    // divGameSettings.style.display = 'none';
}

function updateTotalAmount(amount){
    let currentAmount = parseFloat( totalDollars.innerHTML);
    currentAmount = currentAmount + amount;
    totalDollars.innerHTML = currentAmount.toFixed(2);
}

function updateTotalAmountAfterBet(amount){
    let tAmount = 0.0;
    let bAmount = 0.0;
    tAmount = parseFloat(totalDollars.innerHTML);
    bAmount = inputBetAmount.value;
    tAmount = tAmount - bAmount;
    totalDollars.innerHTML = tAmount.toFixed(2);
}

function updateTotalAmountAfterWin(amount){
    let tAmount = parseFloat(totalDollars.innerHTML);
    tAmount = tAmount + amount;
    totalDollars.innerHTML = tAmount.toFixed(2);
}

function updateTotalAmountAfterLose(){
    let tAmount = parseFloat(totalDollars.innerHTML);
    // tAmount = tAmount - amount;
    totalDollars.innerHTML = tAmount.toFixed(2);

}

function updateTotalAmountAfterPush(amount){
    let tAmount = parseFloat(totalDollars.innerHTML);
    tAmount = tAmount + amount;
    totalDollars.innerHTML = tAmount.toFixed(2);
}

function doubleEnable(){
    let currentBetAmount =  parseFloat(inputBetAmount.value);
    let currentTotalAmount = parseFloat(totalDollars.innerHTML);

    //Checks the total remaining amount is sufficient for double option or not
    if( currentTotalAmount >= currentBetAmount){
        inputBetAmount.disabled = false;
        inputBetAmount.value = parseFloat(inputBetAmount.value) + parseFloat(currentBetAmount) ;
        inputBetAmount.disabled = true;
        currentTotalAmount = parseFloat(currentTotalAmount) - parseFloat(currentBetAmount) ;
        totalDollars.innerHTML = currentTotalAmount;

        dealNextCard();
        endPlay();
    }
    else{
        let confirmMessage = `Hey, ${pName},
        you don't have sufficient blanace in your Wallet!
        Do you want to load money in your wallet?`;
        let ch = confirm(confirmMessage);
        if(ch === true){
            divGameSettings.style.display = 'block';
            gameArea.style.display = 'none';
            inputBetAmount.disabled = false;
        }
        // else{
            
        // }
        
    }
    //console.log("Current Total Amount",currentTotalAmount);
    //console.log("Current Bet Amount", currentBetAmount);
    //let dblBetAmount = PaymentRequestUpdateEvent
    
}