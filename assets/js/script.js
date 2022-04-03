// make sure on refresh it shows
// ? adjust height of block if overspill?
// ? Create better array of hours?
// sort array?

// Create array of hours from 9am to 5pm
hoursArray = ['9AM','10AM','11AM','12PM','1PM','2PM','3PM','4PM','5PM'];

eventsArray  = [];

for (i in hoursArray){
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

  var events = $("<p>")
  .addClass("block-events col-9")
  .text("");

  var save = $("<button>")
  .addClass("block-save col-1");

  var saveIcon = $("<i>")
  .addClass("fas fa-save");

  save.append(saveIcon);

  block.append(hour, events, save);
  $("#schedule").append(block);


  // Color each block if hour by past, present or future
  currentHour = moment().format('HA');
  currentIndex = hoursArray.indexOf(currentHour);

  if (i < currentIndex){
    $("#" + hoursArray[i]).addClass('past')
  }else if (i == currentIndex){
    $("#" + hoursArray[i]).addClass('present')
  }else{
    $("#" + hoursArray[i]).addClass('future')
  }

}


var loadEvents = function() {
  events = JSON.parse(localStorage.getItem("events"));

  // if nothing in localStorage, create a new object to track all task status arrays
  if (!events) {
    events = {
    };
  }

  // loop over object properties
  $.each(events, function(list, arr) {
    // then loop over sub-array
    arr.forEach(function(event) {
      createTask(event.text, event.date, list);
    });
  });
};

var saveEvents = function() {
  localStorage.setItem("eventsArray", JSON.stringify(eventsArray));
};



// replace p element with a new textarea
$("#schedule").on("click", "p", function() {
  var text = $(this).text().trim();

  var textInput = $("<textarea>").addClass("form-control col-9").val(text);
  $(this).replaceWith(textInput);
  textInput.trigger("focus");

});   


// When text area unfocused
$("#schedule").on("blur", "textarea", function(){
  // get current value of textarea
  var text = $(this).val();

  // recreate p element
  var events = $("<p>")
    .addClass("block-events col-9")

    .text(text);

  // replace textarea with new content
  $(this).replaceWith(events);
});



$(".block-save").click(function() {
  hour = $(this).parent().attr('id');
  eventsText = $("#" + hour + " p").text();

  // Push to eventsArray and save to local storage
  eventsArray.push({
    hour: hour,
    text: eventsText
  })

  saveEvents();

});




var auditTask = function(taskEl) {
  // get date from task element
  var date = $(taskEl)
    .find("span")
    .text()
    .trim();

  // convert to moment object at 5:00pm
  var time = moment(date, "L").set("hour", 17);

  // remove any old classes from element
  $(taskEl).removeClass("list-group-item-warning list-group-item-danger");

  // apply new class if task is near/over due date
  if (moment().isAfter(time)) {
    $(taskEl).addClass("list-group-item-danger");
  } else if (Math.abs(moment().diff(time, "days")) <= 2) {
    $(taskEl).addClass("list-group-item-warning");
  }
};

