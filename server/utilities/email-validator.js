const emailValidatorPromise = import('node-email-verifier');

async function validateEmailWithMx(email) {
  try {
    const emailValidator = (await emailValidatorPromise).default;
    const isValid = await emailValidator(email);
    if(isValid)
        return 'valid';
  } catch (error) {
    console.error('Error validating email with MX checking:', error);
  }
}

module.exports = validateEmailWithMx;