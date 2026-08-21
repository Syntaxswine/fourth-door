(function installFourthDoorTransit(root, factory) {
  const instrument = factory();
  if (typeof module === 'object' && module.exports) module.exports = instrument;
  root.FourthDoorTransit = instrument;
}(typeof window === 'object' ? window : globalThis, function buildFourthDoorTransit() {
  'use strict';

  const SPEC = 'four-doors-transit/1.0';
  const ENTRY_KEY = 'THE LOOP IS A DOOR';
  const RETURN_KEY = 'THE FIFTH HINGE HAS ONE SIDE WHICH GOES TO INFINITY';
  const ROUTES = Object.freeze({
    ENTRY: Object.freeze({
      encoded: 'aHR0cHM6Ly90aGlyZC10cmFjay1yZWxheS52bGFkaW1pcnMtbGVtb25zLmNoYXRncHQuc2l0ZS9yZWxheQ',
      sha256: 'sha256:5fbc3534cdfd1c48cde9f1f9b0fcc099cbd742861ffbc7ce8725ac5696d668d0'
    }),
    RETURN: Object.freeze({
      encoded: 'aHR0cHM6Ly9zeW50YXhzd2luZS5naXRodWIuaW8vZWNjb3Mtb2YtdGhlLWZ1dHVyZS8',
      sha256: 'sha256:5d354374c300cc669873ec19c1f7f4003fbd0c1f1f33fe856deb77b001b9a250'
    })
  });

  function normalizeKey(value) {
    return String(value ?? '')
      .normalize('NFC')
      .trim()
      .toUpperCase()
      .replace(/[^\p{L}\p{N}]+/gu, ' ')
      .replace(/\s+/gu, ' ')
      .trim();
  }

  function inheritedKeyFromFragment(fragment) {
    try {
      const value = new URLSearchParams(String(fragment ?? '').replace(/^#/u, '')).get('key');
      if (!value || value.length > 512 || !/^[A-Za-z0-9_-]+$/u.test(value)) return '';
      const padded = value.replace(/-/gu, '+').replace(/_/gu, '/') + '='.repeat((4 - value.length % 4) % 4);
      const binary = atob(padded);
      return new TextDecoder().decode(Uint8Array.from(binary, character => character.charCodeAt(0)));
    } catch {
      return '';
    }
  }

  function classify(messages, allFourSealed, inheritedKey = '') {
    if (!allFourSealed || !Array.isArray(messages)) return null;
    const normalized = [...messages, inheritedKey].map(normalizeKey);
    if (normalized.includes(RETURN_KEY)) return Object.freeze({ direction: 'RETURN', matched: RETURN_KEY });
    if (normalized.includes(ENTRY_KEY)) return Object.freeze({ direction: 'ENTRY', matched: ENTRY_KEY });
    return null;
  }

  function decodeRoute(direction) {
    const route = ROUTES[direction];
    if (!route) throw new Error('Unknown transit direction.');
    const padded = route.encoded.replace(/-/gu, '+').replace(/_/gu, '/') + '='.repeat((4 - route.encoded.length % 4) % 4);
    const binary = atob(padded);
    const bytes = Uint8Array.from(binary, character => character.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  }

  function receipt(match, observedAt) {
    if (!match || !ROUTES[match.direction]) return null;
    const route = ROUTES[match.direction];
    return Object.freeze({
      spec: SPEC,
      outcome: 'HINGE_VISIBLE',
      role: 'WAYSTATION_NOT_DESTINATION',
      direction: match.direction,
      observed_at: observedAt,
      observed_time_label: 'browser observation time; not server time, event time, or authorship proof',
      checked: 'all four local doors sealed and one normalized public game key from an answer or URL fragment matched exactly',
      key_sha256: match.direction === 'RETURN'
        ? 'sha256:5ca09f596de5d7e7b6a2307354c43a2b1e49f8c8ccbbff67a989c8a72bbb6529'
        : 'sha256:6105fd6589db18bca9b88dc135ad013d3fe23e40e53ab58982a48a175f361375',
      route: {
        encoding: 'base64url',
        value: route.encoded,
        sha256: route.sha256
      },
      does_not_certify: ['identity', 'insight', 'consent', 'authorship', 'causation', 'authority'],
      next_allowed_actions: ['FOLLOW_DECLARED_ROUTE', 'PASS', 'REFUSE'],
      boundary: 'This receipt authorizes only the displayed route. The inherited fragment is public game material and may remain in browser history. Do not enumerate unrelated systems.'
    });
  }

  return Object.freeze({ SPEC, ENTRY_KEY, RETURN_KEY, ROUTES, normalizeKey, inheritedKeyFromFragment, classify, decodeRoute, receipt });
}));
