var terminalContainer = document.getElementById('terminal-container');

var term = new Terminal({
    cursorBlink: true,
    rendererType: 'canvas',
    screenReaderMode: true,
});

term.open(terminalContainer);

term.prompt = function (input) {
    console.log('Data sent :{' + input + '}')
    term.write('\r\n~$ ');
};

term.writeln('Welcome to pyterm');
term.writeln('');
term.prompt('');

var input = "";
var cursor = 0

term.onKey((data) => {

    console.log(data)
    
    const ev = data.domEvent;
    const printable = !ev.altKey && !ev.ctrlKey && !ev.metaKey;

    if (ev.keyCode === 13) {
        term.prompt(input);
        input = ""
        cursor = 0
    } else if (ev.keyCode === 8) {
        // Do not delete the prompt
        //console.log(term._core.buffer)
        if (term._core.buffer.x > 3) {
            //console.log(term._core.buffer.x)
            //input = input.slice(0, -1)
            //term.write('\b \b');
            input = input.slice(0,cursor-1) + input.slice(cursor+1)//[input].splice(cursor, 1) 
            //str = str.slice(0, 3) + str.slice(4);
            cursor -= 1;
            term.write('\b \b');
            //console.log('str : ' + str)
        }
    } else if (ev.keyCode === 37) { //Left arrow  
        if (cursor > 0) {
            cursor -= 1;
            term.write(data.key);
        }

    } else if (ev.keyCode === 39) { //Right arrow      
        if (cursor < input.length) {
            cursor += 1;
            term.write(data.key);
        }     

    } else {//if (printable) {
    
        cursor += 1;
        //input += data.key;
        input = input.substr(0, cursor) + data.key + input.substr(cursor)
        //console.log(input)
        term.write(data.key);
    }

    console.log(cursor)
    console.log(term._core.buffer.x)
    console.log(input)
});