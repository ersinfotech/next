Next
=========================

```
type Next = {
  start: () => {
    return [] || {};
  },

  each: (d) => {
    return {};
  },
  eachShouldNext: (data) => {
    return true || false;
  }
  eachNext: (data) => {
    return Next;
  },
  eachCatch: (err) => {
    // handle err in each phase
  },

  shouldNext: () => {
    return true || false;
  }
  next: () => {
    return Next;
  },
  catch: (err) => {
    // handle err entire phase
  },

}
```
