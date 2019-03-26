var assert = require('assert');
var statement = require('../src/statement');

var invoices = require('../src/invoices.json');
var plays = require('../src/plays.json');

describe('statement',() => {
    it('trivial',() => {
        assert.equal("","");
    });
    it('Invoice 에 공연 정보가 없는 경우',() => {
        let invoice = {
            "customer" : "BigCo",
            "performances" : []
        };
        let result = statement(invoice,plays);
        assert.equal(result,"Statement for BigCo\n" +
            "Amount owed is $0.00\n" +
            "You earned 0 credits\n");
    });
    it('장르는 tragedy, 공연 audience 가 30 이하인 경우',() => {
        let invoice = {
            "customer" : "BigCo",
            "performances" : [
                {
                    "playID": "hamlet",
                    "audience": 30
                }
            ]
        };
        let result = statement(invoice,plays);
        assert.equal(result,"Statement for BigCo\n" +
            "  Hamlet: $400.00 (30 seats)\n" +
            "Amount owed is $400.00\n" +
            "You earned 0 credits\n");
    });
    it('장르는 tragedy, 공연 audience 가 30 보다 큰 경우',() => {
        let invoice = {
            "customer" : "BigCo",
            "performances" : [
                {
                    "playID": "hamlet",
                    "audience": 31
                }
            ]
        };
        let result = statement(invoice,plays);
        assert.equal(result,"Statement for BigCo\n" +
            "  Hamlet: $410.00 (31 seats)\n" +
            "Amount owed is $410.00\n" +
            "You earned 1 credits\n");
    });
    it('장르는 comedy, 공연 audience 가 20 이하인 경우',() => {
        let invoice = {
            "customer" : "BigCo",
            "performances" : [
                {
                    "playID": "as-like",
                    "audience": 20
                }
            ]
        };
        let result = statement(invoice,plays);
        assert.equal(result,"Statement for BigCo\n" +
            "  As You Like It: $360.00 (20 seats)\n" +
            "Amount owed is $360.00\n" +
            "You earned 4 credits\n");
    });
    it('장르는 comedy, 공연 audience 가 20 보다 큰 경우',() => {
        let invoice = {
            "customer" : "BigCo",
            "performances" : [
                {
                    "playID": "as-like",
                    "audience": 21
                }
            ]
        };
        let result = statement(invoice,plays);
        assert.equal(result,"Statement for BigCo\n" +
            "  As You Like It: $468.00 (21 seats)\n" +
            "Amount owed is $468.00\n" +
            "You earned 4 credits\n");
    });
    it('Unknown play type', () => {
        let plays =
            {
                "leo": {"name": "Who is leo", "type": "leo"}
            };
        let invoice =
            {
                "customer": "BigCo",
                "performances" : [
                    {
                        "playID": "leo",
                        "audience": 21
                    }
                ]
            };
        assert.throws(
            function(){
                statement(invoice, plays)
            },
            Error, "Error: unknown type: null");
    });
    it('한 고객이 여러 연극을 공연한 경우', () => {
        let invoice = invoices[0];
        let result = statement(invoice,plays);

        assert.equal(result, "Statement for BigCo\n" +
            "  Hamlet: $650.00 (55 seats)\n" +
            "  As You Like It: $580.00 (35 seats)\n" +
            "  Othello: $500.00 (40 seats)\n" +
            "Amount owed is $1,730.00\n" +
            "You earned 47 credits\n");
    });
});