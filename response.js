module.exports = {
    success: (response, serverResponse, statusCode = 200) => {
        return response.status(statusCode).json(serverResponse);
    },
    error: (response, statusCode, message) => {
        return response.status(statusCode).json({
            code: statusCode,
            error: message
        });
    },
    dbError: (response, statusCode, message) => {
        return response.status(statusCode).json({
            code: statusCode,
            error: message.errors
        });
    }
}
