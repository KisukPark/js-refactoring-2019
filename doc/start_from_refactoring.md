# Chapter 1. Refactoring: A
## First Example
### ojh420@gmail.com

---

# 실습 환경 1
- IDE: WebStorm, Visual Studio Code
- NodeJS : 최신버전
- 테스팅 프레임워크 : mocha 
- 코드 커버리지 측정 : nyc

---

# 실습 환경 2
1. NodeJS 를 다운받아 설치합니다.
2. Chapter1.zip 파일의 압축을 풉니다.
3. cd chapter1
4. git checkout startingpoint
5. npm install
6. WebStorm/Visual Studio Code 에서 chapter1 을 프로젝트로 오픈한다.

--- 

# 코드 Commit 살펴보기
1. 맥/리눅스에서 Shell Command Alias 를 정의한다.
```
$ alias gn='git checkout `git log --reverse --ancestry-path HEAD..master | head -n 1 | cut -d " " -f 2`'
```
2. Initial Commit 으로 이동
```bash
$ git checkout initialCommit
```
---
1. 다음 Commit 으로 이동하기 
```bash
$ gn
```

# Characterization Test

# Refactoring 시작하기

# Extract Function
- 단축키 : VSCode - Control-Shift-R
- global / statement
- 메소드이름 :amountFor
---

```js
    for (let perf of invoice.performances) {
        const play = plays[perf.playID];

// 여기서부터
        let thisAmount = 0;

        switch (play.type) {
            case "tragedy":
                thisAmount = 40000;
                if (perf.audience > 30) {
                    thisAmount += 1000 * (perf.audience - 30);
                }
                break;
            case "comedy":
                thisAmount = 30000;
                if (perf.audience > 20) {
                    thisAmount += 10000 + 500 * (perf.audience - 20);
                }
                thisAmount += 300 * perf.audience;
                break;
            default:
                throw new Error(`unknown type: ${play.type}`);
        }
// 여기까지

// add volume credits
```
---

# Extract Method
- Method Name : amountFor
- Choose Destination Scope
  - global
  - function statement

## Try it!!!
1. Destination Scope 를 모두 시도해 보자.
1. Destination Scope 에 따라 어떤 차이가 있는가?
1. 내가 원하는 함수 시그너쳐는 무엇인가?

---
#  Compile-Test-Commit

---

```js
function amountFor(play, perf) {
    let thisAmount = 0;
    switch (play.type) {
        case "tragedy":
            thisAmount = 40000;
            if (perf.audience > 30) {
                thisAmount += 1000 * (perf.audience - 30);
            }
            break;
        case "comedy":
            thisAmount = 30000;
            if (perf.audience > 20) {
                thisAmount += 10000 + 500 * (perf.audience - 20);
            }
            thisAmount += 300 * perf.audience;
            break;
        default:
            throw new Error(`unknown type: ${play.type}`);
    }
    return thisAmount;
}
```

# Rename Local Variable
- Old name : thisAmount
- New name : result
```
It’s my coding standard to always call the return value from a function “result”. That way I always know its role.
```

# Compile-Test-Commit

```js
function amountFor(play, perf) {
    let result = 0;
    switch (play.type) {
        case "tragedy":
            result = 40000;
            if (perf.audience > 30) {
                result += 1000 * (perf.audience - 30);
            }
            break;
        case "comedy":
            result = 30000;
            if (perf.audience > 20) {
                result += 10000 + 500 * (perf.audience - 20);
            }
            result += 300 * perf.audience;
            break;
        default:
            throw new Error(`unknown type: ${play.type}`);
    }
    return result;
}

```
---
```
  I move onto the first argument.
Rename Parameter
- Old name : perf
- New name : aPerformance
Again, this is following my coding style. With a dynamically typed language such as JavaScript, it’s useful to keep track of types—hence, my default name for a parameter includes the type name. I use an indefinite article with it unless there is some specific role information to capture in the name. I learned this convention from Kent Beck [Beck SBPP]and continue to find it helpful.
Is this renaming worth the effort? Absolutely. Good code should clearly communicate what it is doing, and variable names are a key to clear code.
```

# Compile-Test-Commit

  Removing play variable
As I consider the parameters to amountFor, I look to see where they come from. aPerformance comes from the loop variable, so naturally changes with each iteration through the loop.
But play is computed from the performance, so there’s no need to pass it in as a parameter at all—I can just recalculate it within amountFor. When I’m breaking down a long function, I like to get rid of variables like play,
variables create a lot of locally scoped names that complicate extractions. The refactoring I will use here is
with Query (178).
I begin by extracting the right-hand side of the assignment into a function.
    because temporary
  Replace Temp
    
  Extract Method
- playFor(perf)
Destination Scope 선택해보기 수동으로 해 보기
어떤 차이가 있을까?
어떤 방법을 쓰고 싶은가?
function statement (invoice, plays) {
let totalAmount = 0;
let volumeCredits = 0;
let result = `Statement for ${invoice.customer}\n`; const format = new Intl.NumberFormat("en-US",
{ style: "currency", currency: "USD", minimumFractionDigits: 2 }).format;
for (let perf of invoice.performances) { const play =
let thisAmount = amountFor(perf, play);
// add volume credits
volumeCredits += Math.max(perf.audience - 30, 0);
// add extra credit for every ten comedy attendees
if ("comedy" === play.type) volumeCredits += Math.floor(perf.audience / 5);
// print line for this order
result += ` ${play.name}: ${format(thisAmount/100)} (${perf.audience} seats)\n`;
totalAmount += thisAmount; }
result += `Amount owed is ${format(totalAmount/100)}\n`; result += `You earned ${volumeCredits} credits\n`; return result;
 }
