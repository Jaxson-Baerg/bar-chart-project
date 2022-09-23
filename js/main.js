let options = []; // Array containing all custome options about bar chart
let data = []; // Array containing data for bar chart
let categoryBarColour = {}; // Object containing colours for each bar associated with a category

// Function to get y axis category data
const getYAxisCategories = function() {
  let cat = {};
  cat.mainCatTwo = $("#mainCategoryTwo").val();

  // Pull from each input box under the sub category class
  cat["subCatTwo"] = [];
  $(".yCategoryName").each(function(){
    cat["subCatTwo"].push(($( this ).val()).replace(/\s+/g, "-"));
  });
  cat["subCatTwo"] = cat["subCatTwo"].filter(e => e); // Filter out empty values
  return cat;
};

// Function to get category data from form
const getCategories = function() {
  let cat = {};
  cat.mainCatOne = $("#mainCategoryOne").val();

  // Pull from each input box under the sub category class
  cat["subCatOne"] = [];
  $(".barCategoryName").each(function(){
    cat["subCatOne"].push(($( this ).val()).replace(/\s+/g, "-").replace(/:/g, ""));
  });
  cat["subCatOne"] = cat["subCatOne"].filter(e => e); // Filter out empty values
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
  return $("#valuePositionSelector :selected").text();
};

