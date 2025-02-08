class validations {
  validateText = (text) => text.trim() !== "";
  validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  validateUsername = (user) => {
    const usernameRegex = /^[a-zA-Z0-9_.-]+$/;
    return usernameRegex.test(user);
  };
  validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])[A-Za-z\d!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]{8,128}$/;
    return passwordRegex.test(password);
  };
  validatePasswords = (password, confirmPassword) =>
    password === confirmPassword;
}

const formValidation = new validations();
export default formValidation;
