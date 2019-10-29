/* eslint-disable @typescript-eslint/no-unused-vars */

// card number in a comment 1234123412341234

const doSomething = () => {
  const cardNumberNoSpaces = '1234123412341234';
  const cardNumberSingleSpace = '1234 1234 1234 1234';
  const cardNumberSingleDash = '1234-1234-1234-1234';
  const cardNumberMultipleSpaces = '1234  1234  1234  1234';
  const cardNumberMultipleDashes = '1234--1234--1234--1234';
  const cardNumberInString = 'This is a card number: 1234123412341234';
  const cardNumberInStringNoSpaces = 'text1234123412341234text';
};

export default doSomething;
