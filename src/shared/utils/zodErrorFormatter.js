const formatZodError = (zodError) => {
    const issues = zodError.issues || zodError.errors;

    if (!issues) return [];

    return issues.map((err) => ({
        field: err.path.join(".") || "body",
        message: err.message,
    }));
};

module.exports = formatZodError;