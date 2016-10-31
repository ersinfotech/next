import _ from 'lodash';

const Next = async ({
  start,

  each,
  shouldEachNext,
  eachNext,
  eachCatch,

  shouldNext,
  next,
  catch: _catch,
} = {}) => {
  try {
    if (!start) {
      return;
    }

    const results = _.chain(await start())
      .castArray()
      .compact()
      .value();

    for (const result of results) {
      try {
        if (!each) {
          break;
        }
        const d = await each(result);

        if (shouldEachNext) {
          const shouldEachNextOrNot = await shouldEachNext(d);
          if (!shouldEachNextOrNot) {
            continue;
          }
        }
        if (eachNext) {
          await Next(eachNext(d));
        }
      } catch (err) {
        if (eachCatch) {
          eachCatch(err);
        } else {
          throw err;
        }
      }
    }

    if (shouldNext) {
      const shouldNextOrNot = await shouldNext();
      if (!shouldNextOrNot) {
        return;
      }
    }
    if (next) {
      await Next(next());
    }
  } catch (err) {
    if (_catch) {
      _catch(err);
    } else {
      throw err;
    }
  }
}

export default Next;
