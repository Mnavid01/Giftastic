var movies = ["Cruel Intentions", 
            "Clueless", 
            "Blue Crush", 
            "Freaky Friday",
            "Mean Girls",
            "Princess Diaries",
            "Legally Blonde",
            "Princess Bride",
            "She's The Man",
            "Love and Basketball",
            "Sex and The City"];

      // Function for displaying data
function renderButtons() {

  $(".button-display").empty();

  for (var i = 0; i < movies.length; i++) {
    var a = $("<button>");
    a.addClass("clicker btn btn-primary");
    a.attr("data-name", movies[i]);
    a.text(movies[i]);
    $(".button-display").append(a);
    console.log('movie array =' + movies + '-');
  }
}

renderButtons();

$("body").on("click", '#add-movie', function(event) {

  event.preventDefault();
  var movie = $("#movie-input").val().trim();
  if (movie == '') {
    alert('FIND YOUR FAV FLICK!')
  }
  else {
    movies.push(movie);
    console.log('movie array =' + movies + '-');
    $("#movie-input").val('')
    renderButtons();
  }
});

$("body").on("click", '.clicker', function() {
  
  var movie = $(this).attr("data-name");
  console.log("data-name -" + movie + "-");

  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    movie + "&api_key=dc6zaTOxFJmzC&limit=10";
  console.log("query -" + queryURL + "-");

  $.ajax({
      url: queryURL,
      method: "GET"
    })
    .done(function(response) {

      var results = response.data;
      console.log(response);
      $('#images').empty();

      for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div class='item'>");
        var rating = results[i].rating;
        var p = $('<p>')
          .append('<span class="label label-lg label-info">Rating: <span class="badge">' + rating + '</span></span>');
//         <button class="btn btn-primary" type="button">
//   Messages <span class="badge">4</span>
// </button>

        var movieImage = $("<img class='img-thumbnail'>");
        var movieUrl = results[i].images.fixed_height.url;
        var movieStill = results[i].images.fixed_height_still.url;
        movieImage.attr({
            src: movieStill,
            'data-still': movieStill,
            'data-animate': movieUrl,
            'data-state':"still"
        });

        gifDiv.prepend(p);
        gifDiv.prepend(movieImage);

        $("#images").prepend(gifDiv);
      };
    });
});

$("body").on("click", '.img-thumbnail', function() {

  var state = $(this).attr('data-state');

  if (state == 'still') {
    $(this).attr('src', $(this).attr('data-animate'));
    $(this).attr('data-state', 'animate');
  }
  else {
    $(this).attr('src', $(this).attr('data-still'));
    $(this).attr('data-state', 'still');
  }
});