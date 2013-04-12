// Raging RPG Script
// Original Code by Fennekin 2013

// Used to create a version alert, comment to disable
alert("Rage RPG Version 0.01");

// defining the stats
var hp, basehp, sp, basesp, stamina, basestamina, atk, def, sa, heal, sd, spd;

// defining equipment and other important stats
var items, inventory, equipment, gold, exp, bonuslevels, maplocation, abilities, ap, skills, type1, type2;

// defining information about the character
var heroname, job, difficulty;

// class data
// Format: Class: BaseHP, BaseAtk, BaseDef, BaseSA, BaseHeal, BaseSD, BaseSpd, BaseStamina, BaseSPRestore
var classdata = {
    "Warrior": {
        "stats": [25,20,30,6,10,14,6,15,1],
        "skills": {
            "start": ["[Element] Slash", "Guard Slash", "Power Attack"]
        }
    },
    "Defender": {
        "stats": [24,10,25,10,12,25,5,15,1],
        "skills": {
            "start": ["Guard", "Counterguard", "Heal"]
        }
    },
    "Sorceror": {
        "stats": [25,6,14,20,10,30,6,15,1],
        "skills": {
            "start": ["[Element] Wave", "Guard", "Heal"]
        }
    },
    "Martial Artist": {
        "stats": [12,20,12,16,8,14,29,7,5],
        "skills": {
            "start": ["[Element] Slash", "Quick Slash", "Meditate"]
        }
    },
    "Ninja": {
        "stats": [11,18,12,18,10,12,30,7,5],
        "skills": {
            "start": ["[Element] Wave", "Quick Slash", "Meditate"]
        }
    },
    "Mystic": {
        "stats": [12,16,14,20,8,12,29,7,5],
        "skills": {
            "start": ["[Element] Wave", "Disrupt", "Meditate"]
        }
    },
    "Gladiator": {
        "stats": [15,30,24,6,0,18,18,11,3],
        "skills": {
            "start": ["[Element] Slash", "Power Attack", "Psyche Up"]
        }
    },
    "Berserker": {
        "stats": [14,20,18,20,0,18,21,11,3],
        "skills": {
            "start": ["[Element] Slash", "[Element] Wave", "Power Attack"]
        }
    },
    "Wizard": {
        "stats": [15,6,18,30,0,24,18,11,3],
        "skills": {
            "start": ["[Element] Wave", "Disrupt", "Psyche Up"]
        }
    },
    "Fighter": {
        "stats": [14,24,18,8,8,15,24,9,4],
        "skills": {
            "start": ["[Element] Slash", "Power Attack", "Heal"]
        }
    },
    "Hero": {
        "stats": [12,18,14,18,10,14,25,9,4],
        "skills": {
            "start": ["[Element] Slash", "[Element] Wave", "Heal"]
        }
    },
    "Mage": {
        "stats": [14,8,15,24,8,18,24,9,4],
        "skills": {
            "start": ["[Element] Wave", "Disrupt", "Heal"]
        }
    },
    "Medic": {
        "stats": [17,16,17,8,24,17,12,13,2],
        "skills": {
            "start": ["Heal", "Regen", "[Element] Slash"]
        }
    },
    "Healer": {
        "stats": [18,10,15,10,30,15,13,13,2],
        "skills": {
            "start": ["Heal", "Regen", "Guard"]
        }
    },
    "Sage": {
        "stats": [17,8,17,16,24,17,12,13,2],
        "skills": {
            "start": ["Heal", "Regen", "[Element] Wave"]
        }
    }
};

var statindex = ["Hit Points", "Attack", "Defense", "Sp. Atk", "Healing", "Sp. Def", "Speed", "Stamina", "SP Restore"];

// Type effectiveness
// Lower number = less effective, higher = more effective
var types = {
    "Aura": [-2,-2,2,0,1,-1],
    "Psychic": [2,-2,-2,-1,0,1],
    "Dark": [-2,2,-2,1,-1,0],
    "Light": [0,1,-1,-2,-2,2],
    "Spirit": [-1,0,1,2,-2,-2],
    "Shadow": [1,-1,0,-2,2,-2]
};

