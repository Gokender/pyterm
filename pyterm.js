// Create a terminal instance
const term = new Terminal({
    fontFamily: "'Roboto Mono', monospace",
    fontSize: 12,
    cols: 150,
    rows: 50
});

term.open(document.getElementById('terminal'));


const localEcho = new LocalEchoController(term);

function get(data_base64){
    return $.get('http://127.0.0.1:5000/test/'+ data_base64)/*, function (data, status) {
        return data
    });*/
}


const readLine = () => {
    localEcho.read("~$ ").then((input) => {

        var data_base64 = btoa(input)
        var data_load = ""
        console.log('Data : ' + input)
        console.log('Data64 : ' + data_base64)

        console.log(typeof input)

        $.when(get(data_base64)).done(function(response){
            console.log('WHEN ' + response)
            data_load = atob(response)
            console.log(data_load)
            //localEcho.println("You typed: '" + response + "'")
            localEcho.println(data_load)
            readLine();
            // the code here will be executed when all four ajax requests resolve.
            // a1, a2, a3 and a4 are lists of length 3 containing the response text,
            // status, and jqXHR object for each of the four ajax calls respectively.
        });
        //localEcho.println("You typed: '" + input + "'");

        /*$.get('http://127.0.0.1:5000/test/'+ data_base64, function (data, status) {
            //localEcho.println(data);
            //localEcho.println("You typed: '" + data + "'");
            data_load = data
        });*/

        //console.log(get(data_base64))

        //get(data_base64).then( response => { data_load = response});
        //localEcho.println("You typed: '" + data_load + "'");
        //console.log(data_load)
        //localEcho.println("You typed: '" + response + "'") 
    })
};
readLine();