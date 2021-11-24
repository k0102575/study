interface Counter {
  (start: number): string;
  interval: number;
  reset(): void;
}

function getCounter(): Counter {
  let counter = ((start: number) => {}) as Counter;
  counter.interval = 123;
  counter.reset = function () {};
  return counter;
}

let c = getCounter();
console.log('111111', c);
c(10);
c.reset();
c.interval = 5.0;

console.log('222222', c);
