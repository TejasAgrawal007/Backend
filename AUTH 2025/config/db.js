const mongoose = require("mongoose")

const connection = mongoose.connect("mongodb://localhost:27017/project")
    .then(() => {
        console.log("Success!")
    })


if (!connection) {
    console.log("Fail To Connect!");
}
else {
    console.log("Connection Establish!");
}