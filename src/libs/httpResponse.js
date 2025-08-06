export const httpResponse = (res, status, message, data, meta_data) => {
  return res.status(status).json({
    status,
    message,
    data,
    meta_data,
  });
};
