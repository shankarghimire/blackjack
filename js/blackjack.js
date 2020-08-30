 //var to hold
 var suits = ["spades","hearts","clubs","diams"];
 var numbers = ["A","2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
 var deckOfCards = [];

 
 //variables to hold DOMs
 var output;
 var text;


 //Adds event listener
 window.addEventListener('load',init);

 function init(){
     //initializes all DOMs to varibles
     output = document.getElementById('output');
     test = document.getElementById('test');
     
     //calls function
     createDeckOfCards();
     
 }

 function createDeckOfCards(){
     for(s in suits){
         var suit = suits[s][0].toUpperCase();
         var bgcolor = (suit == 'S' || suit == 'C') ? "#000000" : "#ff0000";

         for(n in numbers){
             //output.innerHTML += "<span style=color: bgcolor> </span> ";  numbers[n]+ "&" +  suits[s] +"; "  ;
             // output.innerHTML += "<span style='color:" + bgcolor +"';>" +  numbers[n] + "&" + suits[s]+ ";</span> ";

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
     console.log(deckOfCards);  
     randomCard();     
 }

 function randomCard(){
     let randomNum = Math.floor(Math.random() * 52 );
     output.innerHTML += "<span style='color:" + deckOfCards[randomNum].bgcolor +"';> &" +  deckOfCards[randomNum].icon + ";" + deckOfCards[randomNum].cardNum+ "</span> ";
 }

