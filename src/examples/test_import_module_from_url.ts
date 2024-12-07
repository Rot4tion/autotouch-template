//@ts-ignore
import _ from "https://cdn.jsdelivr.net/npm/lodash@4.17.15/lodash.min.js";
export const testImportModuleFromUrl = () => {
  // *Only HTTPS is supported while using remote url*

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
