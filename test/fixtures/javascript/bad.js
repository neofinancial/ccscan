/* eslint-disable @typescript-eslint/no-unused-vars */

// card number in a comment 5555554240233167
// two card numbers in a comment 5555554240233167 1234123412341234

const doSomething = () => {
  const cardNumberNoSpaces = '5555554240233167';
  const cardNumberSingleSpace = '5555 5542 4023 3167';
  const cardNumberSingleDash = '5555-5542-4023-3167';
  const cardNumberMultipleSpaces = '5555  5542  4023  3167';
  const cardNumberMultipleDashes = '5555--5542--4023--3167';
  const cardNumberInString = 'This is a card number: 5555554240233167';
  const cardNumberInStringNoSpaces = 'text5555554240233167text';
};

module.export = doSomething;
