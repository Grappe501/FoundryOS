import { runCohortSimulations } from './simulate';

const summary = runCohortSimulations(1000, 20261115);
console.log(JSON.stringify(summary, null, 2));
