function buildName(firstName, lastName) {
    if (lastName === void 0) { lastName = 'Smith'; }
    return firstName + ' ' + lastName;
}
console.log(buildName('Bob'));
console.log(buildName('Bob', undefined));
console.log(buildName('Bob', 'Adams'));
