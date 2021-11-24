function buildName(firstName: string, lastName = 'Smith') {
  return firstName + ' ' + lastName;
}

console.log(buildName('Bob'));
console.log(buildName('Bob', undefined));
console.log(buildName('Bob', 'Adams'));
