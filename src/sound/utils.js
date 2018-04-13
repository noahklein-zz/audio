export function* enumerate(iter) {
  let a = 0;
  for (const x of iter) {
    yield [a++, x];
  }
}

export function* findAll(re, text) {
  while (true) {
    const match = re.exec(text);
    if (!match) {
      break;
    }
    yield match;
  }
}

export async function sleep(howLong) {
  return new Promise(resolve => setTimeout(resolve, howLong));
}

export function* range(lo, hi, step = 1) {
  if (lo && !hi) {
    hi = lo;
    lo = 0;
  }
  for (let i = lo; i < hi; i += step) {
    yield i;
  }
}

export function* take(howMany, iter) {
  for (const x of iter) {
    if (howMany === 0) {
      break;
    }
    howMany--;
    yield x;
  }
}
