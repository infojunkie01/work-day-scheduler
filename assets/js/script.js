// Create array of hours from 9am to 5pm
hoursArray = ['9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM'];

// load eventsArray
var loadEvents = function () {
  eventsArray = JSON.parse(localStorage.getItem("eventsArray"));

  // if nothing in localStorage, create eventsArray to store
  if (!eventsArray) {

    eventsArray = {};

    for (i in hoursArray) {
      eventsArray[hoursArray[i]] = "";
    }

  }
};

loadEvents();

// Create each row for each hour and elements in each
for (i in hoursArray) {
  // Adds current date
  currentDate = moment().format('dddd, MMMM Do YYYY');
  $('#currentDay').text(currentDate)

  // Create each element in a row
  var block = $("<div>")
    .addClass("row block")
    .attr('id', hoursArray[i])

  // Create each element in a row
  var hour = $("<h4>")
    .addClass("block-hour col-2")
    .text(hoursArray[i]);

  if (eventsArray[hoursArray[i]] != "") {
    eventsTextOnLoad = eventsArray[hoursArray[i]];
    console.log(eventsTextOnLoad)
  } else {
    eventsTextOnLoad = ""
  }

  var events = $("<p>")
    .addClass("block-events col-9")
    .text(eventsTextOnLoad);

  var save = $("<button>")
    .addClass("block-save col-1");

  var saveIcon = $("<i>")
    .addClass("fas fa-save");

  save.append(saveIcon);

  block.append(hour, events, save);
  $("#schedule").append(block);


  // Color each block if hour by past, present or future
  currentHour = moment().format('hA');
  partOfDay = moment().format('A');

  if (hoursArray.includes(currentHour) == true) {
    currentIndex = hoursArray.indexOf(currentHour);
  } else {
    currentIndex = partOfDay;
  }

  if (currentIndex == "AM") {
    $("#" + hoursArray[i]).addClass('future')
  } else if (currentIndex == "PM") {
    $("#" + hoursArray[i]).addClass('past')
  } else if (i < currentIndex) {
    $("#" + hoursArray[i]).addClass('past')
  } else if (i == currentIndex) {
    $("#" + hoursArray[i]).addClass('present')
  } else {
    $("#" + hoursArray[i]).addClass('future')
  }

}


// replace p element with a new textarea
$("#schedule").on("click", "p", function () {
  var text = $(this).text().trim();

  var textInput = $("<textarea>").addClass("form-control col-9").val(text);
  $(this).replaceWith(textInput);
  textInput.trigger("focus");

});


// When text area unfocused
$("#schedule").on("blur", "textarea", function () {
  // get current value of textarea
  var text = $(this).val();

  // recreate p element
  var events = $("<p>")
    .addClass("block-events col-9")

    .text(text);

  // replace textarea with new content
  $(this).replaceWith(events);
});


// Save text when clicking save button
$(".block-save").click(function () {
  hour = $(this).parent().attr('id');
  eventsText = $("#" + hour + " p").text();

  // Push to eventsArray and save to local storage
  eventsArray[hour] = eventsText;

  saveEvents();

});

// Save to local storage
var saveEvents = function () {
  localStorage.setItem("eventsArray", JSON.stringify(eventsArray));
};


