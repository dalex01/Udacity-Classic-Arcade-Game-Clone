// app.js
// This file provides the main objects of the game and all
// their properties. In this file is described the following
// objects:
// Enemy - players enemy
// Player - character who plays the game
// Item - different recourses appear on the field
// Score - score of the game and usefull information

// ObjectOnField class that position some object on the field
var ObjectOnField = function(x, y) {
    'use strict';
    // Initial position of object
    this.sprite = '';
    this.x = x;
    this.y = y;
};

// Draw the object on the screen, required method for game
ObjectOnField.prototype.render = function() {
    'use strict';
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Enemies our player must avoid
var Enemy = function(x, y) {
    'use strict';
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    ObjectOnField.call(this, x, y);

    this.sprite = 'images/enemy-bug.png';
    // Initial speed of enemy (random number from the interval)
    this.speed = getRandomInt(50,400);
};

Enemy.prototype = Object.create(ObjectOnField.prototype);
Enemy.prototype.constructor = Enemy;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    'use strict';
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed*dt;
    // Set new speed and new x position if enemy goes out from the screen
    this.speed = this.x > 700 ? getRandomInt(50,400) : this.speed;
    this.x = this.x > 700 ? getRandomInt(-100,-200) : this.x;
};

// Draw the enemy on the screen, required method for game
//Enemy.prototype.render = function() {
//    'use strict';
//    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
//};

// Our player class
var Player = function(x, y) {
    'use strict';
    
    ObjectOnField.call(this, x, y);
    // Initial player image
    this.sprite = 'images/char-boy.png';
    // Initial number of player life
    this.life = 5;
    // INitial state for flag if player win or game still continues
    this.win = false;
};

Player.prototype = Object.create(ObjectOnField.prototype);
Player.prototype.constructor = Player;

// Update the players's position
// Actually function is not required as all movements are handled by handleInput function
//Player.prototype.update = function() {
//};

// Draw the player on the screen, required method for game
//Player.prototype.render = function() {
//    'use strict';
//    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
//};

// Handle input for player
// All movements and character image changes are implemented in this function
Player.prototype.handleInput = function(input) {
    'use strict';
    // Skip if input is incorrect or player is dead or player win
    if(!input || this.life === 0 || this.win) return;

    // Data structures for movement and player images
    var moveX = {
        'left': -100,
        'right': 100
    };
    var moveY = {
        'up': -85,
        'down': 85
    };
    var images = {
        '1': 'images/char-boy.png',
        '2': 'images/char-cat-girl.png',
        '3': 'images/char-horn-girl.png',
        '4': 'images/char-pink-girl.png',
        '5': 'images/char-princess-girl.png',
    };

    // Move player if some arrow is pressed
    if (input == 'up' || input == 'down' || input == 'left' || input == 'right') {
        // Move x direction
        // ... || 0 operator is used if we actually move y direction
        this.x += moveX[input] || 0;
        // Move y direction
        // ... || 0 operator is used if we actually move x direction
        this.y += moveY[input] || 0;
        // Set win if we reach water
        this.win = this.y < 0 ? true : false;
        // Does not allow player to move out of screen
        this.x = this.x < 0 ? 0 : this.x;
        this.y = this.y < 0 ? 563 : this.y;
        this.x = this.x > 600 ? 600 : this.x;
        this.y = this.y > 563 ? 563 : this.y;
    // Change player image if number from 1 to 5 is pressed
    } else if (input == '1' || input == '2' || input == '3' || input == '4' || input == '5') {
        this.sprite = images[input];
    }
};

// Class for item (resource) shown on the field
var Item = function(x, y) {
    'use strict';
    // Data structure of available items
    var itemImages = [
            'images/gem-blue.png',
            'images/gem-orange.png',
            'images/gem-green.png',
            'images/Heart.png',
            'images/Key.png',
            'images/Rock.png',
            'images/Selector.png',
            'images/Star.png'
           ];

    // Data structure of available items and their types
    var itemImagesType = {
            'images/gem-blue.png': 'blueGem',
            'images/gem-orange.png': 'orangeGem',
            'images/gem-green.png': 'greenGem',
            'images/Heart.png': 'heart',
            'images/Key.png': 'key',
            'images/Rock.png': 'rock',
            'images/Selector.png': 'selector',
            'images/Star.png': 'star'
           };

    ObjectOnField.call(this, x, y);

    // Set initial image of item
    // Random value from appropriate data structure
    this.sprite = itemImages[getRandomInt(0,7)];
    // Set type of item in accordance with its image set before
    this.type = itemImagesType[this.sprite];
    // Flag was item collected by player or not
    this.collide = false;
    // Area in the field to display item
    // The field is devided by for areas:
    // - upper left corner - 3x3 area - pos = 1
    // - upper right corner - 4x3 area - pos = 2
    // - bottom left corner - 3x3 area - pos = 3
    // - bottom right corner - 4x3 area - pos = 4
    // Inital pos is 0. It is set immidiatly after creation of item
    this.pos = 0;
    // Timer that is set in not 0 value if item was collected
    // It represent how much ticks new item should not appear on field after collecting
    this.timer = 0;

};

