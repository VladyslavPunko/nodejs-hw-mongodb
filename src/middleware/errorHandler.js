import { HttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  if (err instanceof HttpError) {
    res.status(err.status).json({
      message: err.name,
      data: err,
      status: err.status,
    });
    return;
  }

  res.status(500).err({
    status: 500,
    message: 'Something went wrong!',
    error: err.message,
  });
};
