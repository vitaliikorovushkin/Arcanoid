var lives = 0; //amount of lives
var level = 0; //current level
var points = 0;

var r = 0;                            //starting radius-vector of the ball
var a = (Math.random()*70+10)*Math.PI //starting angle of direction of the ball
var dr = 10                           //incrementation of radius-vector
var delay = 40;
var timer = 0;
var bx = 0; //cartesian factors
var by = 0;

function loadGame(){
    pad.style.top = field.clientHeight-12+"px"
}

function movePad(event){
    event = event || window.event;
    if( !(event.clientX<field.style.left + 3 ||
         event.clientX>field.clientWidth - pad.clientWidth + 3) ){
        pad.style.left = event.clientX + "px";
    }
}

function moveBall(){
    ball.style.left = r * Math.cos(a) + bx + "px";
	ball.style.top = r * Math.sin(a) + by + "px";
	
	// right edge
	if(r * Math.cos(a) + bx > field.clientWidth - ball.clientWidth){
		bx = Math.abs(r * Math.cos(a) + bx);
		by = Math.abs(r * Math.sin(a) + by);
		a = Math.PI - a;
		r = 0;
	}
	// left edge
	else if(r * Math.cos(a) + bx < field.style.left){
		bx = Math.abs(r * Math.cos(a) + bx);
		by = Math.abs(r * Math.sin(a) + by);
		a = Math.PI - a;
		r = 0;
	}
	// top edge
	else if(r * Math.sin(a) + by < field.style.top){
		bx = Math.abs(r * Math.cos(a) + bx);
		by = Math.abs(r * Math.sin(a) + by);
		a = 2 * Math.PI - a;
		r = 0;
	}
    // bottom edge
	else if(r * Math.sin(a) + by > field.clientHeight - ball.clientHeight ){
		var ballCenter = parseFloat(ball.style.left) + ball.clientWidth / 2;
		var lpad = parseFloat(pad.style.left);
		var rpad = parseFloat(pad.style.left) + pad.clientWidth;
		if(ballCenter > lpad && ballCenter < rpad){	// hit the ball
			bx = Math.abs(r * Math.cos(a) + bx);
			by = Math.abs(r * Math.sin(a) + by);
			a = 2 * Math.PI - a;
			r = 0;
			points++;
			if( points != 0 && points % 10 == 0){
				level++;
				dr += 5;
			}
		}
		else						// miss the ball
		{
			ball.style.left = 0 + "px";
			ball.style.top = 0 + "px";
			lives--;
			bx = by = r = 0;
			if(lives == 0){
				alert('Game Over!');
				clearInterval(timer);
				points = lives = level = 0;
				dr = 10;
				btnNewGame.disabled = false;
			}
		}
	}

	scoreID.innerText = points;
	livesID.innerText = lives;
	levelID.innerText = level;
	r += dr;
}

function newGame(){
    if(timer == 0){
        clearInterval(timer);
    }
    timer = setInterval('moveBall()', delay);
    lives = 3;
    level = 1;
    points = 0;
    btnNewGame.disabled = true;
}

function pauseGame(){
    if(timer != 0){
        if(btnPlayPause.innerText == 'Pause'){
            clearInterval(timer);
            btnPlayPause.innerText = 'Play';
        }
        else{
            timer = setInterval('moveBall()', delay)
            btnPlayPause.innerText = 'Pause';
        }
    }
}



