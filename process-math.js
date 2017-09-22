"use strict";
const cache = new Map(),
    defaults = {},
    mathKeys = {};

Object.getOwnPropertyNames(Math).forEach(s => { mathKeys[s.toLowerCase()] = Math[s]; });

function process(exp) {
    if (cache.has(exp))
        return cache.get(exp);

    const result = split(exp)
        .map(s => /^math\(/.test(s) ? math(s.substring(5, s.length - 1)) : s)
        .join("");

    cache.set(exp, result);
    return result;
}

function split(exp) {
    const array = [];
    let last = 0;
    while (last < exp.length) {
        const index = exp.indexOf("math(", last);
        array.push(exp.substring(last, index < 0 ? exp.length : index));
        if (index < 0) break;

        last = closingBracket(exp, index + 4) + 1;
        array.push(exp.substring(index, last).replace(/\s+\(/, "(").toLowerCase());
    }
    return array;
}

function math(string) {
    if (cache.has(string))
        return cache.get(string);
    const cacheKey = string;

    if (string.includes('math('))
        string = process(string);

    let start = string.indexOf("(");
    while (start >= 0) {
        const end = closingBracket(string, start),
            functionName = getMathFunctionName(string, start);

        let value = math(string.substring(start + 1, end).trim());
        if (functionName.name)
            value = applyMathFunction(functionName.name, value);

        string = string.substring(0, functionName.index) + value + string.substring(end + 1);
        start = string.indexOf('(');
    }
    string = replaceContants(string);

    if (string.includes(",")) {
        string = string.split(",")
            .map(s => s.trim())
            .filter(s => !Number.isNaN(parseFloat(s)))
            .join(",");
    } else if (evalable(string))
        string = eval(string);

    string = string === undefined || string === null ? "NaN" : string.toString();
    cache.set(cacheKey, string);
    return string;
}

const mdasRegex = /^[()\d\/*+-.%]$/;

function evalable(string) {
    if (!string)
        return false;
    for (let c of string)
        if (!mdasRegex.test(c))
            return false;

    return true;
}
const nonMathCharsRegex = /^[()\/%*+-,]$/g;

function replaceContants(string) {
    if (string.trim().length === 0 || numberTest.test(string))
        return string;

    const array = [];
    let start = 0,
        i = -1;

    while (i++ < string.length) {
        if (nonMathCharsRegex.test(string[i])) {
            let s = string.substring(start, i);
            if (string[i] === '(')
                array.push(s + string[i]);
            else {
                array.push(s);
                array.push(string[i]);
            }
            start = i + 1;
        }
    }
    if (start < string.length)
        array.push(string.substring(start, string.length));

    return array.map(s => {
        if (s.trim().length === 0 || nonMathCharsRegex.test(s) || s.includes("("))
            return s;
        return findConstant(s);
    }).join("");
}

const numberTest = /^[+-]?(?:\d+|\d*\.\d+|\d+\.\d*|\d+e\d+)$/;

function findConstant(s) {
    s = s.trim();
    if (numberTest.test(s))
        return s;

    let c = defaults[s];
    if (c !== undefined && !(c instanceof Function))
        return c;
    c = mathKeys[s];
    if (c === undefined)
        throw new Error("Constant not found: " + s);

    if (c instanceof Function)
        throw new Error("not a constant: " + s);

    return c;
}

function applyMathFunction(functionName, value) {
    let fn = defaults[functionName] instanceof Function ? defaults[functionName] : mathKeys[functionName];
    if (!(fn instanceof Function))
        throw new Error("unknown function name: " + functionName);

    return fn.apply(null, value.split(",").filter(s => s.trim().length !== 0).map(parseFloat)).toString();
}

const mathNameRegex = /^[\s\/%*+-]$/;

function getMathFunctionName(string, start) {
    let name = "";
    let index = start;
    while (index-- > 0) {
        let e = string[index];
        if (mathNameRegex.test(e))
            break;
        name = e + name;
    }
    index++;
    if (index < 0) index = 0;
    return { name, index };
}

function closingBracket(exp, start) {
    let lastClose = 1;
    while (start++ < exp.length) {
        const b1 = exp[start] === '(',
            b2 = exp[start] === ')';

        if (b1 || b2) {
            if (b1)
                lastClose++;
            if (b2)
                lastClose--;

            if (lastClose === 0)
                return start;
        }
    }
    throw new Error("closing bracket not found in " + exp.substring(start));
}

// ------------------------------------------------------

module.exports = {
    set(opts) {
        opts = opts || {};
        for (let k in opts) {
            if (opts.hasOwnProperty(k))
                defaults[k.toLowerCase()] = opts[k];
        }
    },
    process
};