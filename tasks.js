
/**
 * Starts the application
 * This is the function that is run when the app starts
 * 
 * It prints a welcome line, and then a line with "----",
 * then nothing.
 *  
 * @param  {string} name the name of the app
 * @returns {void}
 */
function startApp(name){
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  Load();
  process.stdin.on('data', onDataReceived);
  console.log(`Welcome to ${name}'s application!`)
  console.log("--------------------")
}


/**
 * Decides what to do depending on the data that was received
 * This function receives the input sent by the user.
 * 
 * For example, if the user entered 
 * ```
 * node tasks.js batata
 * ```
 * 
 * The text received would be "batata"
 * This function  then directs to other functions
 * 
 * @param  {string} text data typed by the user
 * @returns {void}
 */
function onDataReceived(text) {
  console.log("Recieved");
  text = text.replace("\n", "");
  text = text.trim();
  text = text.split(" ");

  if (text[0] === 'quit' || text[0] === 'exit') {
    quit();
  }
  else if(text[0] ==='help'){
    help();
  }else if (text[0] === "list") {
    list();}
  else if(text[0] === 'hello'){
    hello(text[1]);
  }else if (text[0] === "add") {
    text.shift();
    add(text.join(" "));
  }else if (text[0] === "remove") {
    remove(text);
  }else if (text[0] === "edit") {
      num = text.slice(1, 2);
      newtask = text.slice(2).join(" ");
      edit(num, newtask);
    } else if (text[0] === "check") {
      text.shift();
      check(text);
    } else if (text[0] === "uncheck") {
      text.shift();
      uncheck(text);
    }else{
    unknownCommand(text[0]);
  }
}


/**
 * prints "unknown command"
 * This function is supposed to run when all other commands have failed
 *
 * @param  {string} c the text received
 * @returns {void}
 */
function unknownCommand(c){
  console.log('unknown command: "'+c.trim()+'"')
}


/**
 * Says hello
 *
 * @returns {void}
 */
function hello(x){
  if (x == null) {
    console.log('hello!')
  }else {
  console.log('hello " + x + "!"')
}

}
function Load(){
const fs = require('fs');
try {
  let Ldata = fs.readFileSync('database.json');
  let d = JSON.parse(Ldata);
  console.log(d);
  console.log("worked");
} catch (e) {
  console.error(e);
}
}
/**
 * Exits the application
 *
 * @returns {void}
 */
 tasks = ["don't sleep", "do the exercises"];
 done = [true, false];
function quit(){
  console.log('Quitting now, goodbye!')
  const fs = require('fs');
  const data = JSON.stringify(tasks);
  try {
    fs.writeFileSync('database.json', data);
    console.log('worked');
  } catch (e) {
    console.error(e);
  }
  process.exit();
}
/**
 * Says help
 *
 * @returns {void}
 */

function help(){
  console.log('hello -- hello!\nhello your_name -- hello your_name!\nexit or quit -- exit\nlist--see your list of tasks\nadd task--list of tasks with your new task\nremove--removes last task\nremove number--remove the numberth taskncheck number--> checks the numberth task\nuncheck number-->uncheck the numberth tast\ncheck number--checks the numberth task\nuncheck number--uncheck the numberth tast')
}

function list() {
  for (var i = 0; i < tasks.length; i++) {
    if (done[i] == true) {
      console.log(i + 1 + " - " + "[✓] " + tasks[i]);
    } else {
      console.log(i + 1 + " - " + "[ ] " + tasks[i]);
    }
  }
}

function add(x) {
  if (x == "") {
    console.log("error! you should add something");
  } else {
    tasks.push(x);
    for (var i = 0; i < tasks.length; i++) {
      console.log(i + 1 + "- " + tasks[i]);
    }
  }
}
function remove(x) {
  if (x == "") {
    tasks.splice(tasks.length - 1, 1);
  } else if (x <= 0 || x > tasks.length) {
    console.log("error! number doesn't exist.");}
  else {
    tasks.splice(x - 1, 1);
  }
}
function edit(n, x) {
  if (n == "" && x == "") {
    console.log("error! what do you want to edit?");
  } else if (isNaN(n)) {
    tasks[tasks.length - 1] = n + " " + x;
  } else {
    tasks[n - 1] = x;
  }
}
function check(x) {
  if (x == "") {
    console.log("error! what do you want to check?");
  } else {
    done[x - 1] = true;
  }
}

function uncheck(x) {
  if (x == "") {
    console.log("error! what do you want to uncheck?");
  } else {
    done[x - 1] = false;
  }
}


// The following line starts the application
startApp("Kawthar Zeayter")
