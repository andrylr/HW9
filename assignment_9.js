
/*File:  http://andrylr.github.io/HW9/assignment_8.js
    91.461 Assignment:8
    Andry Lora, UMass Lowell Computer Science, Andrylr@gmail.com
    Copyright (c) 2015 by Andry Lora.  All rights reserved.  
    File created:October 14,2015
    updated by Andry Lora on December 09, 2015
    */
//Sets up drag and drop interface on pageload


var dictionary = {};

//On user submit check word is valid
function submit(event)
{
    console.log("Submit Successful: " + $("#word").text());

    if(!dictionary[$("#word").text().toLowerCase()] == true)
    {
        $("#message").html("<p>Not a word </p>");
    }
}



$(document).ready(function ()
{
     Deal();
     Move();
    count = $(".draggable").length;
            console.log("length is" + " "+ count);
    (function()
    {

    

        // Do a jQuery Ajax request for the text dictionary
        $.get( "dict.txt", function( txt )
        {
            // Get an array of all the words
           // var dict = file.split( "\n" );

            // And add them as properties to the dictionary lookup
            // This will allow for fast lookups later
            for ( var i = 0; i < dict.length; i++ )
            {
                dictionary[ dict[i].toLowerCase() ] = true;
            }
        });

        //$("#submit_button").button().click(submit);
        $(".tile" ).draggable();
        //$(".scrabble_slots").droppable({drop: tileDropped, out: tileRemoved});
    })();
});



//global vairables

var FirstDeal = 0; 
var Score = 0;  
var total_tiles = 100;


//alphabet array and the corresponding array of values in alphabetical order
var pieces = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",""];
var values = [1, 3, 3, 2, 1, 4, 2, 4, 1, 8, 5, 1, 3, 1, 1, 3, 10, 1, 1, 1, 1, 4, 4, 8, 4, 10, 0];
var amount = [9, 2, 2, 4, 12, 2, 3, 2, 9, 1, 1, 4, 2, 6, 8, 2, 1, 6, 4, 6, 4, 2, 2, 1, 2, 1, 2];
var amount2 = amount;



function tilesubtract(){
    if (total_tiles !=0){
    total_tiles = total_tiles -1;
    console.log("total tiles is:" + total_tiles );
    $("#message").html("<p>tiles remaining: " + total_tiles + "<p>");

}
return false;
}


//drag and drop stuff
function Move(){
    $(".draggable").draggable({
        revert: 'invalid',
        snap: ".droppable",
        snapMode: "inner"
    });
    $(".droppable").droppable({
        accept: ".draggable",
        drop: function (event, ui) {

            //snap to center modified from here:
            /* http://stackoverflow.com/questions/26746823/jquery-ui-drag-and-drop-snap-to-center */

            ui.draggable.position({
                my: "center",
                at: "center",
                of: $(this),
                using: function (pos) {
                    $(this).animate(pos, 200, "linear");
                    count = count - 1;
                    console.log("length after draging"+count);
                }});

            
            


/* credit to keeping score goes to Alex Nevers — http://weblab.cs.uml.edu/~anevers/part9/hw9.html from
the piazza post*/
            Scoring($(ui.draggable).children("img").attr("alt"), $(this).children("img").attr("alt"));
            //checking for values
            //var scoreholder = $(ui.draggable).children("img").attr("alt"), $(this).children("img").attr("alt"));
           // console.log("scoreholder check " + scoreholder);



            $(this).droppable('option', 'accept', ui.draggable);
        },
        out: function (event, ui) {
            $(this).droppable('option', 'accept', '.draggable');
            UnScoring($(ui.draggable).children("img").attr("alt"));
        }

    });
}
;


