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

);
