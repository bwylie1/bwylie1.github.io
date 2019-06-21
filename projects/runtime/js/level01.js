var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            name: "Robot Romp",
            number: 1, 
            speed: -3,
            gameItems: [
                {type: 'sawblade',x:400,y:groundY},
                {type: 'sawblade',x:600,y:groundY-110},
                {type: 'sawblade',x:900,y:groundY},
                {type: 'sawblade',x:1300,y:groundY-30},
                {type: 'box',x:2500,y:400},
                {type: 'box',x:1500,y:groundY},
                {type: 'box',x:2000,y:groundY},
                {type: 'enemy',x:2000,y:groundY - 50},
                {type: 'enemy',x:1000,y:groundY - 50},
                {type: 'enemy',x:500,y:groundY - 50},
                {type: 'enemy',x:2500,y:groundY - 50},
                {type: 'enemy',x:2600,y:groundY - 60},
                {type: 'enemy',x:2700,y:groundY - 40},
                {type: 'boss',x:2900,y:groundY - 40},
                {type: 'trophy',x:3000,y:groundY - 170}
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // BEGIN EDITING YOUR CODE HERE
        function createSawBlade(x,y) {
            var hitZoneSize = 25;
            var damageFromObstacle = 10;           
            var myObstacle = game.createObstacle(hitZoneSize,damageFromObstacle);
            myObstacle.x = x;
            myObstacle.y = y;
            game.addGameItem(myObstacle); 
            var obstacleImage = draw.bitmap('img/sawblade.png');
            myObstacle.addChild(obstacleImage);
            obstacleImage.x = -25;
            obstacleImage.y = -25;
            myObstacle.rotationalVelocity = -100;
            myObstacle.onPlayerCollision = function() {
                myObstacle.fadeOut();
                game.changeIntegrity(-10);
            };
            myObstacle.onProjectileCollision = function() {
                game.increaseScore(10);
                myObstacle.fadeOut();
            };
        }  
        
        
        
        for (var i = 0; i < levelData.gameItems.length; i++) {
            var gameItem = levelData.gameItems[i];
            // Create a sawblade using the .x and .y property of each game item object
            if (gameItem.type === 'sawblade') {
                createSawBlade(gameItem.x,gameItem.y);
            }
            else if (gameItem.type === 'box') {
                createBox(gameItem.x, gameItem.y);
            }
            else if (gameItem.type === 'enemy') {
                createEnemy(gameItem.x,gameItem.y);
            }
            else if (gameItem.type === 'trophy') {
                createReward(gameItem.x,gameItem.y);
            }
            else if (gameItem.type === 'boss') {
                createBoss(gameItem.x,gameItem.y);
            }
        }
        
        
        
        function createBox(x,y) {
            var hitZoneSize = 50;
            var damageFromObstacle = 20;           
            var myObstacle = game.createObstacle(hitZoneSize,damageFromObstacle);
            myObstacle.x = x;
            myObstacle.y = y;
            game.addGameItem(myObstacle); 
            var obstacleImage = draw.bitmap('img/sawblade.1.png');
            myObstacle.addChild(obstacleImage);
            obstacleImage.x = -50;
            obstacleImage.y = -50;
            myObstacle.rotationalVelocity = -100;
            myObstacle.onPlayerCollision = function() {
                myObstacle.fadeOut();
                game.changeIntegrity(-10);
            };
            myObstacle.onProjectileCollision = function() {
                game.increaseScore(50);
                myObstacle.fadeOut();
            };
        };
        
        
        
        function createEnemy(x,y) {
            var enemy =  game.createGameItem('enemy',25);
            var redSquare = draw.rect(50,50,'red');
            redSquare.x = -25;
            redSquare.y = -25;
            enemy.addChild(redSquare);
            enemy.x = x;
            enemy.y = y;
            game.addGameItem(enemy);
            enemy.velocityX = -1;
            enemy.rotationalVelocity = 10;
            enemy.onPlayerCollision = function() {
                console.log('The enemy has hit Halle');
                game.changeIntegrity(-10);
                enemy.fadeOut();
            };
            enemy.onProjectileCollision = function() {
                game.increaseScore(100);
                enemy.fadeOut();
            };
        }
        
        function createBoss(x,y) {
            var boss =  game.createGameItem('boss',50);
            var redSquare = draw.rect(100,100,'red');
            redSquare.x = -50;
            redSquare.y = -50;
            boss.addChild(redSquare);
            boss.x = x;
            boss.y = y;
            game.addGameItem(boss);
            boss.velocityX = -1;
            boss.rotationalVelocity = -20;
            boss.onPlayerCollision = function() {
                console.log('The boss has hit Halle');
                game.changeIntegrity(-1000);
            };
            boss.onProjectileCollision = function() {
                boss.fadeOut();
                game.increaseScore(1000);
            };
        }
        
        
        
        
        function createReward(x,y) {
            var trophy =  game.createGameItem('trophy',50);
            var obstacleImage = draw.bitmap('img/trophy.png');
            obstacleImage.x = -50;
            obstacleImage.y = -50;
            trophy.addChild(obstacleImage);
            trophy.x = x;
            trophy.y = y;
            game.addGameItem(trophy);
            trophy.velocityX = -1;
            trophy.onPlayerCollision = function() {
                console.log('The trophy has been collected');
                game.increaseScore(10000);
                trophy.fadeOut();
            };
        } 
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}