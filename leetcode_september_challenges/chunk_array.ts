function chunk<T>(arr: T[], size: number): T[][] {
  let finalArray: T[][] = [];
  arr.forEach((element, index) => {
    if (index % size === 0) {
      finalArray.push([]);
    }
    finalArray.at(-1)!.push(element);
  });
  return finalArray;
}
