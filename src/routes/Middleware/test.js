function modifyCategoryIds(firstArray, secondArray) {
  // Create a map for quick lookup of objects in the second array by name
  const secondArrayMap = secondArray.reduce((map, obj) => {
    map[obj.name] = obj;
    return map;
  }, {});

  // Modify category_id and filter out unmatched objects
  const modifiedArray = firstArray
    .map(obj => {
      const matchingObject = secondArrayMap[obj.category_name];
      if (matchingObject) {
        obj.category_id = [matchingObject.id];
        return obj;
      } else {
        return null; // Remove unmatched objects
      }
    })
    .filter(Boolean); // Filter out null values

  return modifiedArray;
}

// Example usage
const firstArray = [
  {
    isRelation: false,
    category_id: [],
    name: 'Vehicle ID',
    is_require: true,
    is_field: 'Text',
    status: 'active',
    position: '',
    category_name: 'null'
  },
  {
    isRelation: false,
    category_id: [],
    name: 'Vehicle Type',
    is_require: true,
    is_field: 'Dropdown',
    status: 'active',
    position: '',
    category_name: 'null'
  }
  ,
  {
    isRelation: false,
    category_id: [],
    name: 'Vehicl',
    is_require: true,
    is_field: 'Dropdown',
    status: 'active',
    position: '',
    category_name: 'xa'
  }
];

const secondArray = [
  {
    id: 1,
    name: 'null'
  },
  {
    id: 2,
    name: 'Vehicle Type'
  }
];

const result = modifyCategoryIds(firstArray, secondArray);
console.log(result);
