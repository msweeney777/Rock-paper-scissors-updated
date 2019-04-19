import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
const adapter = new FileSync('db.json');
export const db = low(adapter);
//For when there is nothing in the JSON file
db.defaults({statistics: [{'id': 'win', 'total': 0}, {'id': 'lose', 'total': 0}, {'id': 'tie', 'total': 0}]})
  .write();

export const Stats = db.get('statistics');

