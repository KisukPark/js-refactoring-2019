var statement = require('../src/statement');
var assert = require('assert');

/**
 * Now we are ready to refactor legacy code
 */
describe('statment', async function() {

    it('for empty invoice', async function() {
        let invoice = {
            performances: []
        };
        let plays;
        const result = statement(invoice, plays);
        assert.equal(result,"Statement for undefined\n" +
            "Amount owed is $0.00\n" +
            "You earned 0 credits\n");
    });

    it('should throw error for non empty invoice but type is null', async function() {
        let invoice = {
            performances: [
                {
                    playID: 0,
                }
            ]
        };

        let plays = {
            0: {
                "type": null
            }
        };
        //const result = statement(invoice, plays);
        assert.throws(
            function(){
                statement(invoice, plays)
            },
            Error, "Error: unknown type: null");
    });

    it('tragedy play and audience is less than or equal to 30', async function() {
        let invoice = {
            customer: "Gildong",
            performances: [
                {
                    playID: 0,
                    audience: 30
                }
            ]
        };

        let plays = {
            0: {
                "name": "Hamlet",
                "type": "tragedy"
            }
        };
        const result = statement(invoice, plays);
        assert.equal(result, "Statement for Gildong\n" +
            "  Hamlet: $400.00 (30 seats)\n" +
            "Amount owed is $400.00\n" +
            "You earned 0 credits\n");
    });

    it('tragedy play and audience is more than 30', async function() {
        let invoice = {
            customer: "Gildong",
            performances: [
                {
                    playID: 0,
                    audience: 31
                }
            ]
        };

        let plays = {
            0: {
                "name": "Hamlet",
                "type": "tragedy"
            }
        };
        const result = statement(invoice, plays);
        assert.equal(result, "Statement for Gildong\n" +
            "  Hamlet: $410.00 (31 seats)\n" +
            "Amount owed is $410.00\n" +
            "You earned 1 credits\n");
    });

    it('comedy play and audience is less or equal to 20', async function() {
        let invoice = {
            customer: "Gildong",
            performances: [
                {
                    playID: 0,
                    audience: 20
                }
            ]
        };

        let plays = {
            0: {
                "name": "Hamlet",
                "type": "comedy"
            }
        };
        const result = statement(invoice, plays);
        assert.equal(result, "Statement for Gildong\n" +
            "  Hamlet: $360.00 (20 seats)\n" +
            "Amount owed is $360.00\n" +
            "You earned 4 credits\n");
    });

    it('comedy play and audience is less or equal to 20', async function() {
        let invoice = {
            customer: "Gildong",
            performances: [
                {
                    playID: 0,
                    audience: 21
                }
            ]
        };

        let plays = {
            0: {
                "name": "Hamlet",
                "type": "comedy"
            }
        };
        const result = statement(invoice, plays);
        assert.equal(result, "Statement for Gildong\n" +
            "  Hamlet: $468.00 (21 seats)\n" +
            "Amount owed is $468.00\n" +
            "You earned 4 credits\n");
    });

    it('for several performances', async function() {
        let invoice = {
            customer: "Gildong",
            performances: [
                {
                    playID: 0,
                    audience: 30
                },
                {
                    playID: 1,
                    audience: 31
                },
                {
                    playID: 2,
                    audience: 30
                },
                {
                    playID: 3,
                    audience: 31
                }
            ]
        };

        let plays = {
            0: {
                "name": "Hamlet",
                "type": "tragedy"
            },
            1: {
                "name": "Othello",
                "type": "tragedy"
            },
            2: {
                "name": "as-like",
                "type": "comedy"
            },
            3: {
                "name": "as-like",
                "type": "comedy"
            }
        };
        const result = statement(invoice, plays);
        assert.equal(result, "Statement for Gildong\n" +
            "  Hamlet: $400.00 (30 seats)\n" +
            "  Othello: $410.00 (31 seats)\n" +
            "  as-like: $540.00 (30 seats)\n" +
            "  as-like: $548.00 (31 seats)\n" +
            "Amount owed is $1,898.00\n" +
            "You earned 14 credits\n");
    });
});