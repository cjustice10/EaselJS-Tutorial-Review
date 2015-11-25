// This was the version used for the video

"use strict";

// ===== Variables =====
var canvas;
var stage;
var ball;
var paddleLeft;
var paddleRight;
var message;
var leftScore;
var rightScore;


var init = function() {

	//!!! Initialize DisplayObject elements here !!!

	canvas = document.getElementById("gameCanvas");
	stage = new createjs.Stage(canvas);

	ball = new createjs.Shape();
	ball.speedX = 15;
	ball.speedY = 15;
	paddleLeft = new createjs.Shape();
	paddleLeft.speedY = 0;
	paddleRight = new createjs.Shape();
	paddleRight.speedY = 0;

	ball.radius = 15;
	ball.graphics.beginFill("#a4ff24").drawCircle(0, 0, ball.radius);
	ball.x = canvas.width / 2;
	ball.y = canvas.height / 2;
	
	paddleLeft.width = 20;
	paddleLeft.height = 100;
	paddleLeft.graphics.beginFill("#a4ff24").drawRoundRect(paddleLeft.x, paddleLeft.y, paddleLeft.width, paddleLeft.height, 5);
	paddleLeft.x = 40;
	paddleLeft.y = 200;
	
	paddleRight.width = 20;
	paddleRight.height = 100;
	paddleRight.graphics.beginFill("#a4ff24").drawRoundRect(paddleRight.x, paddleRight.y, paddleRight.width, paddleRight.height, 5);
	paddleRight.x = 840;
	paddleRight.y = 200;

	leftScore = 0;
	rightScore = 0;

	intro();

}

var intro = function() {

	//!!! Create intro message here !!!
	message = new createjs.Text("Welcome. Click to play", "bold 32px Arial", "#a4ff24");
	message.textAlign = "center";
	message.textBaseAlign = "middle";
	message.x = canvas.width / 2;
	message.y = canvas.height / 2;
	stage.addChild(message);
	stage.update();

	//!!! Set up initial behavior !!!
	canvas.onlick = start;
}

var start = function() {

	//!!! Start the game here !!!
	stage.removeChild(message);
	stage.addChild(ball);
	stage.addChild(paddleLeft);
	stage.addChild(paddleRight);
	stage.update();
	createjs.Ticker.addEventListener("tick", update);
}

// Hande keydown events
$(document).keydown(function(event){
		if(event.which == 87) { //W
		 	paddleLeft.speedY = -9;
		}

		if(event.which == 83) { //S
			paddleLeft.speedY = 9;
		}

		if(event.which == 38) { //Up Arrow
		 	paddleRight.speedY = -9;
		}

		if(event.which == 40) { //Down Arrow
			paddleRight.speedY = 9;
		}
});

// Handle keyup events
$(document).keyup(function(event){
		if(event.which == 87) { //W
		 	paddleLeft.speedY = 0;
		}

		if(event.which == 83) { //S
			paddleLeft.speedY = 0;
		}

		if(event.which == 38) { //Up Arrow
		 	paddleRight.speedY = 0;
		}

		if(event.which == 40) { //Down Arrow
			paddleRight.speedY = 0;
		}
});

// Resets the ball and paddles to their starting location
var reset = function() {
	ball.x = canvas.width / 2;
	ball.y = canvas.height / 2;
	paddleLeft.x = 40;
	paddleLeft.y = 200;
	paddleRight.x = 840;
	paddleRight.y = 200;	
}

// Ends the game and displays who won
var end = function() {

	stage.removeChild(ball);
	stage.removeChild(paddleLeft);
	stage.removeChild(paddleRight);
	stage.addChild(message);

	if(leftScore == 5) {
		message.text = "Player 1 Wins!";
	} else {
		message.text = "Player 2 Wins!";
	}

	stage.update();
}

// Update method with collision detection
 var update = function(event) {
	ball.x += ball.speedX;
	ball.y += ball.speedY;


	if((ball.y - ball.radius) <= 0 || (ball.y + ball.radius) >= canvas.height) {
		ball.speedY *= -1;
	}

	if(ball.x - ball.radius <= paddleLeft.x + paddleLeft.width &&
		ball.x + ball.radius >= paddleLeft.x &&
		ball.y + ball.radius >= paddleLeft.y &&
		ball.y - ball.radius <= paddleLeft.y + paddleLeft.height
	) {
		ball.speedX *= -1;
	}

	if(ball.x - ball.radius <= paddleRight.x + paddleRight.width &&
		ball.x + ball.radius >= paddleRight.x &&
		ball.y + ball.radius >= paddleRight.y &&
		ball.y - ball.radius <= paddleRight.y + paddleRight.height
	) {
		ball.speedX *= -1;
	}


	if(paddleLeft.y + paddleLeft.speedY >= 0 &&
		paddleLeft.y + paddleLeft.height + paddleLeft.speedY <= canvas.height
	) {
		paddleLeft.y += paddleLeft.speedY;
	}

	if(paddleRight.y + paddleRight.speedY >= 0 &&
		paddleRight.y + paddleRight.height + paddleRight.speedY <= canvas.height
	) {
		paddleRight.y += paddleRight.speedY;
	}


	if(ball.x - ball.radius <= 0) {
		rightScore++;
		reset();
	}

	if(ball.x + ball.radius >= canvas.width) {
		leftScore++;
		reset();
	}

	if(leftScore == 5 || rightScore == 5) {
		end();
	}

	stage.update();
};



