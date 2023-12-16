//   @ts-ignore
const AddAdditionalField = ({ data, additionalKey, choosenKey }) => {
  data.map((i: any, index: number) =>
    //   @ts-ignore
    additionalKey.map((key) => (data[index][key] = i[choosenKey]))
  );

  return data;
};
// AddAdditionalField()
