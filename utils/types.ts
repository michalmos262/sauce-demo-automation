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