// Create array of hours from 9am to 5pm
var hoursArray = ['9AM','10AM','11AM','12PM','1PM','2PM','3PM','4PM','5PM'];


for (i in hoursArray){
  // Adds current date
  currentDate = moment().format('dddd, MMMM Do YYYY');  
  $('#currentDay').text(currentDate)

  // Create each element in a row
  var block = $("<div>")
  .addClass("row block")

  // Create each element in a row
  var hour = $("<h4>")
  .addClass("block-hour col-2")
  .text(hoursArray[i]);

  var events = $("<p>")
  .addClass("block-events col-9")
  .text("hi");

  var save = $("<button>")
  .addClass("block-save col-1");

  block.append(hour, events, save);
  $("#schedule").append(block);
}



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

  // get status type and position in the list
  // var status = $(this)
  //   .closest(".list-group")
  //   .attr("id")
  //   .replace("list-", "");
  // var index = $(this)
  //   .closest(".block")
  //   .index();

  // update task in array and re-save to localstorage
  // tasks[status][index].text = text;
  // saveTasks();

  // recreate p element
  var events = $("<p>")
    .addClass("block-events col-9")
    .text(text);

  // replace textarea with new content
  $(this).replaceWith(events);
});
