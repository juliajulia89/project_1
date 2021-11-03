const audio = new Audio("./sound/indiana_jones.mp3");

const buildDom = (html) => {
  const main = document.querySelector("main");
  main.innerHTML = html;
};

// First Screen => Splash Screen
const buildSplashScreen = () => {
  buildDom(`
  <section class = "splash screen">
  <h1>FIND ATLANTIS</h1>
        <p> 
            The success of the mission depends on you, don't f*** it up! <br>
            Dr. Henry Walton aka Indiana Jones has left you some tips on how to find the long lost city of Atlantis. <br>
            Pirates are out to kill you. Collect treasures to improve your score. <br>
            You've got 20 seconds.  
        </p>
  <button class= "buttons" id ="start-button" > Let's go! </button>
  </section>
  `);

  const startButton = document.getElementById("start-button");
  startButton.addEventListener("click", buildGameScreen);
};

// Second Screen => Game Screen
const buildGameScreen = () => {
  buildDom(`
  <section class = "game screen">
  <div id="game-board">
  <h2 class="timer">Time left: 20<h2>
  <canvas id="canvas" width="1200" height="600" ></canvas>
  </div>  
  </section>
  `);

  audio.play();
  //<button class="buttons" id="quit-button"> Quit Game</button>
  //const quitButton = document.getElementById("quit-button");
  //quitButton.addEventListener("click", buildGameOver);

  const game = new Game();
  game.start();
};

// Third Screen => Game Over
const buildGameOver = () => {
  buildDom(`
  <section class="game-over">
 <h1>You are no Indian Jones</h1>
        <p> 
        </br>
            Be faster and smarter next time. 
        </p>
  <button class = "buttons" id = "loose-button"> TRY AGAIN</button>
  <div class= "pointer"> </div>
  </section>
  `);

  audio.pause();

  const looseButton = document.getElementById("loose-button");
  looseButton.addEventListener("click", buildGameScreen);
};

// Forth Screen => Game Won
const buildGameWon = () => {
  buildDom(`
  <section class="game-won">
 <h1>You are the next Indian Jones</h1>
        <p> 
        </br>
            congrats 
        </p>
  <button class = "buttons" id = "improve-button">improve</button>
  <div class= "pointer"> </div>
  </section>
  `);

  audio.pause();
  const improveButton = document.getElementById("improve-button");
  improveButton.addEventListener("click", buildGameScreen);
};

// When the window loads, then we will run the "buildSplashScreen" function
// "load" waits for the html and JS
window.addEventListener("load", buildSplashScreen);
