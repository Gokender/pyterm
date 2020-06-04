const term = new Terminal();
term.open(document.getElementById('terminal'));

// Create a local echo controller
const localEcho = new LocalEchoController(term);

// Read a single line from the user
localEcho.read("~$ ")
    .then(input => alert(`User entered: ${input}`))
    .catch(error => alert(`Error reading: ${error}`));