// Function to get width of bars
const getBarWidth = function() {
  return Number($("#barWidth").val());
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
    if (categoryBarColour[cats[i]] === undefined) {
      form.append("<input id='barColourPicker" + repeat("-", i + 1) + "' class='colourPickers' type='color' value='#3E89B8'>");
    } else {
      form.append("<input id='barColourPicker" + repeat("-", i + 1) + "' class='colourPickers' type='color' value='" + categoryBarColour[cats[i]] + "'>");
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
    categoryBarColour[cats[i]] = $("#barColourPicker" + repeat("-", i + 1)).val();

    // Update styling of bars in chart when new colour is picked and submitted
    $("#Bar" + repeat("-", i + 1)).css("background-color", categoryBarColour[cats[i]]);
  }
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
const addBarCategory = function() {
  const prevIdAxisCat = $("#addYCategoryButton").prevAll("input").length - 2;
  const prevIdOne = $("#addBarCategoryButton").prevAll("input").length - (prevIdAxisCat + 2);
  const prevIdTwo = $("#scaleValueHeader").prevAll("input").length - (prevIdAxisCat + prevIdOne + 2);

  $("#addBarCategoryButton").before("<input type='text' class='barCategoryName added' id='subCategory" + repeat("-", prevIdOne + 1) + "' placeholder='Red...' value=''>");
  //$("#scaleValueHeader").before("<input type='number' class='barCategoryValue added' id='categoryValue" + repeat("-", prevIdTwo + 1) + "' placeholder='" + (prevIdTwo + 1).toString() + "...' value=''>");
};

// Function to add y axis category
const addYCategory = function() {
  const prevId = $("#addYCategoryButton").prevAll("input").length - 2;

  $("#addYCategoryButton").before("<input type='text' class='yCategoryName added' id='subCategoryTwo" + repeat("-", prevId + 1) + "' placeholder='18-25(years)...' value=''>");
}

// Function to repeat a character n times
const repeat = function(char, times) {
  let result = "";
  for (let i = 0; i < times; i++) {
    result += char;
  }
  return result;
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
  options.push(getFontSize());
  options.push(getFontColour());
  options.push(getYAxisCategories());

  createBarColourPicker(); // Create pickers for colour of bars
};

// Function to check if data was filled out
const filledOut = function() {
  let complete = true;

  $(".mandatoryInput").each(function() {
    if ($( this ).val() === "") { // Check if a mandatory input field is empty
      pulse(this);
      complete = false;
      return complete;
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

  let isNum = true;
  $(".mustBeNum").each(function() {
    if ($( this ).val() === "") { // Check if pulled inputs aren't numbers
      pulse(this);
      complete = false;
      isNum = false;
    }
  });
  if (!isNum) {
    alert("Ensure number categories are numbers!");
  }

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

  // Check if maximum scale value is equal to or larger than all category values
  let scaleSmall = false;
  for (let i = 0; i < tempCatValues.length; i++) {
    if (tempCatValues[i] > Number($("#scaleValue").val())) {
      scaleSmall = true;
      complete = false;
    }
  }
  if (scaleSmall) {
    pulse(".barCategoryValue");
    pulse("#scaleValue");
    alert("Ensure the maximum scale value is not smaller than any of the category values!");
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

// Function to draw the bars in the chart
const drawBars = function() {
  let split;
  options[7].subCatTwo.length > 0 ? split = true : split = false;

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
    bars.append("<div id='Bar" + repeat("-", i + 1) + "' class='createdBars'></div>");
    // Style appended html container
    $("#Bar" + repeat("-", i + 1)).css({
      "position": "absolute",
      "bottom": "0",
      "left": offsetPercentX + "%",
      "height": offsetPercentY + "%",
      "width": options[4] + "px",
      "background-color": tempColour
    });

    if (split) {
      $("#Bar" + repeat("-", i + 1)).css({
        "height": "100%"
      });
    }

    offsetPercentX += barSpacingX; // Increment x axis offset for bar styling

    for (let x = 0; x < options[7].subCatTwo.length; x++) {
      $("#Bar" + repeat("-", i + 1)).append("<div id='subBar" + repeat("-", x + 1) +"' class='createdSubBars'></div>");

      $("#Bar" + repeat("-", x + 1)).css({

      });
    }
  }
}

// Function to draw the values attatched to the bars in the chart
const drawBarValues = function() {
  let i = 0;
  let barValue = "";

  $(".barValueData").remove(); // Reset html to redraw values of bars

  $(".createdBars").each(function() {
    barValue = options[0].subCatOne[i];

    // Draw values on the top of the bars
    if (options[3] === "Top") {
      $( this ).append("<h4 class='barValueData' id='" + barValue + "Header'>" + data[0][i] + "</h4>");
      $("#" + barValue + "Header").css({
        "position": "relative",
        "top": "-20px",
        "margin": "0",
        "text-align": "center",
        "font-size": options[5],
        "color": options[6]
      });
    // Draw values in the middle of the bars
    } else if (options[3] === "Middle") {
      $( this ).append("<h4 class='barValueData' id='" + barValue + "Header'>" + data[0][i] + "</h4>");
      $("#" + barValue + "Header").css({
        "position": "relative",
        "top": "45%",
        "margin": "0",
        "text-align": "center",
        "font-size": options[5],
        "color": options[6]
      });
    // Draw values at the bottom of the bars
    } else if (options[3] === "Bottom") {
      $( this ).append("<h4 class='barValueData' id='" + barValue + "Header'>" + data[0][i] + "</h4>");
      $("#" + barValue + "Header").css({
        "position": "relative",
        "bottom": "-webkit-calc(-100% + 25px)",
        "bottom": "-moz-calc(-100% + 25px)",
        "bottom": "-ms-calc(-100% + 25px)",
        "bottom": "-o-calc(-100% + 25px)",
        "bottom": "calc(-100% + 25px)",
        "margin": "0",
        "text-align": "center",
        "font-size": options[5],
        "color": options[6]
      });
    }
    i++;

    $( this ).append("<h3 class='barValueData' id='" + barValue + "Footer'>" + barValue + "</h3>");
    $("#" + barValue + "Footer").css({
      "position": "relative",
      "bottom": "calc(-100% + 40px)",
      "text-align": "center",
      "font-size": options[5],
      "color": options[6]
    });
  });
};

// Function to draw the values beside the y axis
const drawYAxisData = function() {
  $(".yAxisData").remove(); // Reset html to redraw y axis data

  let yAxisScalePercent = 0;

  // Draw scale for y axis
  for (let i = options[1]; i >= 0; i -= options[2]) {
    $("#yAxis").append("<p class='yAxisData' id='yAxisScale" + i + "'>" + i + "</p>");
    $("#yAxisScale" + i).css({
      "position": "absolute",
      "margin": "0px",
      "right": "10px",
      "top": yAxisScalePercent + "%",
      "font-size": "14px",
      "color": options[6]
    });
    yAxisScalePercent += (((options[2] / options[1]) * 100));
  }

  $("#yAxis").append("<p class='yAxisData' id='yAxisName'>" + options[7].mainCatTwo + "</p>");
  $("#yAxisName").css({
    "position": "absolute",
    "right": "0",
    "top": "50%",
    "margin": "0",
    "text-align": "center",
    "text-decoration": "underline",
    "font-size": options[5] + "px",
    "font-weight": "bold",
    "color": options[6],
    "-webkit-transform": "rotate(270deg)",
    "-mox-transform": "rotate(270deg)",
    "-ms-transform": "rotate(270deg)",
    "-o-transform": "rotate(270deg)",
    "transform": "rotate(270deg)"
  });
};

// Function to draw the values under the x axis
const drawXAxisData = function() {
  $(".xAxisData").remove(); // Reset html to redraw x axis data

  $("#xAxis").append("<p class='xAxisData' id='xAxisName'>" + options[0].mainCatOne + "</p>");
  $("#xAxisName").css({
    "position": "absolute",
    "left": "40%",
    "top": "20px",
    "text-align": "center",
    "text-decoration": "underline",
    "font-size": options[5] + "px",
    "font-weight": "bold",
    "color": options[6]
  });
};

// Function to add elements in html to show drawn and generated bar chart
const createChart = function() {
  drawBars();
  drawBarValues();
  drawYAxisData();
  drawXAxisData();
};

const examplePageClick = function(num) {
  refreshInputs();

  if (num === 1) {
    examplePageOne();
  } else if (num === 2) {
    examplePageTwo();
  } else if (num === 3) {
    examplePageThree();
  }
}

const refreshInputs = function() {
  $("#options")[0].reset();
  $(".added").remove();
}

// Function to populate data and draw example chart one
const examplePageOne = function() {
  $("#mainCategoryOne").val("Favourite Colour");
  $("#mainCategoryTwo").val("Children");
  $("#subCategory-").val("Red");
  $("#subCategory--").val("Blue");
  $("#subCategory---").val("Yellow");
  $("#categoryValue-").val("3");
  $("#categoryValue--").val("7");
  $("#categoryValue---").val("5");
  $("#scaleValue").val("10");
  $("#scaleByValue").val("1");
  $("#valuePositionSelector").val("Top");
  $("#barWidth").val("150");
  $("#fontSize").val("20");
  $("#fontColour").val("#525252");
  checkForm();
  $("#barColourPicker-").val("#B83E42");
  $("#barColourPicker--").val("#3E89BB");
  $("#barColourPicker---").val("#D3C535");
  getBarColour();
};

// Function to populate data and draw example chart two
const examplePageTwo = function() {
  $("#mainCategoryOne").val("Favourite Game");
  $("#mainCategoryTwo").val("People");
  $("#mainCategoryThree").val("Age(years)");
  addYCategory();
  $("#subCategoryTwo-").val("13-18");
  $("#subCategoryTwo--").val("19-29");
  $("#subCategoryTwo---").val("30-49");
  $("#subCategoryTwo----").val("50+");
  addBarCategory();
  addBarCategory();
  $("#subCategory-").val("Bloodborne");
  $("#subCategory--").val("The Witcher 3: Wild Hunt");
  $("#subCategory---").val("The Last of Us: Part 2");
  $("#subCategory----").val("Rimworld");
  $("#subCategory-----").val("Call of Cthulhu");
  $("#categoryValue-").val("67");
  $("#categoryValue--").val("43");
  $("#categoryValue---").val("82");
  $("#categoryValue----").val("3");
  $("#categoryValue-----").val("29");
  $("#scaleValue").val("100");
  $("#scaleByValue").val("5");
  $("#valuePositionSelector").val("Middle");
  $("#barWidth").val("70");
  $("#fontSize").val("16");
  $("#fontColour").val("#525252");
  checkForm();
  $("#barColourPicker-").val("#B83E42");
  $("#barColourPicker--").val("#3E89BB");
  $("#barColourPicker---").val("#D3C535");
  $("#barColourPicker----").val("#D3C535");
  $("#barColourPicker-----").val("#D3C535");
  getBarColour();
};

// Function to populate data and draw example chart three
const examplePageThree = function() {
  $("#mainCategoryOne").val("Favourite Colour");
  $("#mainCategoryTwo").val("Children");
  $("#subCategory-").val("Red");
  $("#subCategory--").val("Blue");
  $("#subCategory---").val("Yellow");
  $("#categoryValue-").val("3");
  $("#categoryValue--").val("7");
  $("#categoryValue---").val("5");
  $("#scaleValue").val("10");
  $("#scaleByValue").val("1");
  $("#valuePositionSelector").val("Top");
  $("#barWidth").val("200");
  $("#fontSize").val("20");
  $("#fontColour").val("#525252");
  checkForm();
  $("#Red").val("#B83E42");
  $("#Blue").val("#3E89BB");
  $("#Yellow").val("#D3C535");
  getBarColour();
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
  }
};