plays[perf.playID];
→ playFor(perf);

  Compile-Test-Commit

 function statement (invoice, plays) {
let totalAmount = 0;
let volumeCredits = 0;
let result = `Statement for ${invoice.customer}\n`;
const format = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format; for (let perf of invoice.performances) {
const play = playFor(perf);
let thisAmount = amountFor(perf, play);
// add volume credits
volumeCredits += Math.max(perf.audience - 30, 0);
// add extra credit for every ten comedy attendees
if ("comedy" === playFor(perf).type) volumeCredits += Math.floor(perf.audience / 5);
// print line for this order
result += ` ${playFor(perf).name}: ${format(thisAmount/100)} (${perf.audience} seats)\n`;
totalAmount += thisAmount; }
result += `Amount owed is ${format(totalAmount/100)}\n`; result += `You earned ${volumeCredits} credits\n`; return result;
function playFor(perf) { return plays[perf.playID]
}
       Inline local variable
}

  Compile-Test-Commit

  Change Method signature - Remove parameter
Add play manually
 function amountFor(aPerformance, play) { let result = 0;
let play = playFor(aPerformance);
switch (play.type) { case "tragedy":
result = 40000;
if (aPerformance.audience > 30) {
result += 1000 * (aPerformance.audience - 30); }
break;
case "comedy":
result = 30000;
if (aPerformance.audience > 20) {
result += 10000 + 500 * (aPerformance.audience - 20); }
result += 300 * aPerformance.audience;
break; default:
throw new Error(`unknown type: ${play.type}`); }
return result; }
  
  Compile-Test-Commit

 function statement (invoice, plays) {
let totalAmount = 0;
let volumeCredits = 0;
let result = `Statement for ${invoice.customer}\n`; const format = new Intl.NumberFormat("en-US",
{ style: "currency", currency: "USD", minimumFractionDigits: 2 }).format;
for (let perf of invoice.performances) { let thisAmount = amountFor(perf);
// add volume credits
volumeCredits += Math.max(perf.audience - 30, 0);
// add extra credit for every ten comedy attendees
if ("comedy" === playFor(perf).type) volumeCredits += Math.floor(perf.audience / 5);
// print line for this order
result += ` ${playFor(perf).name}: ${format(thisAmount/100)} (${perf.audience} seats)\n`;
totalAmount += thisAmount; }
result += `Amount owed is ${format(totalAmount/100)}\n`; result += `You earned ${volumeCredits} credits\n`; return result;
 
   This refactoring alarms some programmers. Previously, the code to look up the play was executed once in each loop iteration; now, it’s executed thrice. I’ll talk about the interplay of refactoring and performance later, but for the moment I’ll just observe that this change is unlikely to significantly affect performance, and even if it were, it is much easier to improve the performance of a well-factored code base.
The great benefit of removing local variables is that it makes it much easier to do extractions, since there is less local scope to deal with. Indeed, usually I’ll take out local variables before I do any extractions.
Now that I’m done with the arguments to amountFor, I look back at where it’s called. It’s being used to set a temporary variable that’s not updated again, so I apply Inline Variable(123).
       
  Inline local variable
function statement (invoice, plays) {
let totalAmount = 0;
let volumeCredits = 0;
let result = `Statement for ${invoice.customer}\n`; const format = new Intl.NumberFormat("en-US",
{ style: "currency", currency: "USD", minimumFractionDigits: 2 }).format;
for (let perf of invoice.performances) { let thisAmount = amountFor(perf);
// add volume credits
volumeCredits += Math.max(perf.audience - 30, 0);
// add extra credit for every ten comedy attendees
if ("comedy" === playFor(perf).type) volumeCredits += Math.floor(perf.audience / 5);
// print line for this order
result += ` ${playFor(perf).name}: ${format(amountFor(perf)/100)} (${perf.audience} seats)\n`;
totalAmount += amountFor(perf); }
result += `Amount owed is ${format(totalAmount/100)}\n`; result += `You earned ${volumeCredits} credits\n`; return result;
        
  Compile-Test-Commit

 function statement (invoice, plays) {
let totalAmount = 0;
let volumeCredits = 0;
let result = `Statement for ${invoice.customer}\n`; const format = new Intl.NumberFormat("en-US",
{ style: "currency", currency: "USD", minimumFractionDigits: 2 }).format;
for (let perf of invoice.performances) {
 // add volume credits
volumeCredits += Math.max(perf.audience - 30, 0);
// add extra credit for every ten comedy attendees
if ("comedy" === playFor(perf).type) volumeCredits += Math.floor(perf.audience / 5);
// print line for this order
result += ` ${playFor(perf).name}: ${format(amountFor(perf)/100)} (${perf.audience} seats)\n`;
totalAmount += amountFor(perf); }
result += `Amount owed is ${format(totalAmount/100)}\n`; result += `You earned ${volumeCredits} credits\n`; return result;
 Extract Method
- Name: volumeCreditsFor(perf)
Find your optimal refactoring sequence
- How long?
- How many manual refactoring?
- How many typing?

 function volumeCreditsFor(perf) {
let volumeCredits = 0;
volumeCredits += Math.max(perf.audience - 30, 0);
// add extra credit for every ten comedy attendees
if ("comedy" === playFor(perf).type) volumeCredits += Math.floor(perf.audience / 5); return volumeCredits;
}
Now I get the benefit from removing the play variable as it makes it easier to extract the volume credits calculation by removing one of the locally scoped variables.
I still have to deal with the other two. Again, perf is easy to pass in, but volumeCredits is a bit more tricky as it is an accumulator updated in each pass of the loop. So my best bet is to initialize a shadow of it inside the extracted function and return it.
I remove the unnecessary (and, in this case, downright misleading) comment.
 
  Compile-Test-Commit

  Refactor volumeCreditsFor like this
function volumeCreditsFor(perf) {
let volumeCredits = 0;
volumeCredits += Math.max(perf.audience - 30, 0);
// add extra credit for every ten comedy attendees
if ("comedy" === playFor(perf).type) volumeCredits += Math.floor(perf.audience / 5); return volumeCredits;
}
function volumeCreditsFor(aPerformance) {
let result = 0;
result += Math.max(aPerformance.audience - 30, 0);
// add extra credit for every ten comedy attendees
if ("comedy" === playFor(aPerformance).type) result += Math.floor(aPerformance.audience / 5); return result;
}
  
  Compile-Test-Commit

  Removing the format variable
function statement (invoice, plays) {
let totalAmount = 0;
let volumeCredits = 0;
let result = `Statement for ${invoice.customer}\n`;
  const format = new Intl.NumberFormat("en-US",
 { style: "currency", currency: "USD",
 minimumFractionDigits: 2 }).format;
for (let perf of invoice.performances) { volumeCredits += volumeCreditsFor(perf);
// print line for this order
result += ` ${playFor(perf).name}: ${format(amountFor(perf)/100)} (${perf.audience} seats)\n`;
totalAmount += amountFor(perf); }
result += `Amount owed is ${format(totalAmount/100)}\n`; result += `You earned ${volumeCredits} credits\n`; return result;

  Removing the format variable
As I suggested before, temporary variables can be a problem. They are only useful within their own routine, and therefore they encourage long, complex routines. My next move, then, is to replace some of them. The easiest one is format. This is a case of assigning a function to a temp, which I prefer to replace with a declared function.
 function format(aNumber) {
return new Intl.NumberFormat("en-US",
{ style: "currency", currency: "USD", minimumFractionDigits: 2 }).format(aNumber);
}

  Compile-Test-Commit

   function statement (invoice, plays) {
let totalAmount = 0;
let volumeCredits = 0;
let result = `Statement for ${invoice.customer}\n`;
for (let perf of invoice.performances) { volumeCredits += volumeCreditsFor(perf);
// print line for this order
result += ` ${playFor(perf).name}: ${format(amountFor(perf)/100)} (${perf.audience} seats)\n`;
totalAmount += amountFor(perf); }
result += `Amount owed is ${format(totalAmount/100)}\n`; result += `You earned ${volumeCredits} credits\n`; return result;

  Compile-Test-Commit

  Change Function Declaration
Although changing a function variable to a declared function is a refactoring, I haven’t named it and included it in the catalog. There are many refactorings that I didn’t feel important enough for that. This one is both simple to do and relatively rare, so I didn’t think it was worthwhile.
I’m not keen on the name—“format” doesn’t really convey enough of what it’s doing. “formatAsUSD” would be a bit too long-winded since it’s being used in a string template, particularly within this small scope. I think the fact that it’s formatting a currency amount is the thing to highlight here, so I pick a name that suggests that and apply Change Function Declaration (124).
    
   function usd(aNumber) {
return new Intl.NumberFormat("en-US",
{
style: "currency", currency: "USD", minimumFractionDigits: 2
}).format(aNumber / 100); }
Naming is both important and tricky. Breaking a large function into smaller ones only adds value if the names are good. With good names, I don’t have to read the body of the function to see what it does. But it’s hard to get names right the first time, so I use the best name I can think of for the moment, and don’t hesitate to rename it later. Often, it takes a second pass through some code to realize what the best name really is.
As I’m changing the name, I also move the duplicated division by 100 into the function. Storing money as integer cents is a common approach—it avoids the dangers of storing fractional monetary values as floats but allows me to use arithmetic operators. Whenever I want to display such a penny-integer number, however, I need a decimal, so my formatting function should take care of the division.
   
  Removing Total Volume Credits
unction statement (invoice, plays) {
let totalAmount = 0;
let volumeCredits = 0;
let result = `Statement for ${invoice.customer}\n`;
for (let perf of invoice.performances) { volumeCredits += volumeCreditsFor(perf);
// print line for this order
result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience} seats)\n`;
totalAmount += amountFor(perf); }
result += `Amount owed is ${usd(totalAmount)}\n`; result += `You earned ${volumeCredits} credits\n`; return result;
 
  Compile-Test-Commit

  Split Loop
function statement (invoice, plays) {
let totalAmount = 0;
let volumeCredits = 0;
let result = `Statement for ${invoice.customer}\n`;
for (let perf of invoice.performances) { volumeCredits += volumeCreditsFor(perf);
}
for (let perf of invoice.performances) {
// print line for this order
result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience} seats)\n`; totalAmount += amountFor(perf);
}
result += `Amount owed is ${usd(totalAmount)}\n`; result += `You earned ${volumeCredits} credits\n`; return result;
   
  Compile-Test-Commit

  Slide Statement
function statement (invoice, plays) {
let totalAmount = 0;
let volumeCredits = 0;
let result = `Statement for ${invoice.customer}\n`; let volumeCredits = 0;
for (let perf of invoice.performances) { volumeCredits += volumeCreditsFor(perf);
}
for (let perf of invoice.performances) {
// print line for this order
result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience} seats)\n`; totalAmount += amountFor(perf);
}
result += `Amount owed is ${usd(totalAmount)}\n`; result += `You earned ${volumeCredits} credits\n`; return result;
     
  Compile-Test-Commit

  Extract Function
Gathering together everything that updates the volumeCredits variable makes it easier to do Replace Temp with Query (178). As before, the first step is to apply Extract Function(106) to the overall calculation of the variable.
     function totalVolumeCredits() { let volumeCredits = 0;
for (let perf of invoice.performances) { volumeCredits += volumeCreditsFor(perf);
}
return volumeCredits; }

  Compile-Test-Commit

  Inline volumeCredits
function statement (invoice, plays) {
let totalAmount = 0;
let result = `Statement for ${invoice.customer}\n`;
let volumeCredits = totalVolumeCredits();
for (let perf of invoice.performances) {
// print line for this order
result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience} seats)\n`; totalAmount += amountFor(perf);
}
result += `Amount owed is ${usd(totalAmount)}\n`; result += `You earned ${volumeCredits} credits\n`; return result;
 
  Let me pause for a bit to talk about what I’ve just done here. Firstly, I know readers will again be , as many people are wary of repeating a loop. But
. If you timed the code before and after this refactoring, you would probably —and that’s usually the case. Most programmers, even experienced ones, are poor
judges of how code actually performs. Many of our intuitions are broken by clever compilers, modern caching techniques, and the like.
But “mostly” isn’t the same as “alwaysly.” Sometimes a refactoring will have a significant performance implication. Even then, I usually go ahead and do it, because it’s much easier to tune the performance of well-factored code. If I introduce a significant performance issue during refactoring, I spend time on performance tuning afterwards. It may be that this leads to reversing some of the refactoring I did earlier—but most of the time, due to the refactoring, I can apply a more effective performance-tuning enhancement instead. I end up with code that’s both clearer and faster.
So,
worrying about
   performance with this change
most of the time, rerunning a loop like
  this has a negligible effect on performance
not
 notice any significant change in speed
 The performance of software usually depends on just a few parts of the code, and changes anywhere else don’t
 make an appreciable difference.
  my overall advice on performance with refactoring is: Most of the time you should ignore it. If your refactoring
 introduces performance slow-downs, finish refactoring first and do performance tuning afterwards.

   The second aspect I want to call your attention to is how small the steps were to remove volumeCredits. Here are the four steps, each followed by compiling, testing, and committing to my local source code repository:
● Split Loop (227) to isolate the accumulation
● Slide Statements (223) to bring the initializing code next to the accumulation
● Extract Function (106) to create a function for calculating the total
● Inline Variable (123) to remove the variable completely
I confess I don’t always take quite as short steps as these—but whenever things get difficult, my first reaction is to take shorter steps. In particular, should a test fail during a refactoring, if I can’t immediately see and fix the problem, I’ll revert to my last good commit and redo what I just did with smaller steps. That works because I commit so frequently and because small steps are the key to moving quickly, particularly when working with difficult code.
        
  Remove totalAmount
I then repeat that sequence to remove totalAmount. I start by splitting the loop (compile-test-commit), then I slide the variable initialization (compile-test-commit), and then I extract the function. There is a wrinkle here: The best name for the function is “totalAmount”, but that’s the name of the variable, and I can’t have both at the same time. So I give the new function a random name when I extract it (and compile-test-commit).
totalAmount 에도 totalVolumeCredits 와 동일한 리팩토링을 적용한다.
 
   function statement (invoice, plays) {
let result = `Statement for ${invoice.customer}\n`; for (let perf of invoice.performances) {
// print line for this order
result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience} seats)\n`; }
result += `Amount owed is ${usd(totalAmount())}\n`; result += `You earned ${totalVolumeCredits()} credits\n`; return result;

  Compile-Test-Commit

  SPLITTING THE PHASES OF CALCULATION AND FORMATTING
So far, my refactoring has focused on so that and . This is often the case early in refactoring.
is important, as is naming things well. Now, I can begin to focus more on the functionality change I want to make—specifically, providing an HTML version of this statement. In many ways, it’s now much easier to do. With all the calculation code split out, all I have to do is write an HTML version of the seven lines of code at the top. The problem is that these broken-out functions are nested within the textual statement method, and I don’t want to copy and paste them into a new function, however well organized. I want the same calculation functions to be used by the text and HTML versions of the statement.
Adding enough structure to the function ( Breaking down the complicated structures into small pieces )
- I can understand
- I can see the logic
Functionality change
- provide HTML version of statement
    adding enough structure to the function
I can understand it
see it in terms
  of its logical parts
Breaking down complicated chunks into small
  pieces

  Split Phase
There are various ways to do this, but one of my favorite techniques is Split Phase (154). My aim here is to divide the logic into two parts: one that calculates the data required for the statement, the other that renders it into text or HTML. The first phase creates an intermediate data structure that it passes to the second.
- First Phase : Calculate the data required for the statement
- Second Phase : Renders the calculated data into text or HTML
I start a Split Phase (154) by applying Extract Function (106) to the code that makes up the second phase. In this case, that’s the statement printing code, which is in fact the entire content of statement. This, together with all the nested functions, goes into its own top-level function which I call renderPlainText.
       
  Extract Function
function statement (invoice, plays) { return renderPlainText(invoice, plays);
function renderPlainText(invoice, plays) {
let result = `Statement for ${invoice.customer}\n`; for (let perf of invoice.performances) {
// print line for this order
result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience} seats)\n`; }
result += `Amount owed is ${usd(totalAmount())}\n`; result += `You earned ${totalVolumeCredits()} credits\n`; return result;
}
 
  Compile-Test-Commit

   I now examine the other arguments used by renderPlainText. I want to move the data that comes from them into the intermediate data structure, so that all the calculation code moves into the statement function and renderPlainText operates solely on data passed to it through the data parameter.
My first move is to take the customer and add it to the intermediate object (compile-test-commit).

   function totalAmount() {
  let result = 0;
  for (let perf of data.performances) {
    result += amountFor(perf);
  }
  return result;
}
function totalVolumeCredits() {
  let result = 0;
  for (let perf of data.performances) {
    result += volumeCreditsFor(perf);
  }
  return result;
}

   Now I’d like the play name to come from the intermediate data. To do this, I need to enrich the performance record with data from the play (compile-test-commit).
function statement (invoice, plays) {
const statementData = {};
statementData.customer = invoice.customer;
statementData.performances = invoice.performances.map(enrichPerformance);
return renderPlainText(statementData, plays);
function enrichPerformance(aPerformance) { const result = Object.assign({}, aPerformance); return result;
}
}

    At the moment, I’m just making a copy of the performance object, but I’ll shortly add data to this new record. I take a copy because I don’t want to modify the data passed into the function. I prefer to treat data as immutable as much as I can—mutable state quickly becomes something rotten.
The idiom result = Object.assign({}, aPerformance) looks very odd to people unfamiliar to JavaScript. It performs a shallow copy. I’d prefer to have a function for this, but it’s one of those cases where the idiom is so baked into JavaScript usage that writing my own function would look out of place for JavaScript programmers.
   
  Compile-Test-Commit

  Move Function
Now I have a spot for the play, I need to add it. To do that, I need to apply Move Function(198) to playFor and statement (compile-test-commit).
function statement (invoice, plays) {
const statementData = {};
statementData.customer = invoice.customer;
statementData.performances = invoice.performances.map(enrichPerformance);
return renderPlainText(statementData, plays);
function enrichPerformance(aPerformance) { const result = Object.assign({}, aPerformance); result.play = playFor(aPerformance);
return result;
}
function playFor(perf) { return plays[perf.playID]
} }
   
  Make an intermediate function
function renderPlainText(data, plays) {
let result = `Statement for ${data.customer}\n`; for (let perf of data.performances) {
// print line for this order
result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience} seats)\n`; }
result += `Amount owed is ${usd(totalAmount())}\n`; result += `You earned ${totalVolumeCredits()} credits\n`; return result;
function playFor(aPerformance) { return aPerformance.play;
}
 
  Compile-Test-Commit

  Inline playFor
function renderPlainText(data, plays) {
let result = `Statement for ${data.customer}\n`; for (let perf of data.performances) {
// print line for this order
result += ` ${perf.play.name}: ${usd(amountFor(perf))} (${perf.audience} seats)\n`; }
result += `Amount owed is ${usd(totalAmount())}\n`; result += `You earned ${totalVolumeCredits()} credits\n`; return result;
 
  Compile-Test-Commit

  Move amountFor
function enrichPerformance(aPerformance) { const result = Object.assign({}, aPerformance); result.play = playFor(aPerformance); result.amount = amountFor(result);
return result; }
function amountFor(aPerformance) { let result = 0;
let play = aPerformance.play;
...
 
  Make an intermediate function amountFor
function renderPlainText(data, plays) {
let result = `Statement for ${data.customer}\n`; for (let perf of data.performances) {
// print line for this order
result += ` ${perf.play.name}: ${usd(amountFor(perf))} (${perf.audience} seats)\n`; }
result += `Amount owed is ${usd(totalAmount())}\n`; result += `You earned ${totalVolumeCredits()} credits\n`; return result;
function amountFor(aPerformance) { return aPerformance.amount;
}
 
  Compile-Test-Commit

  Inline an intermediate function - amountFor
function renderPlainText(data, plays) {
let result = `Statement for ${data.customer}\n`; for (let perf of data.performances) {
// print line for this order
result += ` ${perf.play.name}: ${usd(perf.amount)} (${perf.audience} seats)\n`; }
result += `Amount owed is ${usd(totalAmount())}\n`; result += `You earned ${totalVolumeCredits()} credits\n`; return result;
 
  Compile-Test-Commit

  Move function volumeCreditsFor
function statement (invoice, plays) {
const statementData = {};
statementData.customer = invoice.customer;
statementData.performances = invoice.performances.map(enrichPerformance);
return renderPlainText(statementData, plays);
function enrichPerformance(aPerformance) { const result = Object.assign({}, aPerformance); result.play = playFor(aPerformance); result.amount = amountFor(result); result.volumeCredits = volumeCreditsFor(result); return result;
}
function volumeCreditsFor(aPerformance) {
let result = 0;
result += Math.max(aPerformance.audience - 30, 0);
// add extra credit for every ten comedy attendees
if ("comedy" === aPerformance.play.type) result += Math.floor(aPerformance.audience / 5); return result;
 }

  Make an intermediate function - volumeCreditsFor
function renderPlainText(data, plays) {
let result = `Statement for ${data.customer}\n`; for (let perf of data.performances) {
// print line for this order
result += ` ${perf.play.name}: ${usd(perf.amount)} (${perf.audience} seats)\n`; }
result += `Amount owed is ${usd(totalAmount())}\n`; result += `You earned ${totalVolumeCredits()} credits\n`; return result;
function volumeCreditsFor(aPerformance) { return aPerformance.volumeCredits;
}
 
  Compile-Test-Commit

  Inline an intermediate function - volumeCreditsFor
function totalVolumeCredits() { let result = 0;
for (let perf of data.performances) { result += perf.volumeCredits;
}
return result; }
 
  Compile-Test-Commit

  Move totalAmount
function statement (invoice, plays) {
const statementData = {};
statementData.customer = invoice.customer;
statementData.performances = invoice.performances.map(enrichPerformance); statementData.totalAmount = totalAmount(statementData);
return renderPlainText(statementData, plays); function totalAmount(data) {
let result = 0;
for (let perf of data.performances) { result += perf.amount;
}
return result; }
 
  Compile-Test-Commit

  Move totalVolumeCredits
function statement (invoice, plays) {
const statementData = {};
statementData.customer = invoice.customer;
statementData.performances = invoice.performances.map(enrichPerformance); statementData.totalAmount = totalAmount(statementData); statementData.totalVolumeCredits = totalVolumeCredits(statementData);
return renderPlainText(statementData, plays); function totalVolumeCredits(data) {
let result = 0;
for (let perf of data.performances) { result += perf.volumeCredits;
}
return result; }
 
  Compile-Test-Commit

  Replace loop with Pipeline - totalVolumeCredits
Although I could have modified the bodies of these totals functions to use the statementData variable (as it’s within
scope), I prefer to pass the explicit parameter.
And, once I’m done with compile-test-commit after the move, I can’t resist a couple quick shots of Replace Loop with Pipeline (231).
     function totalAmount(data) {
 return data.performances.reduce((total, p) => total + p.amount, 0);
 }

  Compile-Test-Commit

  Replace loop with Pipeline - totalAmount
function totalAmount(data) {
return data.performances.reduce((total, p) => total + p.amount, 0);
}
 
  Compile-Test-Commit

  Move createStatementData to its own file
// statement.js
var createStatementData = require('./createStatementData.js');
function statement (invoice, plays) {
const statementData = createStatementData(invoice, plays);
return renderPlainText(statementData, plays); }
// createStatementData.js
module.exports = function createStatementData(invoice, plays) {
const statementData = {};
statementData.customer = invoice.customer;
statementData.performances = invoice.performances.map(enrichPerformance);
...
 
  Compile-Test-Commit

  renderHtml
function htmlStatement(invoice, plays) {
return renderHtml(createStatementData(invoice,plays));
}
function renderHtml(data, plays) {
let result = `<h1>Statement for ${data.customer}</h1>\n`; result += "<table>\n";
result += "<tr><th>play</th><th>seats</th><th>cost</th></tr>" for (let perf of data.performances) {
result += ` <tr><td>${perf.play.name}</td><td>${usd(perf.amount)}</td>`
result += `<td>${perf.audience}</td></tr>\n`; }
result += "</table>\n";
result += `<p>Amount owed is <em>${usd(data.totalAmount)}</em></p>\n`; result += `<p>You earned <em>${data.totalVolumeCredits}</em> credits</p>\n`; return result;
}
 
   I have more code than I did when I started: 70 lines (not counting htmlStatement) as opposed to 44, mostly due to the extra wrapping involved in putting things in functions. If all else is equal, more code is bad—but rarely is all else equal. The extra code breaks up the logic into identifiable parts, separating the calculations of the statements from the layout. This modularity makes it easier for me to understand the parts of the code and how they fit together. Brevity is the soul of wit, but clarity is the soul of evolvable software. Adding this modularity allows to me to support the HTML version of the code without any duplication of the calculations.
When programming, follow the camping rule: Always leave the code base healthier than when you found it.
There are more things I could do to simplify the printing logic, but this will do for the moment. I always have to strike a balance between all the refactorings I could do and adding new features. At the moment, most people under-prioritize refactoring—but there still is a balance. My rule is a variation on the camping rule: Always leave the code base healthier than when you found it. It will never be perfect, but it should be better.
 
  Reorganizing the Calculations By Type

  Reorganizing the Calculations by Type
Now I’ll turn my attention to the next feature change: supporting more categories of plays, each with its own charging and volume credits calculations. At the moment, to make changes here I have to go into the calculation functions and edit the conditions in there. The amountFor function highlights the central role the type of play has in the choice of calculations—but conditional logic like this tends to decay as further modifications are made unless it’s reinforced by more structural elements of the programming language.
There are various ways to introduce structure to make this explicit, but in this case a natural approach is type polymorphism—a prominent feature of classical object-orientation. Classical OO has long been a controversial feature in the JavaScript world, but the ECMAScript 2015 version provides a sound syntax and structure for it. So it makes sense to use it in a right situation—like this one.
My overall plan is to set up an inheritance hierarchy with comedy and tragedy subclasses that contain the calculation logic for those cases. Callers call a polymorphic amount function that the language will dispatch to the different calculations for the comedies and tragedies. I’ll make a similar structure for the volume credits calculation. To do this, I utilize a couple of refactorings. The core refactoring is Replace Conditional with Polymorphism (272), which changes a hunk of conditional code with polymorphism. But before I can do Replace Conditional with Polymorphism (272), I need to create an inheritance structure of some kind. I need to create a class to host the amount and volume credit functions.
              
  Creating a Performance Calculator
class PerformanceCalculator { constructor(aPerformance) {
this.performance = aPerformance; }
}
function enrichPerformance(aPerformance) {
const calculator = new PerformanceCalculator(aPerformance);
const result = Object.assign({}, aPerformance); result.play = playFor(aPerformance); result.amount = amountFor(result); result.volumeCredits = volumeCreditsFor(result); return result;
}
 
     So far, this new object isn’t doing anything. I want to move behavior into it—and I’d like to to move, which is   . Strictly, I don’t need to do this, as it’s not varying polymorphically, but this way I’ll
, and that consistency will make the code clearer.
To make this work, I will use Change Function Declaration (124) to pass the performance’s play into the calculator.
start with the simplest thing
 the play record
keep all
  the data transforms in one place
  
  Change Function Declaration
class PerformanceCalculator { constructor(aPerformance, aPlay) {
this.performance = aPerformance;
this.play = aPlay; }
}
function enrichPerformance(aPerformance) {
const calculator = new PerformanceCalculator(aPerformance, playFor(aPerformance));
const result = Object.assign({}, aPerformance); result.play = calculator.play;
result.amount = amountFor(result); result.volumeCredits = volumeCreditsFor(result); return result;
}
 
  Compile-Test-Commit

  Moving Functions into the Calculator
The next bit of logic I move is rather more substantial for calculating the amount for a performance. I’ve moved functions around casually while rearranging nested functions—but this is a deeper change in the context of the function, so I’ll step through the Move Function(198) refactoring. The first part of this refactoring is to copy the logic over to its new context—the calculator class. Then, I adjust the code to fit into its new home, changing aPerformance to this.performance and playFor(aPerformance) to this.play
    
 get amount() {
let result = 0;
switch (this.play.type) {
case "tragedy":
result = 40000;
if (this.performance.audience > 30) {
result += 1000 * (this.performance.audience - 30); }
break;
case "comedy":
result = 30000;
if (this.performance.audience > 20) {
result += 10000 + 500 * (this.performance.audience - 20); }
result += 300 * this.performance.audience;
break; default:
throw new Error(`unknown type: ${this.play.type}`); }
return result; }

   function enrichPerformance(aPerformance) {
const calculator = new PerformanceCalculator(aPerformance,playFor(aPerformance));
const result = Object.assign({}, aPerformance); result.play = calculator.play;
result.amount = calculator.amount; result.volumeCredits = volumeCreditsFor(result); return result;
}

  Compile-Test-Commit

  Move volumeCreditsFor to Calculator
 
  Compile-Test-Commit

  Making the Performance Calculator Polymorphic
Now that I have the logic in a class, it’s time to apply the polymorphism. The first step is to use Replace Type Code with Subclasses (362) to introduce subclasses instead of the type code. For this, I need to create subclasses of the performance calculator and use the appropriate subclass in createPerformanceData. In order to get the right subclass, I need to replace the constructor call with a function, since JavaScript constructors can’t return subclasses. So I use Replace Constructor with Factory Function (334).
           
  Replace constructor with Factory Function
function enrichPerformance(aPerformance) {
const calculator = createPerformanceCalculator(aPerformance,playFor(aPerformance));
const result = Object.assign({}, aPerformance); result.play = calculator.play;
result.amount = calculator.amount; result.volumeCredits = volumeCreditsFor(result); return result;
}
Top-level
function createPerformanceCalculator(aPerformance, aPlay) { return new PerformanceCalculator(aPerformance, aPlay);
}
 
  Compile-Test-Commit

  Create TragedyCalculator
class TragedyCalculator extends PerformanceCalculator {
}
function createPerformanceCalculator(aPerformance, aPlay) {
switch (aPlay.type) {
case "tragedy": return new TragedyCalculator(aPerformance, aPlay); }
return new PerformanceCalculator(aPerformance, aPlay);
}
 
  Compile-Test-Commit

   class TragedyCalculator extends PerformanceCalculator { get amount() {
return super.amount; }
}
function createPerformanceCalculator(aPerformance, aPlay) {
switch (aPlay.type) {
case "tragedy": return new TragedyCalculator(aPerformance, aPlay); }
return new PerformanceCalculator(aPerformance, aPlay);
}

  Compile-Test-Commit

   class TragedyCalculator extends PerformanceCalculator { get amount() {
let result = 40000;
if (this.performance.audience > 30) {
result += 1000 * (this.performance.audience - 30); }
return result; }
}
function createPerformanceCalculator(aPerformance, aPlay) {
switch (aPlay.type) {
case "tragedy": return new TragedyCalculator(aPerformance, aPlay); }
throw new Error(`unknown type: ${aPlay.type}`);
}

  Compile-Test-Commit

  Create ComedyCalculator
class ComedyCalculator extends PerformanceCalculator {
}
function createPerformanceCalculator(aPerformance, aPlay) {
switch (aPlay.type) {
case "tragedy": return new TragedyCalculator(aPerformance, aPlay); case "comedy": return new ComedyCalculator(aPerformance, aPlay); }
throw new Error(`unknown type: ${aPlay.type}`);
}
 
  Compile-Test-Commit

  Create ComedyCalculator
class ComedyCalculator extends PerformanceCalculator { get amount() {
return super.amount; }
}
function createPerformanceCalculator(aPerformance, aPlay) {
switch (aPlay.type) {
case "tragedy": return new TragedyCalculator(aPerformance, aPlay); case "comedy": return new ComedyCalculator(aPerformance, aPlay); }
throw new Error(`unknown type: ${aPlay.type}`);
}
 
  Compile-Test-Commit

   class ComedyCalculator extends PerformanceCalculator { get amount() {
let result = 30000;
if (this.performance.audience > 20) {
result += 10000 + 500 * (this.performance.audience - 20); }
result += 300 * this.performance.audience;
return result; }
}
function createPerformanceCalculator(aPerformance, aPlay) {
switch (aPlay.type) {
case "tragedy": return new TragedyCalculator(aPerformance, aPlay); case "comedy": return new ComedyCalculator(aPerformance, aPlay); }
return new PerformanceCalculator(aPerformance, aPlay);
}

  Compile-Test-Commit

   The next conditional to   . Looking at the discussion of future categories of plays, I notice that most plays expect to   , with only some categories introducing a variation. So it makes sense to leave the more common case on the superclass as a default, and let the variations override it as necessary. So I just push down the case for comedies:
replace is the volume credits calculation
check if audience is above 30

  STATUS: CREATING THE DATA WITH THE POLYMORPHIC CALCULATOR
Again, as I’ve introduced structure. The benefit here is that the calculations for each kind of . If most of the changes will be to this code, it will be helpful to have it clearly separated like this.
requires writing a new subclass and adding it to the creation function.
The example gives some insight as to when using subclasses like this is useful. Here, I’ve moved the conditional lookup from two functions (amountFor and volumeCreditsFor) to a single constructor function createPerformanceCalculator. The more functions there are that depend on the same type of polymorphism, the more useful this approach becomes.
An alternative to what I’ve done here would be to have createPerformanceData return the calculator itself, instead of the calculator populating the intermediate data structure. One of the nice features of JavaScript’s class system is that with it, using getters looks like regular data access. My choice on whether to return the instance or calculate separate output data depends on who is using the downstream data structure. In this case, I preferred to show how to use the intermediate data structure to hide the decision to use a polymorphic calculator.
   the code has increased in size
 play are grouped together
   Adding a new kind of play

  Final Thoughts
There were episode: decomposing the original function into a set of nested functions, using Split Phase (154) to   , and finally introducing a polymorphic calculator for the calculation logic. Each of these added structure to the code, enabling me to better communicate what the code was doing.
As is often the case with refactoring, the early stages were mostly driven by trying to understand what was going on. A common sequence is: Read the code, gain some insight, and use refactoring to move that insight from your head back into the code. The clearer code then makes it easier to understand it, leading to deeper insights and a beneficial positive feedback loop. There are still some improvements I could make, but I feel I’ve done enough to pass my test of leaving the code significantly better than how I found it.
   three major stages to this refactoring
 separate the calculation and printing code
     
  Final Thoughts
I’m talking about improving the code—but programmers love to argue about what good code looks like. I know some people object to my preference for small, well-named functions. If we consider this to be a matter of aesthetics, where nothing is either good or bad but thinking makes it so, we lack any guide but personal taste. I believe, however, that we can go beyond taste and say that the true test of good code is how easy it is to change it. Code should be obvious: When someone needs to make a change, they should be able to find the code to be changed easily and to make the change quickly without introducing any errors. A healthy code base maximizes our productivity, allowing us to build more features for our users both faster and more cheaply. To keep code healthy, pay attention to what is getting between the programming team and that ideal, then refactor to get closer to the ideal.
But the most important thing to learn from this example is the rhythm of refactoring. Whenever I’ve shown people how I refactor, they are surprised by   , each step leaving the code in a working state that compiles and passes its tests. I was just as surprised myself when two decades ago. The key to effective refactoring is recognizing that you go faster when you take tiny steps, the code is never broken, and you can compose those small steps into substantial changes. Remember that—and the rest is silence.
      how small my steps are
 Kent Beck showed me how to do this in a hotel room in Detroit
  