var typeindex = ["Aura", "Psychic", "Dark", "Light", "Spirit", "Shadow"];

// Equipment
var equipment = {
    "swords": {
        "Dream Sword": {"attack":6,"sa":0,"heal":0,"speed":0,"drain":0,"crit":0.01,"ability":"","grade":"F"},
        "Wooden Sword": {"attack":8,"sa":0,"heal":0,"speed":0,"drain":0,"crit":0,"ability":"","grade":"E"},
        "Iron Sword": {"attack":10,"sa":0,"heal":0,"speed":0,"drain":0,"crit":0,"ability":"","grade":"D"},
        "Steel Sword": {"attack":12,"sa":0,"heal":0,"speed":0,"drain":0,"crit":0.005,"ability":"","grade":"C"},
        "Silver Sword": {"attack":14,"sa":0,"heal":0,"speed":0,"drain":0.005,"crit":0.01,"ability":"","grade":"B"},
        "Platinum Sword": {"attack":16,"sa":0,"heal":0,"speed":0,"drain":0.01,"crit":0.015,"ability":"","grade":"A"},
        "Apprentice's Sword": {"attack":17,"sa":0,"heal":0,"speed":0,"drain":0.015,"crit":0.02,"ability":"Physical Boost LV1","grade":"S"},
        "Captain's Sword": {"attack":18,"sa":0,"heal":0,"speed":0,"drain":0.02,"crit":0.03,"ability":"Physical Boost LV2","grade":"SS"},
        "Master Sword": {"attack":19,"sa":0,"heal":0,"speed":0,"drain":0.03,"crit":0.04,"ability":"Physical Boost LV3","grade":"SS"},
        "Legendary Sword": {"attack":20,"sa":0,"heal":0,"speed":0,"drain":0.05,"crit":0.05,"ability":"Physical Boost MAX","grade":"SSS"}
    },
    "staffs": {
        "Dream Staff": {"attack":3,"sa":3,"heal":0,"speed":0,"drain":0,"crit":0,"ability":"","grade":"F"},
        "Bamboo Staff": {"attack":4,"sa":4,"heal":0,"speed":0,"drain":0,"crit":0,"ability":"","grade":"E"},
        "Aluminium Staff": {"attack":5,"sa":5,"heal":0,"speed":0,"drain":0,"crit":0,"ability":"","grade":"D"},
        "Copper Staff": {"attack":6,"sa":6,"heal":0,"speed":0,"drain":0.005,"crit":0,"ability":"","grade":"C"},
        "Master Staff": {"attack":7,"sa":7,"heal":0,"speed":0,"drain":0.01,"crit":0,"ability":"","grade":"B"},
        "Legendary Staff": {"attack":8,"sa":8,"heal":0,"speed":1,"drain":0.015,"crit":0.005,"ability":"","grade":"A"},
        "Super Staff": {"attack":8,"sa":8,"heal":0,"speed":2,"drain":0.02,"crit":0.01,"ability":"SP Charge LV1","grade":"S"},
        "Hyper Staff": {"attack":9,"sa":9,"heal":0,"speed":3,"drain":0.03,"crit":0.015,"ability":"SP Charge LV2","grade":"SS"},
        "Ultra Staff": {"attack":9,"sa":9,"heal":0,"speed":4,"drain":0.04,"crit":0.02,"ability":"SP Charge LV3","grade":"SS"},
        "Ultima Staff": {"attack":10,"sa":10,"heal":0,"speed":5,"drain":0.05,"crit":0.025,"ability":"SP Charge MAX","grade":"SSS"}
    },
    "wands": {
        "Dream Wand": {"attack":0,"sa":6,"heal":0,"speed":0,"drain":0,"crit":0.01,"ability":"","grade":"F"},
        "Oak Wand": {"attack":0,"sa":8,"heal":0,"speed":0,"drain":0,"crit":0,"ability":"","grade":"E"},
        "Ancient Wand": {"attack":0,"sa":10,"heal":0,"speed":0,"drain":0,"crit":0,"ability":"","grade":"D"},
        "Apprentice's Wand": {"attack":0,"sa":12,"heal":0,"speed":0,"drain":0,"crit":0.005,"ability":"","grade":"C"},
        "Master's Wand": {"attack":0,"sa":14,"heal":0,"speed":0,"drain":0.005,"crit":0.01,"ability":"","grade":"B"},
        "Mysterious Wand": {"attack":0,"sa":16,"heal":0,"speed":0,"drain":0.01,"crit":0.015,"ability":"","grade":"A"},
        "Supreme Wand": {"attack":0,"sa":17,"heal":0,"speed":0,"drain":0.015,"crit":0.02,"ability":"Magic Boost LV1","grade":"S"},
        "Mystery Wand": {"attack":0,"sa":18,"heal":0,"speed":0,"drain":0.02,"crit":0.03,"ability":"Magic Boost LV2","grade":"SS"},
        "Mystic Wand": {"attack":0,"sa":19,"heal":0,"speed":0,"drain":0.03,"crit":0.04,"ability":"Magic Boost LV3","grade":"SS"},
        "Serenity Wand": {"attack":0,"sa":20,"heal":0,"speed":0,"drain":0.05,"crit":0.05,"ability":"Magic Boost MAX","grade":"SSS"}
    },
    "shields": {
        "Dream Shield": {"defense":1,"sd":1,"heal":0,"speed":0,"ability":"","grade":"F","block":0.05},
        "Wooden Shield": {"defense":2,"sd":2,"heal":0,"speed":0,"ability":"","grade":"E","block":0.06},
        "Iron Shield": {"defense":3,"sd":3,"heal":0,"speed":0,"ability":"","grade":"D","block":0.07},
        "Steel Shield": {"defense":4,"sd":4,"heal":0,"speed":0,"ability":"","grade":"C","block":0.08},
        "Silver Shield": {"defense":5,"sd":5,"heal":0,"speed":0,"ability":"","grade":"B","block":0.09},
        "Platinum Shield": {"defense":6,"sd":6,"heal":0,"speed":0,"ability":"","grade":"A","block":0.1},
        "Apprentice's Shield": {"defense":7,"sd":7,"heal":0,"speed":0,"ability":"Critical Block","grade":"S","block":0.12},
        "Captain's Shield": {"defense":8,"sd":8,"heal":0,"speed":0,"ability":"Critical Block","grade":"SS","block":0.14},
        "Master Shield": {"defense":9,"sd":9,"heal":0,"speed":0,"ability":"Critical Block","grade":"SS","block":0.16},
        "Legendary Shield": {"defense":10,"sd":10,"heal":0,"speed":0,"ability":"Critical Block","grade":"SSS","block":0.2}
    },
    "helmets": {
        "Dream Helmet": {"defense":1,"sd":1,"heal":0,"speed":0,"ability":"","grade":"F"},
        "Wooden Helmet": {"defense":2,"sd":2,"heal":0,"speed":-2,"ability":"","grade":"E"},
        "Iron Helmet": {"defense":3,"sd":3,"heal":0,"speed":-4,"ability":"","grade":"D"},
        "Steel Helmet": {"defense":4,"sd":4,"heal":0,"speed":-6,"ability":"","grade":"C"},
        "Silver Helmet": {"defense":5,"sd":5,"heal":0,"speed":-8,"ability":"","grade":"B"},
        "Platinum Helmet": {"defense":6,"sd":6,"heal":0,"speed":-10,"ability":"","grade":"A"},
        "Apprentice's Helmet": {"defense":7,"sd":7,"heal":0,"speed":-10,"ability":"","grade":"S"},
        "Captain's Helmet": {"defense":8,"sd":8,"heal":0,"speed":-10,"ability":"","grade":"SS"},
        "Master Helmet": {"defense":9,"sd":9,"heal":0,"speed":-10,"ability":"","grade":"SS"},
        "Legendary Helmet": {"defense":10,"sd":10,"heal":0,"speed":-10,"ability":"","grade":"SSS"}
    },
    "hats": {
        "Dream Hat": {"defense":0,"sd":0,"heal":1,"speed":0,"ability":"","grade":"F"},
        "Oak Hat": {"defense":1,"sd":1,"heal":2,"speed":0,"ability":"","grade":"E"},
        "Ancient Hat": {"defense":1,"sd":1,"heal":3,"speed":0,"ability":"","grade":"D"},
        "Apprentice's Hat": {"defense":2,"sd":2,"heal":4,"speed":0,"ability":"","grade":"C"},
        "Master's Hat": {"defense":2,"sd":2,"heal":5,"speed":0,"ability":"","grade":"B"},
        "Mysterious Hat": {"defense":3,"sd":3,"heal":6,"speed":0,"ability":"","grade":"A"},
        "Supreme Hat": {"defense":3,"sd":3,"heal":7,"speed":0,"ability":"","grade":"S"},
        "Mystery Hat": {"defense":4,"sd":4,"heal":8,"speed":0,"ability":"","grade":"SS"},
        "Mystic Hat": {"defense":4,"sd":4,"heal":9,"speed":0,"ability":"","grade":"SS"},
        "Serenity Hat": {"defense":5,"sd":5,"heal":10,"speed":0,"ability":"","grade":"SSS"}
    },
    "armour": {
        "Dream Armour": {"defense":5,"sd":5,"heal":0,"speed":0,"ability":"","grade":"F"},
        "Wooden Armour": {"defense":10,"sd":10,"heal":0,"speed":-10,"ability":"","grade":"E"},
        "Iron Armour": {"defense":15,"sd":15,"heal":0,"speed":-20,"ability":"","grade":"D"},
        "Steel Armour": {"defense":20,"sd":20,"heal":0,"speed":-30,"ability":"","grade":"C"},
        "Silver Armour": {"defense":25,"sd":25,"heal":0,"speed":-40,"ability":"","grade":"B"},
        "Platinum Armour": {"defense":30,"sd":30,"heal":0,"speed":-50,"ability":"","grade":"A"},
        "Apprentice's Armour": {"defense":35,"sd":35,"heal":0,"speed":-50,"ability":"","grade":"S"},
        "Captain's Armour": {"defense":40,"sd":40,"heal":0,"speed":-50,"ability":"","grade":"SS"},
        "Master Armour": {"defense":45,"sd":45,"heal":0,"speed":-50,"ability":"","grade":"SS"},
        "Legendary Armour": {"defense":50,"sd":50,"heal":0,"speed":-50,"ability":"","grade":"SSS"}
    },
    "robes": {
        "Dream Robe": {"defense":0,"sd":0,"heal":0,"speed":2,"ability":"","grade":"F"},
        "Silk Robe": {"defense":1,"sd":1,"heal":0,"speed":4,"ability":"","grade":"E"},
        "Ancient Robe": {"defense":2,"sd":2,"heal":0,"speed":6,"ability":"","grade":"D"},
        "Apprentice's Robe": {"defense":3,"sd":3,"heal":0,"speed":8,"ability":"","grade":"C"},
        "Master's Robe": {"defense":4,"sd":4,"heal":0,"speed":10,"ability":"","grade":"B"},
        "Mysterious Robe": {"defense":5,"sd":5,"heal":0,"speed":12,"ability":"","grade":"A"},
        "Supreme Robe": {"defense":6,"sd":6,"heal":0,"speed":14,"ability":"","grade":"S"},
        "Mystery Robe": {"defense":7,"sd":7,"heal":0,"speed":16,"ability":"","grade":"SS"},
        "Mystic Robe": {"defense":8,"sd":8,"heal":0,"speed":18,"ability":"","grade":"SS"},
        "Serenity Robe": {"defense":10,"sd":10,"heal":0,"speed":20,"ability":"","grade":"SSS"}
    },
    "boots": {
        "Dream Boots": {"defense":2,"sd":2,"heal":0,"speed":0,"ability":"","grade":"F"},
        "Wooden Boots": {"defense":4,"sd":4,"heal":0,"speed":-3,"ability":"","grade":"E"},
        "Iron Boots": {"defense":6,"sd":6,"heal":0,"speed":-6,"ability":"","grade":"D"},
        "Steel Boots": {"defense":8,"sd":8,"heal":0,"speed":-9,"ability":"","grade":"C"},
        "Silver Boots": {"defense":10,"sd":10,"heal":0,"speed":-12,"ability":"","grade":"B"},
        "Platinum Boots": {"defense":12,"sd":12,"heal":0,"speed":-15,"ability":"","grade":"A"},
        "Apprentice's Boots": {"defense":14,"sd":14,"heal":0,"speed":-15,"ability":"","grade":"S"},
        "Captain's Boots": {"defense":16,"sd":16,"heal":0,"speed":-15,"ability":"","grade":"SS"},
        "Master Boots": {"defense":18,"sd":18,"heal":0,"speed":-15,"ability":"","grade":"SS"},
        "Legendary Boots": {"defense":20,"sd":20,"heal":0,"speed":-15,"ability":"","grade":"SSS"}
    },
    "sandals": {
        "Dream Sandals": {"defense":0,"sd":0,"heal":0,"speed":1,"ability":"","grade":"F"},
        "Oak Sandals": {"defense":0,"sd":0,"heal":0,"speed":2,"ability":"","grade":"E"},
        "Ancient Sandals": {"defense":0,"sd":0,"heal":0,"speed":3,"ability":"","grade":"D"},
        "Apprentice's Sandals": {"defense":0,"sd":0,"heal":0,"speed":4,"ability":"","grade":"C"},
        "Master's Sandals": {"defense":0,"sd":0,"heal":0,"speed":5,"ability":"","grade":"B"},
        "Mysterious Sandals": {"defense":0,"sd":0,"heal":0,"speed":6,"ability":"","grade":"A"},
        "Supreme Sandals": {"defense":0,"sd":0,"heal":0,"speed":7,"ability":"","grade":"S"},
        "Mystery Sandals": {"defense":0,"sd":0,"heal":0,"speed":8,"ability":"","grade":"SS"},
        "Mystic Sandals": {"defense":0,"sd":0,"heal":0,"speed":9,"ability":"","grade":"SS"},
        "Serenity Sandals": {"defense":0,"sd":0,"heal":0,"speed":10,"ability":"","grade":"SSS"}
    }
};

