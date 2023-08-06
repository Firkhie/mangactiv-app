const removeDuplicateIds = (obj) => {
  const existingValues = []
  const reverseSortedKeys = Object.keys(obj).sort((v, n) => n - v);

  for (const key of reverseSortedKeys) {
    obj[key] = obj[key].filter(v => {
      if (existingValues.includes(v)) return false;
      else {
        existingValues.push(v);
        return true;
      }
    })
  };
  return obj;
};

const obj1 = {
  "1": ["C", "F", "G"],
  "2": ["A", "B", "C"],
  "3": ["A", "B", "D"],
};
const result1 = removeDuplicateIds(obj1);
console.log(result1)