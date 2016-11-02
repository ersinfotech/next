Next
=========================

```
type Next = {
  for: () => {
    return [] || {};
  },

  each: (d) => {
    return Next;
  },

  shouldNext: () => {
    return true || false;
  }
  
  next: () => {
    return Next;
  },

  catch: (err) => {
    // handle err in entire phase
  },
}
```
