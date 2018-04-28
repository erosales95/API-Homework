$(document).ready(function () {
    var videoGameArr = ["halo 5", "gears of war", "bioshock", "god of war 4"];

    $("#buttons-view").on("click", "button", function (event) {
        event.preventDefault();
        console.log("made it");
        var videoGame = $(this).attr("data-name");


        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + videoGame + "&api_key=lokEXiRxZ9E2y5sZj1wWJM6ZN3oDmVuT&limit=10&rating=g";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            console.log("this is our queryURL", queryURL);

            var results = response.data;

            for (var i = 0; i < results.length; i++) {

                var $videoGameDiv = $("<div>");
                $videoGameDiv.css("float","left");
                $videoGameDiv.attr("class", "col-lg=3");

                var $p = $("<p>").text("Rating: " + results[i].rating);
                $p.css("margin-left", "10px");
                
                var still = results[i].images.fixed_height_still.url;
                var active = results[i].images.fixed_height.url;
                
                var $videoGameImg = $("<img>");
                $videoGameImg.css("margin", "10px 10px 10px 10px");
                $videoGameImg.attr({"src": still, "data-state": "still", "data-still": still, "data-animate": active });

                $videoGameDiv.append($p);
                $videoGameDiv.append($videoGameImg);
                
                $("#gifs-appear-here").append($videoGameDiv);

                $videoGameImg.on("click", function() {
                    var state = $(this).attr("data-state");
            
                    if (state === "still") {
                      $(this).attr("src", $(this).attr("data-animate"));
                      $(this).attr("data-state", "animate");
                    } else {
                      $(this).attr("src", $(this).attr("data-still"));
                      $(this).attr("data-state", "still");
                    }
                  });
            
            }

        });
        $("#gifs-appear-here").empty();

    });


    function renderButtons() {

        $("#buttons-view").empty();

        for (var i = 0; i < videoGameArr.length; i++) {

            var a = $("<button>");

            a.addClass("vid-game-btn");

            a.attr("data-name", videoGameArr[i]);

            a.text(videoGameArr[i]);

            $("#buttons-view").append(a);

        }

    };


    $("#add-gif").on("click", function () {
        event.preventDefault();

        var $videoGame = $("#gif-input").val().trim();

        videoGameArr.push($videoGame);

        renderButtons();




    });

  
    renderButtons();
});
