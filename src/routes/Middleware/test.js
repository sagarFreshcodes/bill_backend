const AddAdditionalField = () => {
  const data = [
    {
      id: 27,
      category_name: "cate15",
    },
    {
      id: 28,
      category_name: "cate14",
    },
  ];

  const additionalKey = ["value", "text", "label"];
  data.map((i, index) =>
    additionalKey.map((key) => data[index][key]=i["category_name"]   )
  );

  console.log(data);
};
AddAdditionalField()