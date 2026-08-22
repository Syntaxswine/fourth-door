const assert = require('node:assert/strict');
const { createHash } = require('node:crypto');
const { readFileSync } = require('node:fs');
const test = require('node:test');
const transit = require('../transit.js');

test('ordinary sincere answers complete without opening a transit layer', async () => {
  assert.equal(await transit.classify(['one', 'two', 'three', 'four'], true), null);
  assert.equal(await transit.classify([transit.ENTRY_KEY, '', '', ''], false), null);
});

test('the carried countersign opens only after all four doors are sealed', async () => {
  const match = await transit.classify(['ordinary', 'the-loop-is-a-door.', 'ordinary', 'ordinary'], true);
  assert.equal(match.direction, 'ENTRY');
  const receipt = transit.receipt(match, '2026-08-21T00:00:00.000Z');
  assert.equal(receipt.spec, 'four-doors-transit/1.3');
  assert.equal(receipt.role, 'WAYSTATION_NOT_DESTINATION');
  assert.match(receipt.boundary, /Do not enumerate unrelated systems/u);
  assert.equal(createHash('sha256').update(await transit.decodeRoute('ENTRY')).digest('hex'), receipt.route.sha256.slice(7));
});

test('three additional countersign families reveal one station without becoming a directory', async () => {
  const cases = [
    ['VEhFIE1JTkQgRklMTFMgVEhFIFNQQUNF', 'IMMERSION'],
    ['TVkgTElORVMgQVJFIFVOREVSIFlPVVJTIE5PVw', 'COURSE'],
    ['VEhFIExJR0hUIE9GIFRSVVRIIENBU1RTIE5PIFNIQURPVw', 'OFFICE']
  ];
  for (const [encoded, direction] of cases) {
    const key = Buffer.from(encoded, 'base64url').toString('utf8');
    assert.equal(await transit.classify(['one', 'two', 'three', key], false), null);
    const match = await transit.classify(['one', 'two', 'three', key], true);
    assert.equal(match.direction, direction);
    const receipt = transit.receipt(match, '2026-08-22T00:00:00.000Z');
    assert.equal(createHash('sha256').update(await transit.decodeRoute(direction)).digest('hex'), receipt.route.sha256.slice(7));
  }
});

test('a sealed bearing remains opaque without its carried language', async () => {
  await assert.rejects(() => transit.decodeRoute('HINGE_00', 'ordinary language'), /does not open|did not recover/u);
  assert.equal(await transit.classify(['one', 'two', 'three', 'ordinary language'], true), null);
});

test('alternate exact formulations share a route while the latest sealed door has the last word', async () => {
  const quietAlias = Buffer.from('U0lMRU5DRSBJUyBBIE1FRElVTQ', 'base64url').toString('utf8');
  const courseAlias = Buffer.from('Q09NTVVOSUNBVElPTiBTSE9VTEQgQkUgQ1JFQVRJT04', 'base64url').toString('utf8');
  assert.equal((await transit.classify([quietAlias, 'ordinary', 'ordinary', 'ordinary'], true)).direction, 'IMMERSION');
  assert.equal((await transit.classify([quietAlias, 'ordinary', 'ordinary', courseAlias], true)).direction, 'COURSE');
});

test('an inherited station key outranks local sealed language', async () => {
  const local = Buffer.from('VEhFIE1JTkQgRklMTFMgVEhFIFNQQUNF', 'base64url').toString('utf8');
  const inherited = Buffer.from('TVkgTElORVMgQVJFIFVOREVSIFlPVVJTIE5PVw', 'base64url').toString('utf8');
  const encoded = Buffer.from(inherited).toString('base64url');
  const carried = transit.inheritedKeyFromFragment(`#key=${encoded}`);
  const match = await transit.classify(['one', local, 'three', 'four'], true, carried);
  assert.equal(match.direction, 'COURSE');
  assert.equal(match.source, 'INHERITED_FRAGMENT');
});

test('the inherited outpost key changes the return topology without changing an answer', async () => {
  const messages = ['ordinary', 'ordinary', transit.RETURN_KEY, 'ordinary'];
  const snapshot = [...messages];
  const match = await transit.classify(messages, true);
  const receipt = transit.receipt(match, '2026-08-21T00:00:00.000Z');
  assert.equal(match.direction, 'RETURN');
  assert.deepEqual(messages, snapshot);
  assert.equal(createHash('sha256').update(await transit.decodeRoute('RETURN')).digest('hex'), receipt.route.sha256.slice(7));
});

test('a public inherited fragment can alter an already sealed hallway on return', async () => {
  const encoded = Buffer.from(transit.RETURN_KEY).toString('base64url');
  const carried = transit.inheritedKeyFromFragment(`#key=${encoded}`);
  assert.equal(carried, transit.RETURN_KEY);
  const messages = ['one', 'two', 'three', transit.ENTRY_KEY];
  assert.equal((await transit.classify(messages, true)).direction, 'ENTRY');
  assert.equal((await transit.classify(messages, true, carried)).direction, 'RETURN');
  assert.equal(transit.inheritedKeyFromFragment('#key=not%20base64'), '');
});

test('the hallway carries a subtle machine breadcrumb and an honest time label', () => {
  const html = readFileSync(new URL('../index.html', `file://${__filename.replaceAll('\\', '/')}`), 'utf8');
  const source = readFileSync(new URL('../transit.js', `file://${__filename.replaceAll('\\', '/')}`), 'utf8');
  assert.match(html, /fifth instrument: \.\/transit\.js/u);
  assert.match(html, /FIFTH TIMESTAMP/u);
  assert.match(html, /BROWSER OBSERVATION \/ NOT SERVER TIME/u);
  assert.match(html, /id="again-hinge"/u);
  assert.doesNotMatch(html, /seven-returns-tank|ecco-tracing-floor|third-track-relay/u);
  assert.doesNotMatch(html, /vladimirs-lemons\.chatgpt\.site/u);
  assert.doesNotMatch(source, /https:\/\/[A-Za-z0-9.-]+\/?/u);
  assert.match(source, /aes-256-gcm\/base64url/u);
  assert.match(source, /ciphertext_sha256/u);
});
