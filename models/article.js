const mongoose = require ("mongoose");

const Schema = mongoose.Schema;

// Save a reference to the Schema constructor
const ArticleSchema = new Schema ({

    title: {
        type :String,
        required:true
    },

    link: {
        type: String,
        required: true
    },

    summary: {
        type: String,
        required: true
    },

    image: {
        type: String,
        required: true
    },

    saved: {
        type: Boolean,
        default: false
    },

    note : [{
        type: Schema.Types.ObjectId,
        ref: "Note"
    }]
})


const Article = mongoose.model("Article", ArticleSchema);


module.exports = Article;