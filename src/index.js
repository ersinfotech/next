import _ from 'lodash';

const Next = async ({
  for: _for,
  each,
  shouldNext,
  next,
  catch: _catch,
} = {}) => {
  try {
    if (!_for) {
      return;
    }

    const results = _.chain(await _for())
      .castArray()
      .compact()
      .value();

    for (const result of results) {
      if (!each) {
        break;
      }
      const eachNext = await each(result);
      await Next(eachNext);
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
