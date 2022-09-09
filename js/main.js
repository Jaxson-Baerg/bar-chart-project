// Function to get category data from form
const getCategories = function() {
  let cat = {};
  cat.mainCatOne = document.getElementById("mainCategoryOne").value;
  cat.subCatOne = document.getElementById("subCategoryOne").value.split(", ");
  cat.mainCatTwo = document.getElementById("mainCategoryTwo").value;
  cat.subCatTwo = document.getElementById("subCategoryTwo").value.split(", ");
  return cat;
};

// Function to get category values
const getCategoryValues = function() {
  let categoryValues = document.getElementById("categoryValues").value.split(", ");
  for (let i = 0; i < categoryValues.length; i++) {
    categoryValues[i] = Number(categoryValues[i]);
  }
  return categoryValues;
};

// Function to get values of scale
const getScaleValue = function() {
  return Number(document.getElementById("scaleValue").value);
};

// Function to get scale by value, less than max scale value
const getScaleByValue = function() {
  return Number(document.getElementById("scaleByValue").value);
};

// Function to get value position from form
const getValuePosition = function() {
  return document.getElementById("valuePosition").value;
};

// Function to get width of bars
const getBarWidth = function() {
  return Number(document.getElementById("barWidth").value);
};

// Function to get height of bars
const getBarHeight = function() {
  return Number(document.getElementById("barHeight").value);
};

// Function to get spacing of bars
const getBarSpacing = function() {
  return Number(document.getElementById("barSpacing").value);
};

// Function to get color of bars
const getBarColour = function() {
  return document.getElementById("barColour").value;
};

// Function to get size of font for labels
const getFontSize = function() {
  return Number(document.getElementById("fontSize").value);
};

// Function to get color of font for labels
const getFontColour = function() {
  return document.getElementById("fontColour").value;
};

// Function to pull data
const pullOptions = function() {
  options = [];
  data = []
  // Pushes pulled form data into master data array
  options.push(getCategories());
  data.push(getCategoryValues());
  options.push(getScaleValue());
  options.push(getScaleByValue());
  options.push(getValuePosition());
  options.push(getBarWidth());
  options.push(getBarHeight());
  options.push(getBarSpacing());
  options.push(getBarColour());
  options.push(getFontSize());
  options.push(getFontColour());
  console.log(options); // Test output
  console.log(data);
};

// Function to check if data was filled out
const filledOut = function() {
  let inputs = document.getElementsByClassName("mandatoryInput");
  let complete = true;
  for (let i = 0; i < inputs.length; i++) { // Loop through form to see if any inputs are blank
    if (inputs[i].value === "") { // If any input is incomplete, visually show
      inputs[i].classList.add("incomplete"); // Add class with animation
      setInterval(function() {inputs[i].classList.remove("incomplete")}, 3000); // Remove class with animation
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

let options = []; // Array containing all custome options about bar chart
let data = []; // Array containing data for bar chart

// Onloads so html file is loaded first before listening
window.onload = function() {
  document.getElementById("generate").addEventListener("click", function() {checkForm()}); // Listens for the generate button to be clicked and calls check form function
};