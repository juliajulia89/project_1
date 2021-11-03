// General function that will update the HTML content dinamically
const audio = new Audio("./sound/indiana_jones.mp3");

const buildDom = (html) => {
  const main = document.querySelector("main");
  main.innerHTML = html;
};
// const themeAudio = new Audio("sound/indiana_jones.mp3");
// First Screen => Splash Screen
const buildSplashScreen = () => {
  buildDom(`
  <section class = "splash screen">
  <h1>FIND ATLANTIS</h1>
        <p> 
            The success of the mission depends on you! 
            Dr. Henry Walton aka Indiana Jones left you some tips on how to find the long lost Atlantis.
            You have 20 seconds to get past your enemies. 
            Avoid the obstacles and collect golden coins on the way to get extra time. 
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
  
  <canvas id="canvas" width="1000" height="500" ></canvas>
  
  </div>  
  <button class="buttons" id="quit-button"> Quit Game</button>
  </section>
  `);
  audio.play();
  //new Audio("./sound/indiana_jones.mp3").play();
  const quitButton = document.getElementById("quit-button");
  quitButton.addEventListener("click", buildGameOver);

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
  console.log("won");
  audio.pause();
  const improveButton = document.getElementById("improve-button");
  improveButton.addEventListener("click", buildGameScreen);
};

// When the window loads, then we will run the "buildSplashScreen" function
// "load" waits for the html and JS
window.addEventListener("load", buildSplashScreen);
//
