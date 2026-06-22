const prompt = require("prompt");

// Configure prompt
prompt.message = "";
prompt.delimiter = "";

// Start prompt
prompt.start();


// Ask user for their selection 
prompt.get([
     {
      name: "userSelection",
      description: "Enter your choice (ROCK, PAPER, or SCISSORS): ",
      type: "string",
      required: true,
      conform: (value) => {
        const upper = value.toUpperCase();
        return upper === "ROCK" || upper === "PAPER" || upper === "SCISSORS";
      },
      message: "Please enter ROCK, PAPER, or SCISSORS",
    },
],
 function (err, result) {
    if (err) {
      console.log("\nExiting game. Goodbye!");
      process.exit(0);
    }
 
    // Store user selection (uppercase for consistency)
    const userSelection = result.userSelection.toUpperCase();
 
    // Generate computer selection using Math.random()
    const randomNum = Math.random();
    let computerSelection;
     if (randomNum <= 0.34) {
      computerSelection = "PAPER";
    } else if (randomNum <= 0.67) {
      computerSelection = "SCISSORS";
    } else {
      computerSelection = "ROCK";
    }
     // Display both selections
    console.log("\n--- Game Results ---");
    console.log("Your selection:      " + userSelection);
    console.log("Computer selection:  " + computerSelection);
    console.log("--------------------");
 
    // Determine the winner
    let outcome;
 
    if (userSelection === computerSelection) {
      outcome = "It's a tie!";
    } else if (
      (userSelection === "ROCK" && computerSelection === "SCISSORS") ||
      (userSelection === "PAPER" && computerSelection === "ROCK") ||
      (userSelection === "SCISSORS" && computerSelection === "PAPER")
    ) {
      outcome = "User Wins";
    } else {
      outcome = "Computer Wins";
    }
 
    // Display the outcome
    console.log("Result: " + outcome);
}
    
);
