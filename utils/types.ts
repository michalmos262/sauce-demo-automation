export enum UserType {
  STANDARD = 'standard_user',
  LOCKED_OUT = 'locked_out_user',
  PROBLEM = 'problem_user',
  PERFORMANCE = 'performance_glitch_user',
}

export interface Credentials {
  username: string;
  password: string;
}

export enum SortOption {
  NAME_ASC = 'az',
  NAME_DESC = 'za',
  PRICE_ASC = 'lohi',
  PRICE_DESC = 'hilo',
}