export const messages = {
    //Error messages
    ADMIN_NOT_FOUND: 'Admin not found !',
    ADMIN_LIST_EMPTY: 'There are no admins in the system !',
    AMQP_NOT_DEFINED: 'AMQP_URL is not defined in the configuration',
    ADMIN_ID_NOT_PROVIDED: 'Admin ID is not provided !',

    //validate messages
    ID_INVALID: 'Invalid ID provided !',
    EMAIL_INVALID: 'Email is required and must follow format: name@example.com !',
    PASSWORD_INVALID: 'Password is required and must be a string !',
    FIRST_NAME_INVALID: 'First name is required and contain only letters (a-zA-Z)!',
    LAST_NAME_INVALID: 'Last name is required and contain only letters (a-zA-Z)!',
    PHONE_INVALID: 'Invalid phone number !',
    ROLE_INVALID: 'Role is required !',
    DATE_OF_BIRTH_INVALID: 'Date of birth is required !',

    //Success messages
    ADMIN_CREATED: 'Admin created successfully !',
    ADMIN_UPDATED: 'Admin updated successfully !',
    ADMIN_DELETED: 'Admin deleted successfully !',

    // fail messages
    ADMIN_CREATION_FAILED: 'Failed to create admin !',
    ADMIN_UPDATE_FAILED: 'Failed to update admin !',
}