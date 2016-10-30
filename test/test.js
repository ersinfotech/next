const test = require('ava');
const Next = require('../src');

test(t => {
  Next({
    start: () => {
      const list = [1, 2, 3];
      console.log('start', list);
      return list;
    },
    data: (d) => {
      console.log('data', d);
      return d;
    },
    next: (d) => ({
      start: () => {
        console.log('next start', d);
        return d;
      },
      data: (d) => {
        console.log('next data', d);
      },
      end: () => {
        console.log('next end');
      },
    }),
    end: () => {
      console.log('end');
    },
  });
  t.true(true);
});
