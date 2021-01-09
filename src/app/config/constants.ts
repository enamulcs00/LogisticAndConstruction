export const ValidationMessage = {
    email: {
        placeholder: 'Enter Email Id',
        required: '*Email id is required.',
        valid: '*Please enter valid email id.',
    },
    password: {
        placeholder: 'Password',
        required: '*Password is required.',
        valid: 'Password should have minimum 8, maximum 16 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character.',

        old: '*Please enter old password.',
        new: '*Please enter new password.',
        confirm: '*Please enter confirm password.',
        confirmNew: '*Please enter confirm new password.',
        matched: 'Old password should not be same as password.',
        misMatch: 'Confirm password should be same as password.',
        matchedNew: 'Old password should not be same as new password.',
        misMatchNew: 'Confirm password should be same as new password.',
    },
    name: {
        placeholder: 'Name',
        required: '*Name is required.',
        valid: '*Please enter valid name.',
        minLength: 'Name must be at least 2 characters long.',
        maxLength: 'Name maximum 60 characters allowed.',
    },
    firstName: {
        placeholder: 'First Name',
        required: '*First Name is required.',
        valid: '*Please enter valid first name.',
        minLength: 'First Name must be at least 2 characters long.',
        maxLength: 'First Name maximum 60 characters allowed.',
    },
    lastName: {
        placeholder: 'Last Name',
        required: '*Last Name is required.',
        valid: '*Please enter valid last name.',
        minLength: 'Last Name must be at least 2 characters long.',
        maxLength: 'Last Name maximum 60 characters allowed.',
    },
    phone: {
        placeholder: 'Phone Number',
        required: '*Phone number is required.',
        valid: '*Please enter valid phone number.',
        minLength: 'Phone number must be at least 7 digit long.',
        maxLength: 'Phone number maximum 15 digit allowed.'
    },
    countryCode: {
        required: '*Please select country code'
    },
    mobile: {
        placeholder: 'Mobile Number',
        required: '*Mobile number is required.',
        valid: '*Please enter valid mobile number.',
        minLength: 'Mobile number must be at least 7 digit long.',
        maxLength: 'Mobile number maximum 15 digit allowed.'
    },
    address: {
        placeholder: 'Address',
        required: '*Address is required.'
    },
    state: {
        placeholder: 'State',
        required: '*State is required.'
    },
    city: {
        placeholder: 'City',
        required: '*City is required.'
    },
    pinCode: {
        placeholder: 'Pin Code',
        required: '*Pin Code is required.',
        valid: '*Please enter valid number.',
    },
    agentId: {
        placeholder: 'Agent Id',
        required: '*Agent Id is required.'
    },
    balance: {
        placeholder: 'Balance',
        required: '*Balance is required.',
        valid: '*Please enter valid number.',
    },
    kyc: {
        placeholder: 'KYC',
        required: '*KYC is required.'
    }
}

// error message
export const ErrorMessage = {
    error_401: 'Unauthorized',
    error_404: 'Http failure response',
    somethingWentWrong: 'Something Went Wrong.'
}

// regular expression 
export const RegEx = {
    name: /^[A-Za-z][A-Za-z ]*$/,
    email: '[a-zA-Z0-9.-]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,5}',
    paswdRegEx: '(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,16}',
    phoneNo: /^[1-9][0-9]{7,15}$/,
    number: /^[0-9]*$/
}