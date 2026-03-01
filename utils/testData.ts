import { CheckoutInfo, Credentials, UserType } from './types';

const password = process.env.PASSWORD ?? 'secret_sauce';

export const USERS: Record<UserType, Credentials> = {
  [UserType.STANDARD]: {
    username: process.env.STANDARD_USER ?? 'standard_user',
    password
  },
  [UserType.LOCKED_OUT]: {
    username: process.env.LOCKED_OUT_USER ?? 'locked_out_user',
    password
  },
  [UserType.PROBLEM]: {
    username: process.env.PROBLEM_USER ?? 'problem_user',
    password
  },
  [UserType.PERFORMANCE]: {
    username: process.env.PERFORMANCE_USER ?? 'performance_glitch_user',
    password
  }
};

export const ERROR_MESSAGES = {
  lockedOut: 'Epic sadface: Sorry, this user has been locked out.',
  usernameRequired: 'Epic sadface: Username is required',
  passwordRequired: 'Epic sadface: Password is required',
  credentialsMismatch: 'Epic sadface: Username and password do not match any user in this service',
  firstNameRequired: 'Error: First Name is required',
  lastNameRequired: 'Error: Last Name is required',
  postalCodeRequired: 'Error: Postal Code is required',
};

export const VALID_CHECKOUT_INFO: CheckoutInfo = {
  firstName: 'Jane',
  lastName: 'Doe',
  postalCode: '12345',
};

export const INCOMPLETE_CHECKOUT_INFO: Record<string, CheckoutInfo> = {
  missingFirstName: { firstName: '', lastName: 'Doe', postalCode: '12345' },
  missingLastName: { firstName: 'Jane', lastName: '', postalCode: '12345' },
  missingPostalCode: { firstName: 'Jane', lastName: 'Doe', postalCode: '' },
};