"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const makeOrdinal_1 = __importDefault(require("./makeOrdinal"));
const isFinite_1 = __importDefault(require("./isFinite"));
const isSafeNumber_1 = __importDefault(require("./isSafeNumber"));
const LESS_THAN_TWENTY = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
];
const TENTHS_LESS_THAN_HUNDRED = [
    "zero",
    "ten",
    "twenty",
    "thirty",
    "forty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety",
];
/**
 * Converts an integer into words.
 * If number is decimal, the decimals will be removed.
 * @example toWords(12) => 'twelve'
 * @param {number|string} number
 * @param {boolean} [asOrdinal] - Deprecated, use toWordsOrdinal() instead!
 * @returns {string}
 */
function toWords(number, asOrdinal) {
    let words;
    const num = parseInt(number.toString(), 10);
    if (!(0, isFinite_1.default)(num)) {
        throw new TypeError("Not a finite number: " + number + " (" + typeof number + ")");
    }
    if (!(0, isSafeNumber_1.default)(num)) {
        throw new RangeError("Input is not a safe number, it’s either too large or too small.");
    }
    words = generateWords(num);
    return asOrdinal ? (0, makeOrdinal_1.default)(words) : words;
}
function generateWords(number, words) {
    let remainder;
    let word;
    // We’re done
    if (number === 0) {
        return !words ? "zero" : words.join(" ").replace(/,$/, "");
    }
    // First run
    if (!words) {
        words = [];
    }
    // If negative, prepend “minus”
    if (number < 0) {
        words.push("minus");
        number = Math.abs(number);
    }
    if (number < 20) {
        remainder = 0;
        word = LESS_THAN_TWENTY[number];
    }
    else if (number < 100 /* NumbersEnum.ONE_HUNDRED */) {
        remainder = number % 10 /* NumbersEnum.TEN */;
        word = TENTHS_LESS_THAN_HUNDRED[Math.floor(number / 10 /* NumbersEnum.TEN */)];
        // In case of remainder, we need to handle it here to be able to add the “-”
        if (remainder) {
            word += "-" + LESS_THAN_TWENTY[remainder];
            remainder = 0;
        }
    }
    else if (number < 1000 /* NumbersEnum.ONE_THOUSAND */) {
        remainder = number % 100 /* NumbersEnum.ONE_HUNDRED */;
        word =
            generateWords(Math.floor(number / 100 /* NumbersEnum.ONE_HUNDRED */)) + " hundred";
    }
    else if (number < 1000000 /* NumbersEnum.ONE_MILLION */) {
        remainder = number % 1000 /* NumbersEnum.ONE_THOUSAND */;
        word =
            generateWords(Math.floor(number / 1000 /* NumbersEnum.ONE_THOUSAND */)) +
                " thousand,";
    }
    else if (number < 1000000000 /* NumbersEnum.ONE_BILLION */) {
        remainder = number % 1000000 /* NumbersEnum.ONE_MILLION */;
        word =
            generateWords(Math.floor(number / 1000000 /* NumbersEnum.ONE_MILLION */)) + " million,";
    }
    else if (number < 1000000000000 /* NumbersEnum.ONE_TRILLION */) {
        remainder = number % 1000000000 /* NumbersEnum.ONE_BILLION */;
        word =
            generateWords(Math.floor(number / 1000000000 /* NumbersEnum.ONE_BILLION */)) + " billion,";
    }
    else if (number < 1000000000000000 /* NumbersEnum.ONE_QUADRILLION */) {
        remainder = number % 1000000000000 /* NumbersEnum.ONE_TRILLION */;
        word =
            generateWords(Math.floor(number / 1000000000000 /* NumbersEnum.ONE_TRILLION */)) +
                " trillion,";
    }
    else if (number <= 9007199254740992 /* NumbersEnum.MAX */) {
        remainder = number % 1000000000000000 /* NumbersEnum.ONE_QUADRILLION */;
        word =
            generateWords(Math.floor(number / 1000000000000000 /* NumbersEnum.ONE_QUADRILLION */)) +
                " quadrillion,";
    }
    words.push(word);
    return generateWords(remainder, words);
}
exports.default = toWords;
