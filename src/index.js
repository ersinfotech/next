import _ from 'lodash';

const Next = async ({
  for: _for,
  each,
  shouldNext,
  next,
  catch: _catch,
} = {}) => {
  try {
    if (_for && each) {
      const results = _.castArray(await _for());
      for (const [index, result] of results.entries()) {
        try {
          const eachNext = await each(result, index);
          await Next(eachNext);
        } catch (err) {
          if (_catch) {
            await _catch(err);
          } else {
            throw err;
          }
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
      await Next(await next());
    }
  } catch (err) {
    if (_catch) {
      await _catch(err);
    } else {
      throw err;
    }
  }
}

export default Next;
