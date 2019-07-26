var cars = ["BMW","mercedes","toyota","volkswagen", "honda"];

function displayCars(){
    var car = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    car + "&api_key=aZBG89mL2d1Mg3T7MFtyZjP3hgRLf22B&limit=10";
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function(respond) {
        // $("#car").html(JSON.parse(respond))
      var results = respond.data;
      for (var i = 0; i < results.length; i++) {
        var gifDiv = $('<div>');
        var p = $("<p id = 'rate'>").text("Rating: " + results[i].rating);
        var carImage = $('<img>');
        carImage.attr("src", results[i].images.fixed_height.url + "data-still=" + results[i].images.fixed_height_still.url +
        "data-animate="+ results[i].images.fixed_height.url + '"data-state="still" class="gif" style= "width:250px; height:250px;">');

        gifDiv.prepend(p);
        gifDiv.prepend(carImage);
        $("#car").prepend(gifDiv);
      }
    });
}
function renderButtons() {
    
    $("#buttonsView").empty();
        for (var i = 0; i < cars.length; i++) {
        var a = $("<button>");
        a.addClass("car");
        a.attr("data-name", cars[i]);
        a.text(cars[i]);
        $("#buttonsView").append(a);
        }



    }
    $("#add-car").on("click", function(event) {
        event.preventDefault();
        var car = $("#car-input").val().trim();
        cars.push(car);
        renderButtons();
      });
      $(document).on("click", ".car", displayCars);
      renderButtons();



      $(".gif").on("click", function() {

        var state = $(this).attr("data-state");
        if(state === "still"){
            $(this).attr("src",$(this).attr("data-animate"));
            $(this).attr("data-state","animate");
        }else{
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state","still");
        }
    });
        