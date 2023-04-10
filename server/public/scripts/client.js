console.log('client.js sourced');

$( document ).ready( onReady );

function onReady() {

    //Initially update the DOM with any jokes on
    //  the server.
    getJokesHistory();

    //Click listener for when 'Add Joke' is clicked
    $('#addJokeButton').on('click', postJoke)

}

//Update the DOM with any jokes on the server.
function getJokesHistory(){
    $.ajax({
        method: 'GET',
        url: '/jokes',
    }).then(
        function (response) {
            console.log('GET /jokes call successful!');
            console.log('response:', response);
            let jokesArray = response;

            $('#outputDiv').empty();

            //What do we do with the response
            for (let joke of jokesArray){
                $('#outputDiv').append(`
                    <p>Joke by: ${joke.whoseJoke}</p>
                    <ul>
                        <li>Question: ${joke.jokeQuestion}</li>
                        <li>Punch line: ${joke.punchLine}</li>
                    </ul>
                `)
            }

        }
    ).catch(
        function(error){
            console.log('GET /jokes call failed!');
            console.log('error:', error);
        }
    )
}


function postJoke(event) {
    event.preventDefault();
    console.log('in postJoke');

    //Create a newJoke object with the current
    //  value of each input field.
    let newJoke = {
        whoseJoke: $('#whoseJokeIn').val(),
        jokeQuestion: $('#questionIn').val(),
        punchLine: $('#punchlineIn').val()
    }

    //Empty out the values of the 3 inputs
    $('#whoseJokeIn').val('');
    $('#questionIn').val('');
    $('#punchlineIn').val('');


    $.ajax({
        method: 'POST',
        url: '/jokes',
        data: newJoke,
    }).then(
        function(response){
            console.log('POST /jokes call successful!');
            console.log('response:', response);
        }
    ).catch(
        function(error){
            console.log('POST /jokes call failed');
            console.log('error:', error);
        }
    )

    //Get updated jokesArray from server
    getJokesHistory();
    
}
