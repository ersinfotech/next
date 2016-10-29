import Promise from 'bluebird';

export default async function Next({
  start,
  data,
  shouldNext,
  next,
  end,
}) {
  if (!start) {
    return;
  }

  const results = await start();

  _.each(_.castArray(results), (result) => {
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
  })

  if (end) {
    await Next(end());
  }
}
