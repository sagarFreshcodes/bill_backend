function transformObjectWith_values(inputObject) {
  const outputObject = {};

  for (const key in inputObject) {
    if (inputObject.hasOwnProperty(key)) {
      const values = inputObject[key];

      values.forEach(value => {
        const newKey = `${value}_values`;
        outputObject[newKey] = value;
      });
    }
  }

  return outputObject;
}

// Example usage
const inputObject = { category_name_values: ['dda', "ddddfws"], id_values: [1] };
const outputObject = transformObject(inputObject);

console.log(outputObject);
