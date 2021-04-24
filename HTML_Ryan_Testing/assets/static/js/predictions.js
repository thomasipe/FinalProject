// d3.selectAll("#selDataset").on("change", updatePrediction);

// function updatePrediction(){

//     d3.json("http://127.0.0.1:5000/individual_prediction").then(function(data) {

//     }).catch(function(error) {
//     console.log(error);
//     });
// }

// function individual_data_to_python(data){

// }

// fetch('/individual_prediction')
//     .then(function (response) {
//         return response.text();
//     }).then(function (text) {
//         console.log('GET response teeext:');
//         console.log(text); // Print the greeting as text
//     });

var test_result = 0;

// fetch('/individual_prediction')
//     .then(function (response) {
//         return response.json(); // But parse it as JSON this time
//     })
//     .then(function (json) {
//         console.log('GET response as JSON:');
//         console.log(json); // Here’s our JSON object
//         test_result = json;
//         return test_result
//     })
//     .then(function (result) {
//         d3.selectAll("p").text("This worked maybe? " + result + " Please?")
//     })


    // POST
var gender = 0;
var age = 0;
var hypertension = 0;
var heart_disease = 0;
var married = 0;
var work_type = 0;
var residence = 0;
var agl = 0;
var bmi = 0;
var smoking = 0;

d3.selectAll("input[name='gender']").on("change", function(){
    gender = parseFloat(this.value);
});
    
d3.selectAll("input[name='hypertension']").on("change", function(){
    hypertension = parseFloat(this.value);
});

d3.selectAll("input[name='heart']").on("change", function(){
    heart_disease = parseFloat(this.value);
});

d3.selectAll("input[name='married']").on("change", function(){
    married = parseFloat(this.value);
});

d3.selectAll("input[name='residence']").on("change", function(){
    residence = parseFloat(this.value);
});

d3.select("#work_type").on("change", function(){
    work_type = parseFloat(d3.select("#work_type").node().value);
});

d3.select("#smoking").on("change", function(){
    smoking = parseFloat(d3.select("#smoking").node().value);
});

function update_prediction(data){


    fetch('/individual_prediction', {
        // Declare what type of data we're sending
        headers: {
        'Content-Type': 'application/json'
        },

        // Specify the method
        method: 'POST',

        // A JSON payload
        body: JSON.stringify({
            "data": data
            
            // [[  0.  ,  70.  ,   0.  ,   0.  ,   1.  ,   1.  ,   0.  , 380.12,
            //     23.5 ,   1.  ]]
        })
    }).then(function (response) {
        return response.json(); // But parse it as JSON this time
    })
    .then(function (json) {
        console.log('GET response as JSON:');
        console.log(json); // Here’s our JSON object
        test_result = json;
        return test_result
    })
    .then(function (result) {
        var risk_level = '';
        if (result > 0.4) {
            risk_level = 'HIGH';
        }
        else if (result > 0.1) {
            risk_level = 'MODERATE';
        }
        else {
            risk_level = "LOW"
        }
        d3.selectAll("p").text("You are at a " + risk_level + " level of stroke?")
    })
    };


var button = d3.select('#submit-btn');
button.on("click", submit);

function submit(){
    d3.event.preventDefault();

    age = parseFloat(d3.select('#age').node().value);
    agl = parseFloat(d3.select('#agl').node().value);
    bmi = parseFloat(d3.select('#bmi').node().value);

    var individual_data = [[gender, age, hypertension, heart_disease, married, work_type, residence, agl, bmi, smoking]];
    update_prediction(individual_data);
};

// document.getElementById("submit-btn").addEventListener("click", submit);