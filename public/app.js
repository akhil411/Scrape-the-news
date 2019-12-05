// Grab the articles as a json
$.getJSON("/art", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    // $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
    $("#articles").append("<div class='card' data-id='" + data[i]._id +
 "'><div class='card-body'><h5 class='card-title'>" + data[i].title + 
    "</h5><p class='card-text'>" + data[i].link + "</p><button class='save' data-id='"+ data[i]._id + "'>Save Article</button></div></div>");

  }
});

$.getJSON("/articlessaved", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    // $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
    $("#SavedArticles").append("<div class='card' data-id='" + data[i]._id +
 "'><div class='card-body'><h5 class='card-title'>" + data[i].title + 
    "</h5><p class='card-text'>" + data[i].link + "</p><button style='margin-right:100px;' class='delete' data-id='"+ data[i]._id + 
    "'>Delete Article</button><button type='button' style='margin-right:100px;' class='btn btn-primary add-note' data-toggle='modal' data-target='#exampleModalOne' data-id='"+ data[i]._id + 
    "'>Add Note</button><button type='button' class='btn btn-primary view-note' data-toggle='modal' data-target='#exampleModalTwo' data-id='"+ data[i]._id + 
    "'>View Note</button></div></div>");

  }
});


$(document).on("click", ".save", function() {
  
  var thisId = $(this).attr("data-id");
  $.ajax({
    method: "POST",
    url: "/save/" + thisId
  })
    // With that done, add the note information to the page
    .then(function(data) {
      if(data) {
        alert("Article Saved Successfully");
      }
    })
 });


 $(document).on("click", ".delete", function() {
  
  var thisId = $(this).attr("data-id");
  $.ajax({
    method: "GET",
    url: "/delete/" + thisId
  })
    // With that done, add the note information to the page
    .then(function(data) {
      if(data) {
        alert("Article Deleted Successfully");
      }
      window.location.reload();
    })
 });

 $(document).on("click", ".add-note", function() {
    var thisId = $(this).attr("data-id");
    $("#hiddenInput").text(thisId);
 });

 $(document).on("click", ".note-submit", function() {
  var id =  $("#hiddenInput").text();
  $.ajax({
    method: "POST",
    url: "/articles/" + id,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
 
});


$(document).on("click", ".view-note", function() {
  
  var thisId = $(this).attr("data-id");
  console.log("i want this id" +thisId);
  $.ajax({
    method: "GET",
    url: "/article/" + thisId
  })
    .then(function(data) {
        console.log(data.note);
        $(".notes-title").text("");
        $(".notes-text").text("");
      if (!data.note) {
        $(".notes-title").append("No Notes Yet !!")
      } else {
        $(".notes-title").append(data.note.title);
        $(".notes-text").append(data.note.body);
      }
    })
 });





