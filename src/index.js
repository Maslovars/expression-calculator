function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    // write your solution here
    let arr = [];
    if (/\s/.test(expr)) {
        arr = expr.split(/\s+/);
    } else {
        arr = expr.split("");
    }
    let res = [];
    let stack = [];
    let priority = {
        "+": 0,
        "-": 0,
        "*": 1,
        "/": 1
    };
    arr.map(e => {
        if (/\d+/gi.test(e)) {
            res.push(e);
        } else if (/[\-+*/]/gi.test(e)) {
            while (
                priority[stack[stack.length - 1]] >= priority[e] && stack[stack.length - 1] !== "(") {
                res.push(stack.pop());
            }
            stack.push(e);
        } else if (e === "(") {
            stack.push(e);
        } else if (e === ")") {
            while (stack[stack.length - 1] !== "(") {
                res.push(stack.pop());
            }
            if (stack[stack.length - 1] === "(") {
                stack.pop();
            }
        }
    });
    while (stack.length !== 0) {
        res.push(stack.pop());
    }

    function changeRes(num) {
        calcRes.pop();
        calcRes.pop();
        calcRes.push(num);
    }
    let calcRes = [];
    let divByZero = res.some(e => {
        let calcNum;
        if (/\d+/gi.test(e)) {
            calcRes.push(e);
        }
        switch (e) {
            case "*":
                calcNum = calcRes[calcRes.length - 2] * calcRes[calcRes.length - 1];
                changeRes(calcNum);
                break;
            case "/":
                if (calcRes[calcRes.length - 1] == 0) {
                    return 1;
                }
                calcNum = calcRes[calcRes.length - 2] / calcRes[calcRes.length - 1];
                changeRes(calcNum);
                break;
            case "-":
                calcNum = calcRes[calcRes.length - 2] - calcRes[calcRes.length - 1];
                changeRes(calcNum);
                break;
            case "+":
                calcNum =
                    parseFloat(calcRes[calcRes.length - 2]) +
                    parseFloat(calcRes[calcRes.length - 1]);
                changeRes(calcNum);
                break;
        }
    });

    if (isNaN(calcRes[0])) {
        throw "ExpressionError: Brackets must be paired";
    } else if (divByZero) {
        throw "TypeError: Division by zero.";
    } else {
        return calcRes[0];
    }
}

module.exports = {
    expressionCalculator
}