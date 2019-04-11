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

  it('for tragedy with less than 30 audience', () => {
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

  it('for tragedy with more than 30 audience', () => {
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

  it('for comedy with 20 audience', () => {
    let invoice = {
      customer: 'BigCo',
      performances: [
        {
          playID: 'asLike',
          audience: 20
        },
      ]
    };
    let plays = {
      asLike: { name: "As You Like It", type: "comedy" }
    };
    const result = statement(invoice, plays);
    assert.strictEqual(result, "Statement for BigCo\n" +
      "  As You Like It: $360.00 (20 seats)\n" +
      "Amount owed is $360.00\n" +
      "You earned 4 credits\n");
  });

  it('for comedy with more than 20 audience', () => {
    let invoice = {
      customer: 'BigCo',
      performances: [
        {
          playID: 'asLike',
          audience: 21
        },
      ]
    };
    let plays = {
      asLike: { name: "As You Like It", type: "comedy" }
    };
    const result = statement(invoice, plays);
    assert.strictEqual(result, "Statement for BigCo\n" +
      "  As You Like It: $468.00 (21 seats)\n" +
      "Amount owed is $468.00\n" +
      "You earned 4 credits\n");
  });
});