/**
 * item27: use functional constructs and libraries to help type flow
 * 
 * Things to remember
 * - use built-in functional constructs and those in utility libraries like Lodash
 * - instead of hand-rolled constructs to improve type flow
 * - increase legibility and reduce the need for explicit type annotation
 */

// functional programming example
// bad ex
const csvRawData = '...';
const rawRows = csvRawData.split('\n');
const headers = rawRows[0].split(',');
const rows2 = rawRows.slice(1).map((rowStr) => {
  const row = {};
  rowStr.split(',').forEach((val, j) => {
    row[headers[j]] = val;
  });
  return row;
});
// reduce
const rows3 = rawRows.slice(1).map(
  (rowStr) =>
    rowStr
      .split(',')
      .reduce((row, val, i) => ((row[headers[i]] = val), row), {}) // error
);

// lodash
import _, { values } from 'lodash';
const rows4 = rawRows
  .slice(1)
  .map((rowStr) => _.zipObject(headers, rowStr.split(','))); // no type annotation needed

// ex2
interface BasketballPlayer {
  name: string;
  team: string;
  salary: number;
}
declare const rosters: { [team: string]: BasketballPlayer[] };
let allPlayers: BasketballPlayer[] = [];
// bad ex
for (const players of Object.values(rosters)) {
  allPlayers = allPlayers.concat(players);
}
// good ex
allPlayers = Object.values(rosters).flat();

// ex3: highest payed player
// vanilla JS
const teamToPlayers: { [team: string]: BasketballPlayer[] } = {};
for (const player of allPlayers) {
  const { team } = player;
  teamToPlayers[team] = teamToPlayers[team] || [];
  teamToPlayers[team].push(player);
}
for (const players of Object.values(teamToPlayers)) {
  players.sort((a, b) => b.salary - a.salary);
}
const bestPaid = Object.values(teamToPlayers).map((players) => players[0]);
bestPaid.sort((playerA, playerB) => playerB.salary - playerA.salary);
console.log(bestPaid);
// lodash
const bestPaid = _(allPlayers)
  .groupBy((player) => player.team)
  .mapValues((players) => _.maxBy(players, (p) => p.salary)!);
  .values()
  .sortBy(p => -p.salary)
  .value()
