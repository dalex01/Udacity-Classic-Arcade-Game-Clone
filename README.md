# Classic Arcade Game Clone

## About the project

You was provided visual assets and a game loop engine; using these tools you add a number of entities to the game including the player characters and enemies to recreate the classic arcade game Frogger. All was done using JavaScript’s object oriented programming features.

## Requirement

Project was reviewed according to this [rubric](http://i.imgur.com/6qFLn8r.png).
Game is optimized for the screens with Y resolution (height) not less than 1080 pixels.

## How to use

* download all game files locally with command `git clone https://github.com/dalex01/fend-arcade-game.git` and start index.html file
* or simply go to start page and play: http://dalex01.github.io/fend-arcade-game/

To choose character press number from 1 to 5

## Movement

To move press up, down, left or right arrows

## Items

* Maximum number of items on the field is 4
* All items except Rock could be collected
* All collectable items except Heart give you +1 point to appropriate item score
* Heart give you one more life (total number of life could not be more than 5)
* Collide with Rock reduce you life

## Water

After you reach water you earn one point to water score and start from random location from the grass

## Enemies

* Bugs - is your enemies
* They are moved from left to right with ramdom speed
* Collide with bugs reduce your life
* After collision you will start from random location on the grass

## Purpose

To collect each type of item 3 times and to reach water 3 times

## Tips

Remember that Rock could be removed from field only after collision with player.
Rock holds one item place on the field. So it is possible that 4 Rocks will be placed on the field and you could not collect any items. So you should you life to remove Rocks.
Hearts give you new life if you have less that 5. It is usefull keep Hearts on the field until you have one-two life or you want to remove Rock from the field.

# Repository

* index.html: The main HTML document. Contains links to all of the CSS and JS resources needed to render the game.
* README.md: The GitHub readme file.
* css/style.css: Contains all of the CSS needed to style the page.
* images/...:  Image files, which are used when displaying the game. The images for the player and enemy character are going to be loaded from this folder.
* js/app.js: Contains all objects required for game.
* js/engine.js: Engine needed to run the game.
* js/resources.js: Contain resources library.
