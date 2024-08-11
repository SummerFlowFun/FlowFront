const getNutritionFromFoodData = (foodData: any) => {
  const TempArr = [];

  const KeyArr = Object.keys(foodData);
  for (let i = 0; i < KeyArr.length; i++) {
    if (KeyArr[i].includes("g")) {
      // TempArr.push({KeyArr[i]:foodData[KeyArr[i]]});
    }
  }
};