// Items
// Amount is % healing
var availableitems = {
    "Potion": {"desc": "Restores 40% of the target's maximum HP", "effects": [{"type": "healhp", "amount": 40}]},
    "Super Potion": {"desc": "Restores 60% of the target's maximum HP", "effects": [{"type": "healhp", "amount": 60}]},
    "Ultra Potion": {"desc": "Restores 80% of the target's maximum HP", "effects": [{"type": "healhp", "amount": 80}]},
    "Max Potion": {"desc": "Restores 100% of the target's maximum HP", "effects": [{"type": "healhp", "amount": 100}]},
    "Ether": {"desc": "Restores 50% of the target's maximum SP", "effects": [{"type": "healsp", "amount": 50}]},
    "Max Ether": {"desc": "Restores 100% of the target's maximum SP", "effects": [{"type": "healsp", "amount": 100}]},
    "Elixir": {"desc": "Restores 100% of the target's maximum HP and SP", "effects": [{"type": "healhp", "amount": 100}, {"type": "healsp", "amount": 100}]}
};

// Clears variables for a new game
function clearVars() {
    hp = 1;
    basehp = 1;
    sp = 1;
    basesp = 1;
    stamina = 1;
    basestamina = 1;
    // These are the base stats!
    atk = 1;
    def = 1;
    sa = 1;
    heal = 0;
    sd = 1;
    spd = 1;
    items = {};
    ap = 0;
    abilities = {};
    skills = {};
    inventory = {};
    equipment = {
        "weapon1": "",
        "weapon2": "", // can be a shield
        "head": "",
        "torso": "",
        "feet": ""
    };
    bonuslevels = {
        "hp": 0, // +10 HP each (+5 in expert)
        "sp": 0, // +10 SP each
        "stamina": 0 // +100 Stamina each
    };
    maplocation = "";
    gold = 0;
    exp = 0;
    heroname = "Hero";
    job = "Hero";
    difficulty = 0;
    type1 = "";
    type2 = "";
}

