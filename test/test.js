const test = require('ava');
const Next = require('../src');

test(t => {
  Next({
    start: () => {
      return [1,2,3];
    },
    data: (d) => {
      console.log(d)
      return d;
    },
    next: (d) => ({
      start: () => {
        console.log('next', d);
      },
    }),
  });
  t.true(true);
});
