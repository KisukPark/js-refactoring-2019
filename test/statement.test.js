const assert = require('assert');
const statement = require('../src/statement');

describe('statement', () => {
  it('x', () => {
    let invoice;
    let plays;
    const result = statement(invoice, plays);
    assert.strictEqual(result, "");
  });
});