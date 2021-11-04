const audioIndiana = new Audio("./sound/indiana_jones.mp3");
const audioSplash = new Audio("./sound/splash_screen.mp3");
const buildDom = (html) => {
  const main = document.querySelector("main");
  main.innerHTML = html;
};

// First Screen => Splash Screen
const buildSplashScreen = () => {
  buildDom(`
  <section class = "splash-screen">
  <h1>FIND ATLANTIS</h1>
        <p> 
            The success of the mission depends on you, don't f*** it up!
            Dr. Henry Walton aka Indiana Jones has left you his submarine in order to help you find the long lost city of Atlantis. 
            Watch out for the mermaids, their beauty can be deceitful. Collect treasures to improve your score.
            You've got 20 seconds. Good luck!
        </p>
  <button class= "buttons" id ="start-button" > Let's go! </button>
  </section>
  `);

  audioSplash.play();
  const startButton = document.getElementById("start-button");
  startButton.addEventListener("click", buildGameScreen);
};

// Second Screen => Game Screen
const buildGameScreen = () => {
  buildDom(`
  <section class = "game-screen">
  <h2 class="timer">Time left: 20<h2>
  <h2 class="score">Score: 0<h2>
  <canvas id="canvas" width="1200" height="550" ></canvas>
  </section>
  `);

  audioIndiana.play();
  audioSplash.pause();

  const game = new Game();
  game.start();
};

// Third Screen => Game Over
const buildGameOver = () => {
  buildDom(`
  <section class= "game-over">
 <h1>You are no Indiana Jones</h1>
        <p> 
        </br>
            Be faster and smarter next time. 
        </p>
  <button class = "buttons" id = "loose-button"> KEEP TRYING </button>
 
  </section>
  `);

  audioIndiana.pause();
  audioSplash.pause;

  const looseButton = document.getElementById("loose-button");
  looseButton.addEventListener("click", buildGameScreen);
};

// Forth Screen => Game Won
const buildGameWon = () => {
  buildDom(`
  <section class= "game-won">
 <h1>CONGRATULATIONS</h1>
        <p> 
          You are the next Indiana Jones 
        </p>
  <button class = "buttons" id = "improve-button"> IMPROVE </button>
  </section>
  `);

  audioIndiana.pause();
  audioSplash.pause;
  const improveButton = document.getElementById("improve-button");
  improveButton.addEventListener("click", buildGameScreen);
};

// When the window loads, then we will run the "buildSplashScreen" function
// "load" waits for the html and JS
window.addEventListener("load", buildSplashScreen);
