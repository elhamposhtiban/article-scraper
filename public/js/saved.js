
$(document).ready(showSavedArticles())

function showSavedArticles () {

    $.getJSON ("/articles/saved", function(data) {
    
        $(".savedArticle-part").empty();
        for (let i=0; i<data.length; i++) {
            $(".savedArticle-part").append (
                
                `<div class="card mt-4" data-id=${data[i]._id}>
                    <div class="card-body">
                    <h5 class="card-title">${data[i].title}</h5>
                    <p class="card-text">${data[i].link}</p>
                    <br>
                    <p class="card-text">${data[i].summary}</p>
                    <button class="btn btn-success float-right shadow-button" id="note-button"  data-id="${data[i]._id}> leave a note</button>
                    <button class="btn btn-danger float-right shadow-button" id="unsaved"  data-id="${data[i]._id}> remove from saved</button>
                    </div>`
            );
        };
        });
    }

//         //show the articles
// $("#scrape-article").on("click", function (event) {

//     console.log("i am clicking this button")
//     event.preventDefault();
//     $.ajax({
//         method: "GET",
//         url:"/scrape"
//     }).then( () => showArticles() )

    
// })

 //clear articles
$("#clear-articles").on("click", function clearArticles(event) {
    event.preventDefault();
    $(".article-part").empty();
    $.ajax({
        method: "DELETE",
        url: "/articles"
    }).then(
        showSavedArticles()
    )
    
})