interface tupleInterface {
  labels: [string, string];
}

function printConsole(params: tupleInterface) {
  console.log(params);
}

printConsole({ labels: ['test1'] });
printConsole({ labels: ['test1', 'test2'] });
printConsole({ labels: ['test1', 'test2', 'test3'] });