// Starts a new game
function newGame() {
    alert("Starting a new game...");
    clearVars();
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
    }
}

// Name entering
function startOff() {
    var bodytext = document.getElementById("content");
    bodytext.innerHTML = '<p>Welcome to the Raging Lands! Here you\'ll be able to choose your job and start adventuring!</p>\
    <p>Sorry, I forgot to ask for your name! Type in your name below!</p>\
    <form id="person" name="details">\
    Your Name: <input type="text" name="name" id="name" value="" maxLength=20><br/>\
    <input type="button" name="difficulty" value="Accept" onclick="submitname()"></form>';
}

// Submits the name
function submitname() {
    var formres = document.getElementById("person");
    var name = formres.name.value;
    if (name.length === 0) {
        alert("Please enter a name!");
    }
    else {
        heroname = name;
        alert("Welcome, "+name+"!");
        classselectscreen();
    }
}

// Gets a list of all existing classes
function getClassNames() {
    var occupations = [];
    for (var x in classdata) {
        occupations.push(x);
    }
    return occupations;
}

// Creates the class selection list with the id "classname"
function createClassSelectList() {
    var occupations = getClassNames();
    var ret = '<select id="classname" onchange="changestats()">';
    for (var x=0; x<occupations.length; x++) {
        ret += '<option>'+occupations[x]+'</option>';
    }
    ret += "</select>";
    return ret;
}