Item.prototype = Object.create(ObjectOnField.prototype);
Item.prototype.constructor = Item;

// Random choose of items image
Item.prototype.newSprite = function() {
    'use strict';
    // Data structure from which item is choosen
    var itemImages = [
            'images/gem-blue.png',
            'images/gem-orange.png',
            'images/gem-green.png',
            'images/Heart.png',
            'images/Key.png',
            'images/Rock.png',
            'images/Selector.png',
            'images/Star.png'
           ];
    // Random set of item image
    this.sprite = itemImages[getRandomInt(0,7)];
};

// Setting of item type in accordance to its image
Item.prototype.newType = function() {
    'use strict';
    // Data structure from which type is choosen
    var itemImagesType = {
            'images/gem-blue.png': 'blueGem',
            'images/gem-orange.png': 'orangeGem',
            'images/gem-green.png': 'greenGem',
            'images/Heart.png': 'heart',
            'images/Key.png': 'key',
            'images/Rock.png': 'rock',
            'images/Selector.png': 'selector',
            'images/Star.png': 'star'
           };
    // Set items type
    this.type = itemImagesType[this.sprite];
};

// Update item image, type and position if it was collected
Item.prototype.update = function(dt) {
    'use strict';
    // Perform only if item was collected (collide with player)
    if (this.collide) {
        // Set number of ticks after which new item will be shown
        console.log(dt);
        this.timer = 100;
        // Set flag that new item is not collected yet
        this.collide = false;
        // Set new image, appropriate type and random position in appropriate area
        if (this.pos == 1) {
            this.newSprite();
            this.newType();
            this.x = getRandomInt(0,2)*100;
            this.y = 60+getRandomInt(0,2)*83;
        } else if (this.pos == 2) {
            this.newSprite();
            this.newType();
            this.x = getRandomInt(3,6)*100;
            this.y = 60+getRandomInt(0,2)*83;
        } else if (this.pos == 3) {
            this.newSprite();
            this.newType();
            this.x = getRandomInt(0,2)*100;
            this.y = 60+getRandomInt(3,5)*83;
        } else if (this.pos == 4) {
            this.newSprite();
            this.newType();
            this.x = getRandomInt(3,6)*100;
            this.y = 60+getRandomInt(3,5)*83;
        }
    }
    // If timer is not 0 - tick
    if (this.timer) {
        this.timer -= 1;
    }
};

