const fs = require("fs");
//test uniq pipe
//test uniq pipe
//test uniq pipe

//write out data (essentially the 'return' keyword)
function done(output) {
    process.stdout.write(output);
    process.stdout.write('\nprompt > ');
}

//where we will store the commands
function evaluateCmd(userInput) {
    //parses the user input to understand which command was typed
    const userInputArray = userInput.split(" ");
    const command = userInputArray[0];

    switch (command) {
        case "echo":
            commandLibrary.echo(userInputArray.slice(1).join(" "));
             break;
        case "cat":
            commandLibrary.cat(userInputArray.slice(1));
            break;
        case "head":
            commandLibrary.head(userInputArray.slice(1));
        case "tail":
            commandLibrary.tail(userInputArray.slice(1));
            //default command handler incase command does not exist
        default: process.stdout.write('command does not exist!');

    }
}

//where we will store the logic of the commands
const commandLibrary = {
    //the echo command
    "echo": function(userInput) {
        done(userInput);
    },
    //the cat command
    "cat": function(fullPath) {
        const fileName = fullPath[0];
        fs.readFile(fileName, (err, data) => {
            if (err) throw err;
            done(data);
        });
    },
    //the head command
    "head": function(fullPath) {
        const fileName = fullPath[0];
        fs.readFile(fileName, (err, data) => {
            if (err) throw err;
            //converts text to readable utf8 characters from unicode
            var text = data.toString('utf8');
            //split the file into each new line, select the first 10 lines and join them back together
            var slicedText = text.split('\n').slice(0,10).join('\n');
            //convert the text back into unicode to be read by the terminal
            var bufferText = Buffer.from(slicedText, 'utf8');
            //return the first 10 lines using 'done' as return keyword
            done(bufferText);
        })
    },
    //the tail command
    "tail": function(fullPath) {
        const fileName = fullPath[0];
        fs.readFile(fileName, (err, data) => {
            if (err) throw err;
            var text = data.toString('utf8');
            var slicedText = text.split('\n').slice(-10).join('\n');
            var bufferText = Buffer.from(slicedText, 'utf8');
            done(bufferText);
        })
    }
};

module.exports.commandLibrary = commandLibrary;
module.exports.evaluateCmd = evaluateCmd;