/* Basis of dealing function came from Alex Nevers — http://weblab.cs.uml.edu/~anevers/part9/hw9.html from
the piazza post*/
function Deal() {

/*Checks if its the first deal if its not will reset stack */
    if (FirstDeal === 1) 
        $("#rack").html("");


    //generate random chracters adapted from:
    //http://stackoverflow.com/questions/1349404/generate-a-string-of-5-random-characters-in-javascript

        letters = "";
    var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (var i = 0; i < 7; i++){
        letters += alphabet.charAt(Math.floor(Math.random() * alphabet.length)+1);
        console.log("letters is " + letters);
}
        //var a =alphabet.charAt(Math.floor(Math.random()));
           // console.log("a is" + a);

           // var b =alphabet.length;
           // console.log("b is" + b);

           console.log("letters is " + letters);
    //deal letter tiles to the player based on the string generated above
    for (var j = 0; j < 7; j++){
        $("#rack").append("<div class='draggable'>"
                + "<img src='pics/Scrabble_Tile_"
                + letters.charAt(j)
                + ".jpg' width=60 height=60 alt='"
                + letters.charAt(j)
                + "'>"
                + "</div>");
tilesubtract();

}
    //it is no longer the first deal
    FirstDeal = 1;
    Move();

    //resets score to zero, because we just dealt and there are no words yet
    Score = 0;

    //we have to rewrite the score on the page to zero
    $("#score").html("<p>Score: " + Score + "<p>");
};


/*Similar to the Deal function but the difference is that it does not reset the score and will cotinue tallying up
this score until deal is called which resets score back to 0*/
function Continue() {
    score_2 = score;

    if (FirstDeal === 1)    //if its not the first deal, empty the rack before adding tiles
        $("#rack").html("");


    //generate random chracters adapted from:
    //http://stackoverflow.com/questions/1349404/generate-a-string-of-5-random-characters-in-javascript
    letters = "";
    var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (var i = 0; i < 7; i++)
        letters += alphabet.charAt(Math.floor(Math.random() * alphabet.length)+1);

    //deal letter tiles to the player based on the string generated above
    for (var j = 0; j < 7; j++){
        $("#rack").append("<div class='draggable'>"
                + "<img src='pics/Scrabble_Tile_"
                + letters.charAt(j)
                + ".jpg' width=60 height=60 alt='"
                + letters.charAt(j)
                + "'>"
                + "</div>");
tilesubtract();
}
    //it is no longer the first deal
    //Score = 0;
    FirstDeal = 1;
    Move();
   // Score = Score + Score_2;
    //we have to rewrite the score on the page to zero
    $("#score").html("<p>Score: " + Score + "<p>");
};


/*Counted the number of draggable IDs and kept count of this and whenever one was 
move it would decrement count and this was used as the mimimum for a loop to determine
how many new tiles should be passed to the user's hand*/
function Refill(){

    letters = "";
    var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (var i = 0; i < 7; i++) 
        letters += alphabet.charAt(Math.floor(Math.random() * alphabet.length)+1);

    //deal letter tiles to the player based on the string generated above
    for (var j = count;j < 7; j++){
        count = count +1;
        $("#rack").append("<div class='draggable'>"
                + "<img src='pics/Scrabble_Tile_"
                + letters.charAt(j)
                + ".jpg' width=60 height=60 alt='"
                + letters.charAt(j)
                + "'>"
                + "</div>");
        tilesubtract();
}

}

//score the game
/*function Scoring(tile) {
    var letterscore = 0; //score of our current tile
    for (var i = 0; i < 27; i++) {
        if (tile === pieces[i]) {
            letterscore = values[i];
        }
    } //find our tile score
if (this.id === "doubleletter") { 
 letterscore = letterscore * 2;
 }
Score += letterscore;
    if (this.id === "tripleword"){
        Score = Score * 3;
    }

    //write the score on the page
    $("#score").html("<p>Score: " + Score + "<p>");
};
*/
function Scoring(tile, square) {

    var letterscore = 0; //score of our current tile
    

    for (var i = 0; i < 27; i++) {
        if (tile === pieces[i]) {
            letterscore = values[i];
        }
    } //find our tile score

    if (square === "doubleletter")
        letterscore = letterscore * 2;

    Score += letterscore;

    if (square === "tripleword")
        Score = Score * 3;

    //write the score on the page
    $("#score").html("<p>Score: " + Score + "<p>");
}
;


function UnScoring(tile){ 
    var letterscore = 0; //score of our current tile
    for (var i = 0; i < 27; i++) {
        if (tile === pieces[i]) {
            letterscore = values[i];
        }
    }
      Score = Score - letterscore ;
      if(Score<0)
        Score = 0;  
    $("#score").html("<p>Score: " + Score + "<p>");

}