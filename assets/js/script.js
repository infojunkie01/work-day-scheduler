// local storage
// Color code time blocks on past, present, future
// ? adjust height of block if overspill?
// ? Create better array of hours?


// Create array of hours from 9am to 5pm
var hoursArray = ['9AM','10AM','11AM','12PM','1PM','2PM','3PM','4PM','5PM'];


for (i in hoursArray){
  // Adds current date
  currentDate = moment().format('dddd, MMMM Do YYYY');  
  $('#currentDay').text(currentDate)

  // Create each element in a row
  var block = $("<div>")
  .addClass("row block")
  .attr('id', 'block-'+hoursArray[i])

  // Create each element in a row
  var hour = $("<h4>")
  .addClass("block-hour col-2")
  .text(hoursArray[i]);

  var events = $("<p>")
  .addClass("block-events col-9")
  .attr('id', 'events-'+hoursArray[i])
  .text("hi");

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
    $("#block-" + hoursArray[i]).addClass('past')
  }else if (i == currentIndex){
    $("#block-" + hoursArray[i]).addClass('present')
  }else{
    $("#block-" + hoursArray[i]).addClass('future')
  }
}



// for (i in hoursArray){
//   if (moment().format('HA') == i){
//     $("block-"+hoursArray[i]).addClass("")
//   }

// }


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
