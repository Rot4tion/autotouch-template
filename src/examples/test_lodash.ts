// lodash is a modern JavaScript utility library delivering modularity, performance & extras, which has been preset in AutoTouch
// Look at https://lodash.com/ to know it more
import _ from "lodash";

export const testLodash = () => {
  const result1 = _.defaults(
    { a: 1 },
    { a: 3, b: 2 }
  );
  // → { 'a': 1, 'b': 2 }
  alert(result1);

  const result2 = _.partition(
    [1, 2, 3, 4],
    (n) => n % 2
  );
  // → [[1, 3], [2, 4]]
  alert(result2);
};
