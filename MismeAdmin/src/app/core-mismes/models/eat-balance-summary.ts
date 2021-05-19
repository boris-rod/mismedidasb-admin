export interface EatBalanceSummary {
  currentCaloriesSum: number;
  currentProteinsSum: number;
  currentFatSum: number;
  currentFiberSum: number;
  currentCarbohydratesSum: number;

  isBreakfastKcalOk: boolean;
  isSnack1KcalOk: boolean;
  isLunchKcalOk: boolean;
  isSnack2KcalOk: boolean;
  isDinnerKcalOk: boolean;

  breakfastKcalPer: number;
  snack1KcalPer: number;
  lunchKcalPer: number;
  snack2KcalPer: number;
  dinnerKcalPer: number;

  isKcalAllOk: boolean;
  isProteinsOk: boolean;
  isCarbohydratesOk: boolean;
  isFatOk: boolean;
  isFiberOk: boolean;

  proteinPer: number;
  carbohydratesPer: number;
  fatPer: number;
  fiberPer: number;

  isBalanced: boolean;
}
