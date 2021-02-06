function validateUsername(username) {
  return username.length >= 5 && !username.includes(' ');
}

function validateEmail(email) {
  return email.length >= 5 && /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
}

function validateName(name) {
  return name.length >= 5 && !/[^a-zA-Z|\s]/g.test(name);
}

function validatePassword(password) {
  return password.length >= 5;
}

function validateProfilePicture(profilePicture) {
  return profilePicture.includes('data:image/jpeg;base64');
}

function validateSignUp(username, email, name, password) {
  const validationErrors = [];

  if (!validateUsername(username)) {
    validationErrors.push({
      Username:
        'Please provide a username of at least 5 characters with no spaces',
    });
  }
  if (!validateEmail(email)) {
    validationErrors.push({ Email: 'Please provide a valid email' });
  }
  if (!validateName(name)) {
    validationErrors.push({
      Name: 'Please provide a name of at least 5 alphabetic characters',
    });
  }
  if (!validatePassword(password)) {
    validationErrors.push({
      Password: 'Please provide a password of at least 5 characters',
    });
  }

  return validationErrors;
}

module.exports = {
  validateSignUp,
};
