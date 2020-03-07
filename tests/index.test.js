'use strict';

const assert = require('assert');
const normalizeFileExtension = require('../index.js');

describe('The normalization function', () => {
  describe('validation', () => {
    it('throws when given a number', () => {
      assert.throws(() => normalizeFileExtension(5), TypeError);
    });

    it('throws when given a boolean', () => {
      assert.throws(() => normalizeFileExtension(true), TypeError);
      assert.throws(() => normalizeFileExtension(false), TypeError);
    });

    it('throws when given a object', () => {
      assert.throws(() => normalizeFileExtension({}), TypeError);
    });

    it('throws when given null', () => {
      assert.throws(() => normalizeFileExtension(null), TypeError);
    });

    it('throws when given undefined', () => {
      assert.throws(() => normalizeFileExtension(undefined), TypeError);
    });

    it('throws when given a Symbol', () => {
      assert.throws(
        () => normalizeFileExtension(Symbol.for('test')),
        TypeError
      );
    });
  });

  describe('processing', () => {
    it('returns the given value when it does not begin with a dot', () => {
      const extensionName = 'html';

      const normalizedExtension = normalizeFileExtension(extensionName);

      assert.strictEqual(normalizedExtension, extensionName);
    });

    it('strips the dot from a value when given a dotted extension', () => {
      const normalizedExtension = normalizeFileExtension('.html');

      assert.strictEqual(normalizedExtension, 'html');
    });

    it('does not change values with dots in the non-first position', () => {
      const extensionName = 'test.js';

      const normalizedExtension = normalizeFileExtension(extensionName);

      assert.strictEqual(normalizedExtension, extensionName);
    });

    it('removes only the first dot from values with dots in the non-first position', () => {
      const normalizedExtension = normalizeFileExtension('.test.js');

      assert.strictEqual(normalizedExtension, 'test.js');
    });
  });
});
