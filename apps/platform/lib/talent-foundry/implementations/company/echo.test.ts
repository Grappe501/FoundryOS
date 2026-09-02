import assert from 'node:assert/strict';
import { echoNotice } from './echo';

assert.equal(echoNotice(''), 'You looked.');
assert.equal(echoNotice('   '), 'You looked.');
assert.equal(echoNotice('The main button deletes the workspace.'), 'The main button deletes the workspace.');
assert.equal(echoNotice('Delete. Then start.'), 'Delete.');
assert.equal(/great|good eye|correct|smart/i.test(echoNotice('Delete is the primary.')), false);
