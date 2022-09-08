// Function to get category data from form
const getCategories = function() {
  let cat = {};
  cat.mainCatOne = document.getElementById("mainCategoryOne").value;
  cat.subCatOne = document.getElementById("subCategoryOne").value.split(", ");
  cat.mainCatTwo = document.getElementById("mainCategoryTwo").value;
  cat.subCatTwo = document.getElementById("subCategoryTwo").value.split(", ");
  return cat;
};

// Function to get value position from form
const getValuePosition = function() {
  return document.getElementById("valuePosition").value;
};

// Function to pull data
const pullOptions = function() {
  // Pushes pulled form data into master data array
  data.push(getCategories());
  data.push(getValuePosition());
  console.log(data);
};

// Function to check if data was filled out
const filledOut = function() {
  let inputs = document.getElementsByClassName("userInput");
  let complete = true;
  for (let i = 0; i < inputs.length; i++) { // Loop through form to see if any inputs are blank
    if (inputs[i].value === "") { // If any input is incomplete, visually show
      inputs[i].classList.add("incomplete");
      complete = false;
    }
  }
  return complete; // Return if form is complete
};

// Function to call functions to check form and pull from it
const checkForm = function() {
  if (filledOut()) {
    pullOptions(); // If the form is completed, pull data from inputs
  } else {
    console.log("Incomplete Form");
  }
}

let data = []; // Array containing all data about bar chart

// Onloads so html file is loaded first before listening
window.onload = function() {
  document.getElementById("generate").addEventListener("click", function() {checkForm()}); // Listens for the generate button to be clicked and calls check form function
};