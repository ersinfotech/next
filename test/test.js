import test from 'ava';
import Next from '../src';

test('normal flow', async t => {
  let steps = [];

  await Next({
    for: () => {
      const list = [1, 2];
      steps.push(`for ${list}`);
      return list;
    },
    each: (d) => {
      steps.push(`each ${d}`);
      return {
        for: () => {
          steps.push(`each for ${d}`);
          return d;
        },
        each: (d) => {
          steps.push(`each each ${d}`);
          return d;
        },
        next: () => {
          steps.push(`each next ${d}`);
        },
      }
    },
    next: () => {
      steps.push('next');
    },
  });
  t.deepEqual(steps, [
    'for 1,2',
    'each 1',
    'each for 1',
    'each each 1',
    'each next 1',
    'each 2',
    'each for 2',
    'each each 2',
    'each next 2',
    'next',
  ]);
});

test('shouldNext', async t => {
  let steps = [];

  await Next({
    for: () => {
      const list = [1, 2];
      steps.push(`for ${list}`);
      return list;
    },
    each: (d) => {
      steps.push(`each ${d}`);
      return {
        for: () => {
          steps.push(`each for ${d}`);
          return d;
        },
        each: (data) => {
          steps.push(`each each ${data}`);
          return d;
        },
        shouldNext: () => {
          if (d === 1) {
            return true;
          }
        },
        next: () => {
          steps.push(`each next ${d}`);
        },
      };
    },
    shouldNext: () => {
      return false;
    },
    next: () => {
      steps.push('next');
    },
  });
  t.deepEqual(steps, [
    'for 1,2',
    'each 1',
    'each for 1',
    'each each 1',
    'each next 1',
    'each 2',
    'each for 2',
    'each each 2',
  ]);
});

test('catch error', async t => {
  let steps = [];

  await Next({
    for: () => {
      const list = [1, 2];
      steps.push(`for ${list}`);
      return list;
    },
    each: (d) => {
      steps.push(`each ${d}`);
      if (d === 2) {
        throw new Error(d);
      }
      return {
        for: () => {
          steps.push(`each for ${d}`);
          return d;
        },
        each: (d) => {
          steps.push(`each each ${d}`);
          return {
            next: () => {
              if (d == 1) {
                throw new Error(d);
              }
            },
          };
        },
        catch: (err) => {
          steps.push(`each catch`);
        },
        next: () => {
          steps.push(`each next ${d}`);
        },
      };
    },
    next: () => {
      steps.push('next');
    },
    catch: (err) => {
      steps.push('catch')
    },
  });
  t.deepEqual(steps, [
    'for 1,2',
    'each 1',
    'each for 1',
    'each each 1',
    'each catch',
    'each 2',
    'catch'
  ]);
});
