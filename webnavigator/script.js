const Stack = require("./Stack.js");
const prompt = require("prompt-sync")();
// ------------------------------
// Initialization
// ------------------------------

const backPages = new Stack();
const nextPages = new Stack();

var currentPage = "home page";

// ------------------------------
// Helper Functions
// ------------------------------

function showCurrentPage(action) {
  console.log(action + "\n");
  console.log("Current page: " + currentPage + "\n");
  console.log("Back page: " + backPages.peek() + "\n");
  console.log("Next page: " + nextPages.peek() + "\n");
}

function newPage(page) {
  backPages.push(currentPage);
  currentPage = page;

  // nextPages = new Stack();
  while (!nextPages.isEmpty()) {
    nextPages.pop();
  }

  showCurrentPage("NEW: " + currentPage);
}

function backPage() {
  nextPages.push(currentPage);
  currentPage = backPages.pop();

  showCurrentPage("BACK: " + currentPage);
}

function nextPage() {
  backPages.push(currentPage);
  currentPage = nextPages.pop();

  showCurrentPage("NEXT: " + currentPage);
}

/*
 * The following strings are used to prompt the user
 */
const baseInfo = "\nEnter a url";
const backInfo = "B|b for back page";
const nextInfo = "N|n for next page";
const quitInfo = "Q|q for quit";
const question = "Where would you like to go today? ";

// ------------------------------
// User Interface Part 1
// ------------------------------

//finish, controls the termination of a while loop
var finish = false;
var showBack = false;
var showNext = false;

showCurrentPage("DEFAULT: ");

while (!finish) {
  var instructions = baseInfo;
  if (!backPages.isEmpty()) {
    instructions += ", " + backInfo;
    showBack = true;
  } else {
    showBack = false;
  }

  if (!nextPages.isEmpty()) {
    instructions += ", " + nextInfo;
    showNext = true;
  } else {
    showNext = false;
  }

  instructions += ", " + quitInfo;
  console.log(instructions);

  var answer = prompt(question);
  var lowerCaseAnswer = answer.toLowerCase();

  switch (lowerCaseAnswer) {
    case "b":
      if (showBack) {
        backPage();
      } else {
        console.log("Cannot go back a page. Stack is empty.");
      }
      break;
    case "n":
      if (showNext) {
        nextPage();
      } else {
        console.log("Cannot go to the next page. Stack is empty.");
      }
      break;
    case "q":
      finish = true;
      break;
    default:
      newPage(lowerCaseAnswer);
      break;
  }
}

// ------------------------------
// User Interface Part 2
// ------------------------------
