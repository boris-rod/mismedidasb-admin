import { EatBalanceSummary } from './eat-balance-summary';
import { UserHealthParameters } from './user-health-parameters';
export interface UserPlanSummary {
  planDateTime: Date;
  userEatHealtParameters: UserHealthParameters;
  eatBalancedSummary: EatBalanceSummary;
}
