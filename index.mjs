import fs from 'fs';
const choices = ['rock', 'paper', 'scissors'];
const stats = {'win': 0, 'lose': 0, 'tie': 0};
let response = "";
let result = "";


const results = {
  rock: {
    rock: 'tie',
    paper: 'lose',
    scissors: 'win'
  },
  paper: {
    rock: 'win',
    paper: 'tie',
    scissors: 'lose'
  },
  scissors: {
    rock: 'lose',
    paper: 'win',
    scissors: 'tie'
  }
}

function setScore() {
  let stat = {win: 0, lose: 0, tie: 0};
  let data = JSON.stringify(stat, null, 2);
  fs.writeFile('stats.json', data, (err) => {
    if (err) throw err;
  console.log("Default score created in stats.json");
});

}

function respond(choice) {
  return result = results[choice][response];
}

function machine () {
  return response = choices[Math.round((Math.random() * (choices.length - 1)))]
}

function statistics () {
  fs.readFile('stats.json', (err, data) => {
    if (err) throw err;
    let stat = JSON.parse(data);
    stat[result]++;
  
    stat = JSON.stringify(stat, null, 2);

    fs.writeFile('stats.json', stat, (err) => {
    if (err) throw err;

    console.log(`
    human: ${JSON.parse(stat).win} 
    machine: ${JSON.parse(stat).lose}
    tie: ${JSON.parse(stat).tie}\n`);

    });
  });
}

function deleteScore() {

  fs.readFile('stats.json', (err, data) => {
    if (err) throw err;
    let stat = JSON.parse(data);

    stat["win"] = 0;
    stat["lose"] = 0;
    stat["tie"] = 0;

    stat = JSON.stringify(stat, null, 2);

    fs.writeFile('stats.json', stat, (err) => { 
    if (err) throw err;
    console.log('\nScore reset.\n');

    });
  });
}

const flag = (process.argv.slice(2, 3)).pop();

const choice = (process.argv.slice(3)).pop();

if(choices.includes(choice) && (flag == '-i')) {
  machine();
  console.log(`\n${choice} vs. ${response}\n`)
  respond(choice);
  if(result == 'win') {
    console.log('Congratulations you won!')
  } else if (result == 'lose') {
    console.log('Sorry ... you lose.');
  } else {
    console.log('Tie.')
  }
  statistics();
} else if(flag == '-d') {
  deleteScore();
} else if(flag == '-m') {
  console.log('\nInput: [-i] rock/paper/scissors\n\nReset score: [-d]\n')
} else {
  console.log('\nError ... cannot process given input. Try again.\n');
  console.log('See menu "-m" for details on proper entry syntax\n')
}

