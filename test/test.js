import test from 'ava';
import Next from '../src';

test('normal flow', async t => {
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
        return d;
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

test('shouldNext', async t => {
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
    eachShouldNext: (d) => {
      if (d === 1) {
        return true;
      }
    },
    eachNext: (d) => ({
      start: () => {
        steps.push(`eachNext start ${d}`);
        return d;
      },
      each: (d) => {
        steps.push(`eachNext each ${d}`);
        return d;
      },
      next: () => {
        steps.push(`eachNext next ${d}`);
      },
    }),
    shouldNext: () => {
      return false;
    },
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
  ]);
});

test('catch error', async t => {
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
        if (d === 2) {
          throw new Error(d);
        }
        return d;
      },
      each: (d) => {
        steps.push(`eachNext each ${d}`);
        if (d == 1) {
          throw new Error(d);
        }
        return d;
      },
      eachCatch: (err) => {
        steps.push(`eachNext eachCatch`);
      },
      next: () => {
        steps.push(`eachNext next ${d}`);
      },
    }),
    shouldNext: () => {
      return false;
    },
    next: () => {
      steps.push('next');
    },
    catch: (err) => {
      steps.push('catch')
    },
  });
  t.deepEqual(steps, [
    'start 1,2',
    'each 1',
    'eachNext start 1',
    'eachNext each 1',
    'eachNext eachCatch',
    'eachNext next 1',
    'each 2',
    'eachNext start 2',
    'catch'
  ]);
});

test('no each', async t => {
  let steps = [];

  await Next({
    start: () => {
      const list = [1, 2];
      steps.push(`start ${list}`);
      return list;
    },
    next: () => {
      steps.push('next');
    },
  });
  t.deepEqual(steps, [
    'start 1,2',
    'next',
  ]);
});
