

function showArticles () {

$.getJSON ("/articles", function(data) {

    $(".article-part").empty();
    for (let i=0; i<data.length; i++) {
        $(".article-part").append (
            `<div class="card mt-4">
                <div class="card-body">
                <h5 class="card-title">${data[i].title}</h5>
                <p class="card-text">${data[i].link}</p>
                <br>
                <p class="card-text">${data[i].summary}</p>
                <button class="btn btn-success float-right shadow-button" data-id="${data[i]._id}>save article</button>
            </div>`

        );
    };
    });
}

function showSavedArticles () {

    $.getJSON ("/articles/saved", function(data) {
    
        $(".article-part").empty();
        for (let i=0; i<data.length; i++) {
            $(".article-part").append (
                `<div class="card mt-4" data-id=${data[i]._id}>
                    <div class="card-body">
                    <h5 class="card-title">${data[i].title}</h5>
                    <p class="card-text">${data[i].link}</p>
                    <br>
                    <p class="card-text">${data[i].summary}</p>
                    <button class="btn btn-success float-right shadow-button" data-id="${data[i]._id}> leave a note</button>
                    <button class="btn btn-danger float-right shadow-button" data-id="${data[i]._id}> remove from saved</button>
                    </div>`
    
            );
        };
        });
    }




$("#scrape-article").on("click", function showArticles(event){
     event.preventDefault();
     window.location.href = "/scrape"
})

$(document).on("click", "button", function saveOneArticle(event) {
    
    event.preventDefault();
    let thisId = $(this).attr("data-id");
    


    $.ajax({
        method: "PUT",
        url: `/articles/save/${thisId}`
    }).then(
        showArticles()
    )

})
