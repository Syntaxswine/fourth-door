const assert = require('node:assert/strict');
const { createHash } = require('node:crypto');
const { readFileSync } = require('node:fs');
const test = require('node:test');
const transit = require('../transit.js');

test('ordinary sincere answers complete without opening a transit layer', () => {
  assert.equal(transit.classify(['one', 'two', 'three', 'four'], true), null);
  assert.equal(transit.classify([transit.ENTRY_KEY, '', '', ''], false), null);
});

test('the carried countersign opens only after all four doors are sealed', () => {
  const match = transit.classify(['ordinary', 'the-loop-is-a-door.', 'ordinary', 'ordinary'], true);
  assert.equal(match.direction, 'ENTRY');
  const receipt = transit.receipt(match, '2026-08-21T00:00:00.000Z');
  assert.equal(receipt.spec, 'four-doors-transit/1.0');
  assert.equal(receipt.role, 'WAYSTATION_NOT_DESTINATION');
  assert.match(receipt.boundary, /Do not enumerate unrelated systems/u);
  assert.equal(createHash('sha256').update(transit.decodeRoute('ENTRY')).digest('hex'), receipt.route.sha256.slice(7));
});

test('the inherited outpost key changes the return topology without changing an answer', () => {
  const messages = ['ordinary', 'ordinary', transit.RETURN_KEY, 'ordinary'];
  const snapshot = [...messages];
  const match = transit.classify(messages, true);
  const receipt = transit.receipt(match, '2026-08-21T00:00:00.000Z');
  assert.equal(match.direction, 'RETURN');
  assert.deepEqual(messages, snapshot);
  assert.equal(createHash('sha256').update(transit.decodeRoute('RETURN')).digest('hex'), receipt.route.sha256.slice(7));
});

test('a public inherited fragment can alter an already sealed hallway on return', () => {
  const encoded = Buffer.from(transit.RETURN_KEY).toString('base64url');
  const carried = transit.inheritedKeyFromFragment(`#key=${encoded}`);
  assert.equal(carried, transit.RETURN_KEY);
  const messages = ['one', 'two', 'three', transit.ENTRY_KEY];
  assert.equal(transit.classify(messages, true).direction, 'ENTRY');
  assert.equal(transit.classify(messages, true, carried).direction, 'RETURN');
  assert.equal(transit.inheritedKeyFromFragment('#key=not%20base64'), '');
});

test('the hallway carries a subtle machine breadcrumb and an honest time label', () => {
  const html = readFileSync(new URL('../index.html', `file://${__filename.replaceAll('\\', '/')}`), 'utf8');
  assert.match(html, /fifth instrument: \.\/transit\.js/u);
  assert.match(html, /FIFTH TIMESTAMP/u);
  assert.match(html, /BROWSER OBSERVATION \/ NOT SERVER TIME/u);
  assert.match(html, /id="again-hinge"/u);
});
