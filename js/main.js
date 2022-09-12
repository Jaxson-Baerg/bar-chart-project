let options = []; // Array containing all custome options about bar chart
let data = []; // Array containing data for bar chart
let categoryBarColour = {}; // Object containing colours for each bar associated with a category

// Function to get category data from form
const getCategories = function() {
  let cat = {};
  cat.mainCatOne = $("#mainCategoryOne").val();
  cat.subCatOne = $("#subCategoryOne").val().split(", ");
  cat.mainCatTwo = $("#mainCategoryTwo").val();
  cat.subCatTwo = $("#subCategoryTwo").val().split(", ");
  return cat;
};

// Function to get category values
const getCategoryValues = function() {
  let categoryValues = $("#categoryValues").val().split(", ");
  for (let i = 0; i < categoryValues.length; i++) {
    categoryValues[i] = Number(categoryValues[i]);
  }
  return categoryValues;
};

// Function to get values of scale
const getScaleValue = function() {
  return Number($("#scaleValue").val());
};

// Function to get scale by value, less than max scale value
const getScaleByValue = function() {
  return Number($("#scaleByValue").val());
};

// Function to get value position from form
const getValuePosition = function() {
  return $("#valuePosition").val();
};

// Function to get width of bars
const getBarWidth = function() {
  return Number($("#barWidth").val());
};

// Function to get height of bars
const getBarHeight = function() {
  return Number($("#barHeight").val());
};

// Function to get spacing of bars
const getBarSpacing = function() {
  return Number($("#barSpacing").val());
};

// Function to create pickers for colour of bars
const createBarColourPicker = function() {
  let cats = options[0].subCatOne;
  const form = $("#colourization");

  // Clear out previously added colour pickers to form for fresh start
  $(".colourPickers").remove();

  // Define and append header for pickers
  form.append("<h5 class='colourPickers'>Bar Colours:</h5>");

  // Append colour pickers based off inputted categories
  for (let i = 0; i < cats.length; i++) {
    // Define and append labels for each picker
    form.append("<label for='" + cats[i] + "' class='colourPickers'>" + cats[i] + ":" + "</label>");

    // Define and append pickers
    form.append("<input id='" + cats[i] + "' class='colourPickers' type='color' value='#3E89B8'>");
  }

  // Define and append button for submitting picked colours
  form.append("<button id='submitColours' class='colourPickers' type='button' onclick='getBarColour()'>Submit Colours</button>");
};

// Function to get colour of bars
const getBarColour = function() {
  categoryBarColour = {};
  let cats = options[0].subCatOne;

  // Pushed inputted colours of bars into global object
  for (let i = 0; i < cats.length; i++) {
    categoryBarColour[cats[i]] = $("#" + cats[i]).val();
  }

  console.log(categoryBarColour); // Test output
};

// Function to get size of font for labels
const getFontSize = function() {
  return Number($("#fontSize").val());
};

// Function to get color of font for labels
const getFontColour = function() {
  return $("#fontColour").val();
};

// Function to pull data
const pullOptions = function() {
  options = [];
  data = []

  // Pushes pulled form data into master data and options array
  data.push(getCategoryValues());

  options.push(getCategories());
  options.push(getScaleValue());
  options.push(getScaleByValue());
  options.push(getValuePosition());
  options.push(getBarWidth());
  options.push(getBarHeight());
  options.push(getBarSpacing());
  options.push(getFontSize());
  options.push(getFontColour());

  createBarColourPicker(); // Create pickers for colour of bars

  console.log(options); // Test output
  console.log(data);
};

// Function to check if data was filled out
const filledOut = function() {
  let complete = true;

  $(".mandatoryInput").each(function() {
    if ($( this ).val() === "") { // Check if a mandatory input field is empty
      // Notify visually which field needs completing
      $( this ).css("border-color", "red");
      $( this ).fadeOut(500);
      $( this ).fadeIn(500);

      complete = false;
    }
  });

  return complete; // Return if form is complete
};

// Function to add elements in html to show drawn and generated bar chart
const createChart = function() {
  // Declarations to pull in variables from css stylesheet
  const root = document.querySelector(':root');
  const rootStyles = getComputedStyle(root);
};

// Function to call functions to check form and pull from it
const checkForm = function() {

  $(".mandatoryInput").css("border-color", ""); // Clear any previously visual reminders of incomplete input fields

  if (filledOut()) {
    pullOptions(); // If the form is completed, pull data from inputs
  } else {
    console.log("Incomplete Form");
  }

  createChart();
};