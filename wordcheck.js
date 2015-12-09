/* Thanks to https://piazza.com/class/icm9jynacvn5kx?cid=43 */

// The dictionary lookup object
var dict = {};

// Do a jQuery Ajax request for the text dictionary
$.get( "dict.txt", function( txt ) {
    // Get an array of all the words
    var words = txt.split( "\n" );
 
    // And add them as properties to the dictionary lookup
    // This will allow for fast lookups later
    for ( var i = 0; i < words.length; i++ ) {
        dict[ words[i].toUpperCase() ] = true;
    }
});
 
// Modified to only pass in one word, which can then be verified.
function findWord( word ) {
    // See if it's in the dictionary
    if ( dict[ word ] ) {
        // If it is, return that word
        return word;
    }

    // Otherwise, it isn't in the dictionary.
    return "_";
}