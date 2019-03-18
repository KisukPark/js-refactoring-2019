var createStatementData = require('./createStatementData.js');

function statement (invoice, plays) {
    const statementData = createStatementData(invoice, plays);

    return renderPlainText(statementData, plays);
}

function renderPlainText(data) {
    let result = `Statement for ${data.customer}\n`;
    for (let perf of data.performances) {

        // print line for this order
        result += `  ${perf.play.name}: ${usd(perf.amount)} (${perf.audience} seats)\n`;
    }

    result += `Amount owed is ${usd(data.totalAmount)}\n`;
    result += `You earned ${data.totalVolumeCredits} credits\n`;
    return result;
}

function htmlStatement(invoice, plays) {
    return renderHtml(createStatementData(invoice,plays));
}

function renderHtml(data) {
    let result = `<h1>Statement for ${data.customer}</h1>\n`;
    result += "<table>\n";
    result += "<tr><th>play</th><th>seats</th><th>cost</th></tr>"
    for (let perf of data.performances) {

        result += `  <tr><td>${perf.play.name}</td><td>${usd(perf.amount)}</td>`
        result += `<td>${perf.audience}</td></tr>\n`;
    }

    result += "</table>\n";
    result += `<p>Amount owed is <em>${usd(data.totalAmount)}</em></p>\n`;
    result += `<p>You earned <em>${data.totalVolumeCredits}</em> credits</p>\n`;
    return result;
}

function usd(aNumber) {
    return new Intl.NumberFormat("en-US",
        {
            style: "currency", currency: "USD",
            minimumFractionDigits: 2
        }).format(aNumber / 100);
}

module.exports = statement;