const mongoose = require('mongoose');
const task = require('./model/tasks.js');

mongoose.connect('mongodb+srv://netninja:test1234@cluster0.awqn4.mongodb.net/Task-DB?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.once('open', function () {
    console.log('Connection established');
}).on('error', function (error) {
    console.log('Connection error:', error);
});


//Add Data
function add(desc, com) {
    var data = new task({
        Description: desc,
        Completed: com
    });
    data.save().then(() => {
        console.log("New item added");
    })

}

//Read Data

function read() {
    task.find({
        Completed: false
    }).then(function (result) {

        if (result.length !== 0) {
            result.forEach(res => {
                console.log(res);
            })
        } else {
            console.log("Everthing is completed");
        }
    })
}


//Update Data

function update() {
    task.updateMany({
        Completed: false
    }, {
        Completed: true
    }).then(function (result) {

        if (result.n !== 0) {
            console.log("Data updated succesfully");
        } else {
            console.log("Nothing to update");
        }
    })
}

//Delete Data using ID

function deletedata(data) {
    task.findOne({
        Description: data
    }).then(function (result) {

        if (result !== null) {
            task.deleteOne({
                _id: result._id
            }).then(function (res) {

                if (res.n !== 0) {
                    console.log(data + " task deleted succesfully");
                } else {
                    console.log("No such task exist")
                }
            })
        } else {
            console.log("No such task exist")
        }


    })
}

//deletedata("Playing");

add('Internship', true);
add('Singing Song', false);
add('Coding Practice', true);
add('Playing', false);
read();
update();
deletedata("Playing");