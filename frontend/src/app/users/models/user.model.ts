/**
 * Base class for users.
 */
class UserAuthBase {
    email: string;
    password: string;
}

/**
 * Model representing confirmation request data.
 */
class UserConfirmationRequest extends UserAuthBase {
    phoneNumber: string;
    phoneNumberIndicator: string;
    confirmPassword: string;
    token: string;
}

/**
 * Model representing logged user.
 */
class LoggedUser {
  email: string;
  username: string;
  userInformation: {
    email? : string;
    name?: string; 
  };
  // Other fields if any
}
/**
 * Model representing user update request data.
 */
class EditUserInformationRequest {
    name: string;
    password: string;
    confirmPassword: string;
    phoneNumber: string;
    phoneNumberIndicator: string;
}

/**
 * Model representing user creation request data.
 */
class NewUserRequest {
  email: string;
  name: string;
  roleName: string;
}

export { UserAuthBase, UserConfirmationRequest, LoggedUser, EditUserInformationRequest, NewUserRequest }
