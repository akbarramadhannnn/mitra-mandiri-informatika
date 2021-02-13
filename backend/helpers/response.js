const response = (success, status, message, result) => {
  return {
    success: success,
    statusCode: status,
    message: message,
    result: result,
  };
};

module.exports = response;