// Draw the item on the screen
Item.prototype.render = function() {
    'use strict';
    // If timer is 0 - draw
    if (!this.timer) {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};

// Class to draw score on all related inforamtion
var Score = function() {
    'use strict';
    // Initial values for:
    // - collected items (zero at the start)
    // - number of times water was reached (zero at the start)
    // - players life (5 at the start)
    this.score = {
        'blueGem' : 0,
        'orangeGem' : 0,
        'greenGem' : 0,
        'key' : 0,
        'selector' : 0,
        'star' : 0,
        'waterReached' : 0,
        'life' : 5
    };
    // Flag if player win or not
    this.win = false;
    // Flag if player lose (life is zero) or not
    this.lose = false;
};

// Add score to item with appropriate type if it was collected
Score.prototype.addScore = function(type) {
    'use strict';
    this.score[type] += 1;
};

// Clear all score area. This function is invoked each tick
// It is analog of update functions in other classes
// It is called so for more clearness of its usage
Score.prototype.clearScore = function() {
    'use strict';
    ctx.clearRect(20, 750, 750, 250);
    ctx.clearRect(5, 20, 750, 30);
};

// Draw all score area
Score.prototype.render = function() {
    'use strict';
    // Draw all items if player is not win and not lose (if game continues)
    if(!this.lose && !this.win) {

        // Draw tip at the top of the field
        ctx.lineWidth = 1;
        ctx.font = "24px Arial";
        ctx.fillText("To Win: collect 3 resources of each type and reach water 3 times",5,40);

        // Draw options to choose character
        // Charaters could be choosen by appropriate number pressing
        // So we draw here a number and an image of appropriate character after it
        ctx.font = "30px Arial";
        ctx.fillText("Choose character: ",20,790);
        ctx.font = "24px Arial";
        ctx.fillText("1-",310,790);
        ctx.drawImage(Resources.get('images/char-boy-small.png'), 330, 730);
        ctx.fillText("2-",390,790);
        ctx.drawImage(Resources.get('images/char-cat-girl-small.png'), 410, 730);
        ctx.fillText("3-",470,790);
        ctx.drawImage(Resources.get('images/char-horn-girl-small.png'), 490, 730);
        ctx.fillText("4-",550,790);
        ctx.drawImage(Resources.get('images/char-pink-girl-small.png'), 570, 730);
        ctx.fillText("5-",630,790);
        ctx.drawImage(Resources.get('images/char-princess-girl-small.png'), 650, 730);

        // Draw all available types of items in the game
        ctx.drawImage(Resources.get('images/gem-blue-small.png'), 20, 860);
        ctx.drawImage(Resources.get('images/gem-orange-small.png'), 140, 860);
        ctx.drawImage(Resources.get('images/gem-green-small.png'), 260, 860);
        ctx.drawImage(Resources.get('images/Star-small.png'), 380, 860);
        ctx.drawImage(Resources.get('images/Selector-small.png'), 500, 855);
        ctx.drawImage(Resources.get('images/Key-small.png'), 620, 860);
        // Draw number of collected items for each type
        ctx.fillText(this.score.blueGem,37,965);
        ctx.fillText(this.score.orangeGem,157,965);
        ctx.fillText(this.score.greenGem,277,965);
        ctx.fillText(this.score.star,397,965);
        ctx.fillText(this.score.selector,517,965);
        ctx.fillText(this.score.key,637,965);

        // Draw number of times water was reached
        ctx.font = "30px Arial";
        ctx.fillText("Water reached: ",20,850);
        ctx.fillText(this.score.waterReached,230,850);

        // Draw number of player life
        ctx.fillText("Life: ",320,850);
        for (var i = 0; i < this.score.life; i++) {
            ctx.drawImage(Resources.get('images/Heart-small.png'), 400 + i*50, 800);
        }
    // Draw congrutalaion message if player win
    } else if (this.win) {
        ctx.lineWidth = 1;
        ctx.font = "24px Arial";
        ctx.fillText("F5 to start new game",250,40);
        ctx.font = "80px Arial";
        ctx.fillText("Congratulations!",60,850);
        ctx.fillText("You Win!",200,950);
    // Draw message if player lose
    } else if (this.lose) {
        ctx.lineWidth = 1;
        ctx.font = "24px Arial";
        ctx.fillText("F5 to start new game",250,40);
        ctx.font = "120px Arial";
        ctx.fillText("Game Over!",20,850);
    }
};

// Create the player object in a variable called player
var player = new Player(getRandomInt(0,6)*100, 563);

// Create all item objects in an array called allItems
var allItems = [new Item(getRandomInt(0,2)*100, 60+getRandomInt(0,2)*83),
                new Item(getRandomInt(3,6)*100, 60+getRandomInt(0,2)*83),
                new Item(getRandomInt(0,2)*100, 60+getRandomInt(3,5)*83),
                new Item(getRandomInt(3,6)*100, 60+getRandomInt(3,5)*83)];

// Set items pos parameter to show at which area of screen it is shown
for(var i=0, len = allItems.length; i < len; i++) {
    allItems[i].pos = i+1;
}

// Create all enemy objects in an array called allEnemies
var allEnemies = [new Enemy(0, 60),
                  new Enemy(0, 143),
                  new Enemy(0, 226),
                  new Enemy(0, 309),
                  new Enemy(0, 392),
                  new Enemy(0, 475)];

// Create new score for the game
var score = new Score();


// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        49: '1',
        50: '2',
        51: '3',
        52: '4',
        53: '5'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


// Returns a random integer between min (inclusive) and max (inclusive)
// Using Math.round() will give you a non-uniform distribution!
 function getRandomInt(min, max) {
    'use strict';
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
