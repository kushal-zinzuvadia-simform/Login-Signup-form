# Practical-07 Create a signup and login form

## Sign up form will contain following:

- First Name field
- Last Name field
- Email field
- City field
- State field
- Address field
- Age field
- Gender field
- Contact Number field
- User Profile (Image) field
- Birth date field
- Password field (should be mix of alphanumeric characters with at least special character required)
- Confirm Password field (both password and confirm password should match)
- A checkbox for user agreement to the website's privacy policy and legal terms
- A submit button that says "Signup"
- "Already a member? Login here" link that redirects the users to Login page

## Login form will contain the following:

- Email
- Password
- A submit button that says "Login"
- "Not a member? Signup here" link that redirects the users to Signup page

## Requirements:

- Fields should show proper errors (in red label preferably) to indicate that there was an error when user tries to submit the form with incorrect data
- If user corrects the incorrect fields, the errors should go away in real time without form submission
- If users successfully completes the "Signup" flow, they should be redirected to login page where they have to enter the correct email ID and password.
- If the credentials are incorrect during "Login" flow, we should show a proper error and do not allow user to enter our App.
- If users successfully completes the "Login" flow, they should be redirected to Profile component where their details along with their profile is visible to them
- If user has completed the login flow then it should be persisted, on a page refresh, we should not ask user to login again. They should be able to see their profile directly
