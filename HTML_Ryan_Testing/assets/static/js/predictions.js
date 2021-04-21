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
fetch('/individual_prediction', {

    // Declare what type of data we're sending
    headers: {
      'Content-Type': 'application/json'
    },

    // Specify the method
    method: 'POST',

    // A JSON payload
    body: JSON.stringify({
        "data": [[  0.  ,  70.  ,   0.  ,   0.  ,   1.  ,   1.  ,   0.  , 380.12,
            23.5 ,   1.  ]]
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
    d3.selectAll("p").text("This worked maybe? " + result + " Please?")
})