import test from 'ava';
import Next from '../src';

test(async t => {
  let steps = [];

  await Next({
    start: () => {
      const list = [1, 2];
      steps.push(`start ${list}`);
      return list;
    },
    each: (d) => {
      steps.push(`each ${d}`);
      return d;
    },
    eachNext: (d) => ({
      start: () => {
        steps.push(`eachNext start ${d}`);
        return d;
      },
      each: (d) => {
        steps.push(`eachNext each ${d}`);
      },
      next: () => {
        steps.push(`eachNext next ${d}`);
      },
    }),
    next: () => {
      steps.push('next');
    },
  });
  t.deepEqual(steps, [
    'start 1,2',
    'each 1',
    'eachNext start 1',
    'eachNext each 1',
    'eachNext next 1',
    'each 2',
    'eachNext start 2',
    'eachNext each 2',
    'eachNext next 2',
    'next',
  ]);
});
