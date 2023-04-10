console.log('client.js sourced');

$( document ).ready( onReady );

function onReady() {
    console.log('DOM ready');

    getJokesHistory();

}

function getJokesHistory(){
    $.ajax({
        method: 'GET',
        url: '/jokes',
    }).then(
        function (response) {
            console.log('GET /jokes call successful!');
        }
    ).catch(
        function(error){
            console.log('GET /jokes call failed!');
            console.log('error:', error);
        }
    )
}