// Select the class
function classselectscreen() {
    var bodytext = document.getElementById("content");
    bodytext.innerHTML = '<p>Welcome, '+heroname+'! Here you\'ll be able to choose your job and start adventuring!</p>\
    <form id="classselect" name="details">\
    Class: '+createClassSelectList()+'<br/>\
    <input type="button" name="chooseclass" value="Choose Class" onclick="confirmclass()"></form><br/><br/>\
    <span id=statwindow1></span>';
    changestats();
}

// Gets the preview stats and forms a table
function getBasePreviewStats(classname) {
    if (!classdata.hasOwnProperty(classname)) {
        return null;
    }
    var baselevels = ["F", "E", "E+", "D", "D+", "C", "C+", "B", "B+", "A", "A+"];
    var statnames = statindex;
    var ret = '<table id="stattable"><tr>';
    for (var s=0; s<statnames.length; s++) {
        ret += '<th id="stathead">'+statnames[s]+'</th>';
    }
    ret += '</tr><tr>';
    var basestat;
    for (var x=0; x<statnames.length; x++) {
        if (x<7) {
            basestat = Math.floor((classdata[classname].stats[x])/3);
            ret += '<td id="statdisplay">'+baselevels[basestat]+'</td>';
        }
        else if (x == 7) {
            basestat = (classdata[classname].stats[x])-6;
            ret += '<td id="statdisplay">'+baselevels[basestat]+'</td>';
        }
        else {
            basestat = (classdata[classname].stats[x])*2-1;
            ret += '<td id="statdisplay">'+baselevels[basestat]+'</td>';
        }
    }
    return ret+"</tr></table>";
}

// For changing the base stats of each character at the select screen
function changestats() {
    var stattext = document.getElementById("statwindow1");
    var statselector = document.getElementById("classselect");
    var job = statselector.classname.value;
    stattext.innerHTML = getBasePreviewStats(job);
}

// Assign character
function spawnCharacter() {
    var basestats = classdata[job].stats;
    hp = basestats[0];
    basehp = basestats[0];
    sp = 100;
    basesp = 100;
    stamina = basestats[7]*100;
    basestamina = basestats[7];
    // These are the base stats!
    atk = basestats[1];
    def = basestats[2];
    sa = basestats[3];
    heal = basestats[4];
    sd = basestats[5];
    spd = basestats[6];
    // Give the character basic armour
}

// Class Confirmation
function confirmclass() {
    var statselector = document.getElementById("classselect");
    var job = statselector.classname.value;
    if (confirm("You selected the "+job+" class. Are you sure?")) {
        job = statselector.classname.value;
        spawnCharacter();
    }
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
