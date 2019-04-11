const assert = require('assert');
const statement = require('../src/statement');

describe('statement', () => {
  it('for empty performances', () => {
    let invoice = {
      customer: 'BigCo',
      performances: []
    };
    let plays;
    const result = statement(invoice, plays);
    assert.strictEqual(result, "Statement for BigCo\n" +
      "Amount owed is $0.00\n" +
      "You earned 0 credits\n");
  });

  it('for one performance with less than 30 audience', () => {
    let invoice = {
      customer: 'BigCo',
      performances: [
        {
          playID: 'hamlet',
          audience: 20
        },
      ]
    };
    let plays = {
      hamlet: { name: 'Hamlet', type: 'tragedy' }
    };
    const result = statement(invoice, plays);
    assert.strictEqual(result, "Statement for BigCo\n" +
      "  Hamlet: $400.00 (20 seats)\n" +
      "Amount owed is $400.00\n" +
      "You earned 0 credits\n");
  });

  it('for one performance with more than 30 audience', () => {
    let invoice = {
      customer: 'BigCo',
      performances: [
        {
          playID: 'hamlet',
          audience: 31
        },
      ]
    };
    let plays = {
      hamlet: { name: 'Hamlet', type: 'tragedy' }
    };
    const result = statement(invoice, plays);
    assert.strictEqual(result, "Statement for BigCo\n" +
      "  Hamlet: $410.00 (31 seats)\n" +
      "Amount owed is $410.00\n" +
      "You earned 1 credits\n");
  });
});