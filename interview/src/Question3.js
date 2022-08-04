const Question3 = () => {
  const adder = function (x) {
    return function (y) {
      return x + y;
    };
  };
  const add5 = adder(5);
  console.log(add5(7));
  console.log(add5(10));

  return <div>Question3</div>;
};

export default Question3;
