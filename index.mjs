import {Stats} from './db.mjs';
const choices = ['rock', 'paper', 'scissors'];
const stats = {'win': 0, 'lose': 0, 'tie': 0}
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

function respond(choice) {
  return result = results[choice][response];
}

function machine () {
  return response = choices[Math.round((Math.random() * (choices.length - 1)))]
}

function statistics () {
  Stats.find({id: result}).update('total', n => n + 1).write();
  console.log(`
  human: ${Stats.find({id: 'win'}).get('total').value()}
  machine: ${Stats.find({id: 'lose'}).get('total').value()}
  tie: ${Stats.find({id: 'tie'}).get('total').value()}\n`);
}

function deleteScore() {
  Stats.find({id: 'win'}).update('total', n => n = 0).write();
  Stats.find({id: 'lose'}).update('total', n => n = 0).write();
  Stats.find({id: 'tie'}).update('total', n => n = 0).write();
}

const flag = (process.argv.slice(2, 3)).pop();

const choice = (process.argv.slice(3)).pop();
//console.log(`\n${choice}`);

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
  statistics(result)
} else if(flag == '-d') {
  deleteScore();
  console.log('\nScore deleted.\n');
  statistics();
} else if(flag == '-m') {
  console.log('\nInput: [-i] rock/paper/scissors\n\nDelete: [-d]\n')
} else {
  console.log('\nError ... cannot process given input. Try again.\n');
  console.log('See menu "-m" for details on proper entry syntax\n')
}

