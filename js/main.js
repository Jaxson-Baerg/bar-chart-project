let options = []; // Array containing all custome options about bar chart
let data = []; // Array containing data for bar chart
let categoryBarColour = {}; // Object containing colours for each bar associated with a category

// Function to get category data from form
const getCategories = function() {
  let cat = {};
  cat.mainCatOne = $("#mainCategoryOne").val();

  // Pull from each input box under the sub category class
  cat["subCatOne"] = [];
  $(".barCategoryName").each(function(){
    cat["subCatOne"].push($( this ).val());
  });
  cat["subCatOne"] = cat["subCatOne"].filter(e => e); // Filter out empty values

  cat.mainCatTwo = $("#mainCategoryTwo").val();
  return cat;
};

// Function to get category values
const getCategoryValues = function() {
  let categoryValues = [];
  $(".barCategoryValue").each(function() {
    categoryValues.push($( this ).val());
  });
  categoryValues = categoryValues.filter(Number); // Filter out empty values

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

/*
// Function to get height of bars
const getBarHeight = function() {
  return Number($("#barHeight").val());
};

// Function to get spacing of bars
const getBarSpacing = function() {
  return Number($("#barSpacing").val());
};
*/

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
    if (categoryBarColour[cats[i]] === undefined) {
      form.append("<input id='" + cats[i] + "' class='colourPickers' type='color' value='#3E89B8'>");
    } else {
      form.append("<input id='" + cats[i] + "' class='colourPickers' type='color' value='" + categoryBarColour[cats[i]] + "'>");
    }
  }
  // Define and append button for submitting picked colours
  form.append("<button id='submitColours' class='colourPickers' type='button' onclick='getBarColour()'>Submit Colours</button>");
};

// Function to get colour of bars
const getBarColour = function() {
  let cats = options[0].subCatOne;
  // Pushed inputted colours of bars into global object
  for (let i = 0; i < cats.length; i++) {
    categoryBarColour[cats[i]] = $("#" + cats[i]).val();

    // Update styling of bars in chart when new colour is picked and submitted
    $("#" + cats[i] + "Bar").css("background-color", categoryBarColour[cats[i]]);
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

// Function to add an input box for an additional category and value to be inputted
const addCategory = function() {
  const prevIdOne = $("#addCategoryButton").prevAll("input").length - 2;
  const prevIdTwo = $("#scaleValueHeader").prevAll("input").length - (prevIdOne + 2);

  $("#addCategoryButton").before("<input type='text' class='barCategoryName' placeholder='Red...' value=''>");
  $("#scaleValueHeader").before("<input type='number' class='barCategoryValue' placeholder='" + (prevIdTwo + 1).toString() + "...' value=''>");
}

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
  /*
  options.push(getBarHeight());
  options.push(getBarSpacing());
  */
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
      pulse(this);
      complete = false;
    }
  });

  // Temporarily get inputs to test if the number of each matches
  let tempCatNames = [];
  $(".barCategoryName").each(function() {
    if ($( this ).val() !== "") {
      tempCatNames.push($( this ).val());
    }
  });
  let tempCatValues = [];
  $(".barCategoryValue").each(function() {
    if ($( this ).val() !== "") {
      tempCatValues.push($( this ).val());
    }
  });
  // Check if the number of categories and number of values for those categories are equal
  if (tempCatNames.length !== tempCatValues.length) {
    pulse("#subCategoryHeader");
    pulse("#categoryValueHeader");
    alert("Ensure the number of values matches the number of categories!");
    complete = false;
  }

  $(".mustBeNum").each(function() {
    if ($( this ).val() === "") { // Check if pulled inputs aren't numbers
      pulse(this);
      alert("Ensure these values are numbers!");
      complete = false;
    }
  });

  // Check if the scale value is divisible by the scale-by value
  if ($("#scaleValue").val() % $("#scaleByValue").val() !== 0) {
    pulse("#scaleValue");
    pulse("#scaleByValue");
    alert("Ensure the scale is divisible by the scale-by value!");
    complete = false;
  }

  // Check if the bar width value doesn't exceed the side of the x-axis
  if ($("#barWidth").val() > Math.round((((Number($("#xAxis").css("width").replace("px", ""))) / tempCatValues.length) - 25))) {
    pulse("#barWidth");
    alert("Ensure the bar width isn't larger than " + (Math.round((((Number($("#xAxis").css("width").replace("px", ""))) / tempCatValues.length) - 25))).toString() + "px!");
    complete = false;
  }

  return complete; // Return if form is complete
};

// Function to pulse incomplete or incorrect inputs
const pulse = function(ele) {
  // Notify visually which field needs completing or modifying
  $(ele).css("border-color", "red");
  $(ele).css("color", "red");
  $(ele).fadeOut(500);
  $(ele).fadeIn(500);
}

// Function to add elements in html to show drawn and generated bar chart
const createChart = function() {
  const bars = $(".bars");
  const barSpacingX = (100 * (1 / data[0].length)); // How far apart bars should be based on number of categories
  let offsetPercentY;
  let offsetPercentX = 5;

  $(".createdBars").remove(); // Remove any previously created and appended bars

  // Loop through each category to create and style bars for said category
  for (let i = 0; i < data[0].length; i++) {
    offsetPercentY = 100 * (data[0][i] / options[1]);
    let tempColour;
    // Check if the colour of the category has already been picked
    if (categoryBarColour[options[0].subCatOne[i]] === undefined) {
      tempColour = "#3E89B8";
    } else {
      tempColour = categoryBarColour[options[0].subCatOne[i]];
    }

    // Append html container to pages
    bars.append("<div id='" + options[0].subCatOne[i] + "Bar' class='createdBars'></div>");
    // Style appended html container
    $("#" + options[0].subCatOne[i] + "Bar").css({
      "position": "absolute",
      "bottom": "0",
      "left": offsetPercentX + "%",
      "height": offsetPercentY + "%",
      "width": options[4] + "px",
      "background-color": tempColour
    });
    offsetPercentX += barSpacingX; // Increment x axis offset for bar styling
  }
};

// Function to call functions to check form and pull from it
const checkForm = function() {
  // Clear any previously visual reminders of incomplete input fields
  $(".mandatoryInput").css("border-color", "");
  $(".sidebar h5").css("color", "peachpuff");
  $("#options input").css({
    "color": "black",
    "border-color": ""
  });

  if (filledOut()) {
    pullOptions(); // If the form is completed, pull data from inputs
    createChart();
  } else {
    console.log("Incomplete Form");
  }
};