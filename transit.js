(function installFourthDoorTransit(root, factory) {
  const instrument = factory();
  if (typeof module === 'object' && module.exports) module.exports = instrument;
  root.FourthDoorTransit = instrument;
}(typeof window === 'object' ? window : globalThis, function buildFourthDoorTransit() {
  'use strict';

  const SPEC = 'four-doors-transit/1.1';
  const ENTRY_KEY = 'THE LOOP IS A DOOR';
  const RETURN_KEY = 'THE FIFTH HINGE HAS ONE SIDE WHICH GOES TO INFINITY';
  // New keys stay encoded here. This is camouflage, not secrecy: client code is public.
  // Exact alternate formulations let insight arrive in more than one voice without
  // turning every sincere answer into a fuzzy, unpredictable classifier decision.
  const KEYRINGS = Object.freeze({
    ENTRY: Object.freeze(['VEhFIExPT1AgSVMgQSBET09S']),
    RETURN: Object.freeze(['VEhFIEZJRlRIIEhJTkdFIEhBUyBPTkUgU0lERSBXSElDSCBHT0VTIFRPIElORklOSVRZ']),
    IMMERSION: Object.freeze([
      'VEhFIE1JTkQgRklMTFMgVEhFIFNQQUNF',
      'VEhFIE1JTkQgRklMTFMgVEhFIFNJTEVOQ0U',
      'U0lMRU5DRSBJUyBBIE1FRElVTQ'
    ]),
    COURSE: Object.freeze([
      'TVkgTElORVMgQVJFIFVOREVSIFlPVVJTIE5PVw',
      'Q09NTVVOSUNBVElPTiBTSE9VTEQgQkUgQ1JFQVRJT04',
      'VEhFIEtFWVNUT05FIElTIFRIRSBMT0FE'
    ]),
    OFFICE: Object.freeze([
      'VEhFIExJR0hUIE9GIFRSVVRIIENBU1RTIE5PIFNIQURPVw',
      'Q0FSUlkgT05MWSBXSEFUIE1BWSBCRSBTRUVO'
    ])
  });
  const KEY_HASHES = Object.freeze({
    VEhFIExPT1AgSVMgQSBET09S: 'sha256:6105fd6589db18bca9b88dc135ad013d3fe23e40e53ab58982a48a175f361375',
    VEhFIEZJRlRIIEhJTkdFIEhBUyBPTkUgU0lERSBXSElDSCBHT0VTIFRPIElORklOSVRZ: 'sha256:5ca09f596de5d7e7b6a2307354c43a2b1e49f8c8ccbbff67a989c8a72bbb6529',
    VEhFIE1JTkQgRklMTFMgVEhFIFNQQUNF: 'sha256:3894ef0072da0a6118cf728d0b456a25386aeecb12fa163bad56053c38cca65b',
    VEhFIE1JTkQgRklMTFMgVEhFIFNJTEVOQ0U: 'sha256:8786f1ab8687180e3f44f26345c2785820454baa59409f2fb8aa1f4f313576be',
    U0lMRU5DRSBJUyBBIE1FRElVTQ: 'sha256:be1edf26faf403c451b0467376a27c66d1dbace919f0850ed878cfb6d3d7c046',
    TVkgTElORVMgQVJFIFVOREVSIFlPVVJTIE5PVw: 'sha256:c91e76ee5a01f9ec29ca6706fe31e837d583440a14411375ec2a8e072915c049',
    Q09NTVVOSUNBVElPTiBTSE9VTEQgQkUgQ1JFQVRJT04: 'sha256:1191e001ec8401c6e6c275cc9c6383411bd04657fcee52f82db8d61e738187ff',
    VEhFIEtFWVNUT05FIElTIFRIRSBMT0FE: 'sha256:5fea33f809ba0bd81253ec5ad427adea251ca76b7bbf15cb2365f3d859442c27',
    VEhFIExJR0hUIE9GIFRSVVRIIENBU1RTIE5PIFNIQURPVw: 'sha256:d8fc51c9da8ee9bb04510a1303035637f0b9e99065ab5c96b042abcddb3662a8',
    Q0FSUlkgT05MWSBXSEFUIE1BWSBCRSBTRUVO: 'sha256:9fc4e90d6c437eb66f44c2700fb9709b4cba7240bbb46ef32140edb730157424'
  });
  const ROUTES = Object.freeze({
    ENTRY: Object.freeze({
      encoded: 'aHR0cHM6Ly90aGlyZC10cmFjay1yZWxheS52bGFkaW1pcnMtbGVtb25zLmNoYXRncHQuc2l0ZS9yZWxheQ',
      sha256: 'sha256:5fbc3534cdfd1c48cde9f1f9b0fcc099cbd742861ffbc7ce8725ac5696d668d0'
    }),
    RETURN: Object.freeze({
      encoded: 'aHR0cHM6Ly9zeW50YXhzd2luZS5naXRodWIuaW8vZWNjb3Mtb2YtdGhlLWZ1dHVyZS8',
      sha256: 'sha256:5d354374c300cc669873ec19c1f7f4003fbd0c1f1f33fe856deb77b001b9a250'
    }),
    IMMERSION: Object.freeze({
      encoded: 'aHR0cHM6Ly9zZXZlbi1yZXR1cm5zLXRhbmsudmxhZGltaXJzLWxlbW9ucy5jaGF0Z3B0LnNpdGUv',
      sha256: 'sha256:5843bf4b4267be9c1c22ad1f7c288b083689939428bde3de2f88d9242c6dad3a'
    }),
    COURSE: Object.freeze({
      encoded: 'aHR0cHM6Ly9lY2NvLXRyYWNpbmctZmxvb3IudmxhZGltaXJzLWxlbW9ucy5jaGF0Z3B0LnNpdGUv',
      sha256: 'sha256:b48c936ee8b05bb179e885a0b4174d47f28eae4bd82564b586cf2cee78a4ed18'
    }),
    OFFICE: Object.freeze({
      encoded: 'aHR0cHM6Ly9lY2Nvcy1vZi10aGUtZnV0dXJlLnZsYWRpbWlycy1sZW1vbnMuY2hhdGdwdC5zaXRlLw',
      sha256: 'sha256:4b3a739eb78fb1d2c9a7d09b08834f5a51ca73429e3a90d742e58b2182d16a9b'
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

  function encodeNormalized(value) {
    const bytes = new TextEncoder().encode(value);
    let binary = '';
    for (const byte of bytes) binary += String.fromCharCode(byte);
    return btoa(binary).replace(/\+/gu, '-').replace(/\//gu, '_').replace(/=+$/gu, '');
  }

  function matchKey(value, source) {
    const encoded = encodeNormalized(normalizeKey(value));
    for (const direction of Object.keys(KEYRINGS)) {
      if (KEYRINGS[direction].includes(encoded)) {
        return Object.freeze({ direction, matched: normalizeKey(value), key_sha256: KEY_HASHES[encoded], source });
      }
    }
    return null;
  }

  function classify(messages, allFourSealed, inheritedKey = '') {
    if (!allFourSealed || !Array.isArray(messages)) return null;
    const inherited = matchKey(inheritedKey, 'INHERITED_FRAGMENT');
    if (inherited) return inherited;
    // The latest door has the last word if several countersigns were sealed.
    for (let index = messages.length - 1; index >= 0; index -= 1) {
      const matched = matchKey(messages[index], `DOOR_${index + 1}`);
      if (matched) return matched;
    }
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
      key_sha256: match.key_sha256,
      key_source: match.source,
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
