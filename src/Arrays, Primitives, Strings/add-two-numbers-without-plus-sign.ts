function addUsingBitwiseLogic(num1:number, num2:number):number {
  while (num2 !== 0) {
    let sum = num1 ^ num2;
    let carry = (num1 & num2) << 1;

    num1 = sum;
    num2 = carry;
  }

  return num1;
}