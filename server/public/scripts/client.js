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

    //Create easier to read variables for each
    //  instance of jQuery targetting an id
    let who = $('#whoseJokeIn');
    let question = $('#questionIn');
    let punchLine = $('#punchlineIn');

    //Only allow submit when ALL fields are filled in
    if (who.val() !== '' && question.val() !== '' && punchLine.val() !== '') {
        
        //Create a newJoke object with the current
        //  value of each input field.
        let newJoke = {
            whoseJoke: who.val(),
            jokeQuestion: question.val(),
            punchLine: punchLine.val()
        }

        //Empty out the values of the 3 inputs
        who.val('');
        question.val('');
        punchLine.val('');


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
        )//End ajax POST request to /jokes
    }//End if All fields are filled in

    //Get updated jokesArray from server
    getJokesHistory();
    
}
