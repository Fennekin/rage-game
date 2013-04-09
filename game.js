// Raging RPG Script
// Original Code by Fennekin 2013

// Used to create a version alert, comment to disable
alert("Simple RPG Version 0.01");

// defining the stats
var hp, maxhp, sp, maxsp, atk, def, sa, sd, spd;

// defining equipment and other important stats
var items, inventory, equipment, gold, exp;

// defining information about the character
var name, job, difficulty;

function clearVars() {
    hp = 1;
    maxhp = 1;
    sp = 1;
    maxsp = 1;
    atk = 1;
    def = 1;
    sa = 1;
    sd = 1;
    spd = 1;
    items = {};
    inventory = {};
    equipment = {};
    gold = 0;
    exp = 0;
    name = "Hero";
    job = "Hero";
    difficulty = 0;
}

function newGame() {
    alert("Starting a new game...");
    clearVars();
    var bodytext = document.getElementById("content");
    bodytext.innerHTML = '<form id="level" name="difficulty">\
    <input type="radio" name="difficulty" id="easymode" value="Easy">Easy Mode<br/>\
    <input type="radio" name="difficulty" id="easymode" value="Normal">Normal Mode<br/>\
    <input type="radio" name="difficulty" id="easymode" value="Hard">Hard Mode<br/>\
    <input type="button" name="difficulty" onclick="startGame()" value="Start Game"></form>';
}

// Starts the game after selecting difficulty
function startGame() {
    var formres = document.getElementById("level");
    var diffid = 0;
    for (var x=0; x<formres.length; x++) {
        if (formres.elements[x].checked === true) {
            difficulty = x+1;
            diffid = x;
            break;
        }
    }
    if (difficulty === 0) {
        alert("You haven't chosen a difficulty level...");
    }
    else {
        alert("You chose "+formres.elements[diffid].value+" Mode (Level "+difficulty+")");
    }
}

// Resets the game...
function initalise() {
    var bodytext = document.getElementById("content");
    bodytext.innerHTML = '<p>An RPG where you get to kill monsters and get cash!</p>\
            <button onclick="newGame()">New Game</button><br/>\
            <button onclick="loadGame()">Load Game</button>';
}

function loadGame() {
    alert("This doesn't work yet...");
}