// Raging RPG Script
// Original Code by Fennekin 2013

// Used to create a version alert, comment to disable
alert("Rage RPG Version 0.01");

// defining the stats
var hp, maxhp, sp, maxsp, stamina, maxstamina, atk, def, sa, heal, sd, spd;

// defining equipment and other important stats
var items, inventory, equipment, gold, exp, bonuslevels, location;

// defining information about the character
var name, job, difficulty;

// class data
// Format: Class: BaseHP, BaseAtk, BaseDef, BaseSA, BaseHeal, BaseSD, BaseSpd, BaseStamina, BaseSPRestore
var classdata = {
    "Warrior": [25,20,30,6,10,14,6,15,1],
    "Defender": [24,10,25,10,12,25,5,15,1],
    "Sorceror": [25,6,14,20,10,30,6,15,1],
    "Martial Artist": [12,20,12,16,8,14,29,7,5],
    "Ninja": [11,18,12,18,10,12,30,7,5],
    "Mystic": [12,16,14,20,8,12,29,7,5],
    "Gladiator": [15,30,24,6,0,18,18,11,3],
    "Berserker": [14,20,18,20,0,18,21,11,3],
    "Wizard": [15,6,18,30,0,24,18,11,3],
    "Fighter": [14,24,18,8,8,15,24,9,4],
    "Hero": [12,18,14,18,10,14,25,9,4],
    "Mage": [14,8,15,24,8,18,24,9,4],
    "Medic": [17,16,17,8,24,17,12,13,2],
    "Healer": [18,10,15,10,30,15,13,13,2],
    "Sage": [17,8,17,16,24,17,12,13,2]
};

function clearVars() {
    hp = 1;
    maxhp = 1;
    sp = 1;
    maxsp = 1;
    stamina = 1;
    maxstamina = 1;
    // These are the base stats!
    atk = 1;
    def = 1;
    sa = 1;
    heal = 0;
    sd = 1;
    spd = 1;
    items = {};
    inventory = {};
    equipment = {
        "weapon1": "",
        "weapon2": "", // can be a shield
        "head": "",
        "torso": "",
        "legs": "",
        "feet": ""
    };
    bonuslevels = {
        "hp": 0, // +10 HP each (+5 in expert)
        "sp": 0, // +10 SP each
        "stamina": 0 // +100 Stamina each
    };
    location = "";
    gold = 0;
    exp = 0;
    name = "Hero";
    job = "Hero";
    difficulty = 0;
}

// Starts a new game
function newGame() {
    alert("Starting a new game...");
    var bodytext = document.getElementById("content");
    bodytext.innerHTML = '<p id="diffdesc">Choose a difficulty mode.</p><form id="level" name="difficulty">\
    <input type="radio" name="difficulty" id="easymode" value="Easy" onchange="showDiffDesc(1)">Easy Mode<br/>\
    <input type="radio" name="difficulty" id="normalmode" value="Normal" onchange="showDiffDesc(2)">Normal Mode<br/>\
    <input type="radio" name="difficulty" id="hardmode" value="Hard" onchange="showDiffDesc(3)">Hard Mode<br/>\
    <input type="button" name="difficulty" onclick="startGame()" value="Start Game"><br/>\
    <input type="button" name="difficulty" onclick="initialise()" value="Go back"></form>';
}

// Gets the difficulty description
function showDiffDesc(diff) {
    var content = document.getElementById("diffdesc");
    var newstring;
    switch (diff) {
        case 1:
            // Easy Mode
            newstring = "A mode for beginners which is easy to play for newcomers.";
            break;
        case 2:
            // Normal Mode
            newstring = "A mode which provides a reasonable challenge.";
            break;
        case 3:
            // Hard Mode
            newstring = "A mode for more experienced players that provides more challenging events.";
            break;
        case 4:
            // Expert Mode
            newstring = "A challenging mode for masters only.";
            break;
        default:
            newstring = "";
    }
    content.innerHTML = newstring;
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
        var sure = confirm("Are you sure you want to choose "+formres.elements[diffid].value+" Mode?\nYou cannot change this later.");
        if (sure) {
            startOff();
        }
        else {
            // do nothing...
        }
    }
}

function startOff() {
    var bodytext = document.getElementById("content");
    bodytext.innerHTML = '<p>Welcome to the Raging Lands! Here you\'ll be able to choose your job and start adventuring!</p>\
    <p>Sorry, I forgot to ask for your name! Type in your name below!</p>\
    <form id="person" name="details">\
    Your Name: <input type="text" name="name" id="name" value="" maxLength=20><br/>\
    <input type="button" name="difficulty" value="Accept"></form>';
}

// Resets the game...
function initialise() {
    var bodytext = document.getElementById("content");
    bodytext.innerHTML = '<p>An RPG where you get to kill monsters and get cash!</p>\
            <button onclick="newGame()">New Game</button><br/>\
            <button onclick="loadGame()">Load Game</button>';
}

function loadGame() {
    alert("This doesn't work yet...");
}