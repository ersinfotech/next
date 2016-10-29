import Next from '../src';

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
