const errorThrower = (statusCode, message) => {
  const error = {
    statusCode,
    message,
  };
  throw error;
}

module.exports = errorThrower;