export const getNutritionFromFoodData = (foodData: any) => {
  const TempArr = [];

  const KeyArr: any = Object.keys(foodData);
  for (let i = 0; i < KeyArr.length; i++) {
    if (KeyArr[i].includes("g")) {
      TempArr.push(KeyArr[i]);
    }
  }

  const NutritionArr: any = [];
  for (let i = 0; i < KeyArr.length; i++) {
    if (KeyArr[i].includes("g")) {
      const TempObj: any = {
        Name: KeyArr[i],
        Value: foodData[KeyArr[i]],
      };
      if (!TempObj.Value) TempObj.Value = 0;
      NutritionArr.push(TempObj);
    }
  }

  console.log(NutritionArr);
  return NutritionArr;
};
