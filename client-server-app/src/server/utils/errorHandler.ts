export const errorHandler = (res: any, error: any) => {
  res.status(500).json({
    success: false,
    message: error.message || error,
  });
};
