export const getNutritionFromFoodData = (foodData: any) => {
  const TempArr = [];

  const KeyArr: any = Object.keys(foodData);
  for (let i = 0; i < KeyArr.length; i++) {
    if (KeyArr[i].includes("g")) {
      TempArr.push(KeyArr[i]);
      console.log(TempArr[i]);
    }
  }

  const NutritionArr: any = [];
  let Maxvalue = 0;

  for (let i = 0; i < KeyArr.length; i++) {
    if (KeyArr[i].includes("g")) {
      const TempObj: any = {
        Name: KeyArr[i],
        Value: foodData[KeyArr[i]],
      };
      if (!TempObj.Value) TempObj.Value = 0;
      if (Maxvalue < TempObj.Value) Maxvalue = TempObj.Value;
      NutritionArr.push(TempObj);
    }
  }

  for (let i = 0; i < NutritionArr.length; i++) {
    if (NutritionArr[i].Value === Maxvalue) {
      NutritionArr[i].Max = true;
    } else {
      NutritionArr[i].Max = false;
    }
  }

  return NutritionArr;
};
