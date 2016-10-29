const _ = require('lodash');

const Next = async ({
  start,
  data,
  shouldNext,
  next,
  end,
}) => {
  if (!start) {
    return;
  }

  const results = _.castArray(await start());

  for (const result of results) {
    if (!data) {
      return;
    }

    const d = await data(result);
    if (shouldNext) {
      const shouldNextOrNot = await shouldNext(d);
      if (!shouldNextOrNot) {
        return;
      }
    }

    if (next) {
      await Next(next(d));
    }
  }

  if (end) {
    await Next(end());
  }
}

module.exports = Next;
