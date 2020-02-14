

function showArticles () {

$.getJSON ("/articles", function(data) {

    $(".article-part").empty();
    for (let i=0; i<data.length; i++) {
        $(".article-part").append (
            `<div class="card mt-4" >
                <div class="card-body">
                <h5 class="card-title">${data[i].title}</h5>
                <p class="card-text">${data[i].link}</p>
                <br>
                <p class="card-text">${data[i].summary}</p>
                <button class="btn btn-success float-right" value=${data[i]._id}>save article</button>
            </div>`

        );
    };
    });
}

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
                    <button class="btn btn-success float-right shadow-button" id="unsaved" data-id="${data[i]._id}> leave a note</button>
                    <button class="btn btn-danger float-right shadow-button" id="note-button" data-id="${data[i]._id}> remove from saved</button>
                    </div>`
            );
        };
        });
    }

     showArticles()

    //show the articles
$("#scrape-article").on("click", function (event) {

    console.log("i clicked")
    event.preventDefault();
$.ajax({
    method: "GET",
    url:"/scrape"
}).then( () => showArticles() )

    
})

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

$(".savedArticle-part").on("click", "#unsaved", function unsaveArticle(event) {
    
    event.preventDefault();
    let thisId = $(this).value()
    

    $.ajax({
        method: "PUT",
        url: `/articles/unsaved/${thisId}`
    }).then(
             showSavedArticles()
    )
})



$(".article-part").on("click", "button", function showSavedArticles(event) {
    
    event.preventDefault();
    let thisId = $(this).attr("data-id");
    
console.log( $(this))
console.log(thisId)
    $.ajax({
        method: "PUT",
        url: `/articles/${thisId}`
    }).then(
        showArticles()
    )

})

//////////////////////// linking to the modal here 


$(".savedArticle-part").on("click", "#note-button", function NotesModal(){
    event.preventDefault();
    let thisId = $(this).attr("data-id");
    $("#add-note-modals").modal('show');
    $("#link-id").text(`${thisId}`)



$.ajax({
    method: "GET",
    url: `/articles/${thisId}`,
  })
    
    .then(function(data) {
        console.log(data.note)
        $("#save-notes").empty()
        if(data){
            for (i=0; i< data.note.length; i++){
            
            $("#save-notes").append(`
            <li class="text-center">
            <h6>
            ${data.note[i].title}
            </h6>
            <p>
            ${data.note[i].body}
            </p>
            <button type="button" class="btn btn-danger delete-note" data-id="${data.note[i]._id}">
            Delete Note
            </button>
            </li>
            `)   
            }
}
})
    
});
