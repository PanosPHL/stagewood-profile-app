function validateUsername(username) {
  return username.length > 5 && username.includes(' ');
}

function validateEmail(email) {
  return email.length > 5 && /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
}

function validateName(name) {
  return name.length > 5 && !/[^a-zA-Z|\s]/g.test(name);
}
