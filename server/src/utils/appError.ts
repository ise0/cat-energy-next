class AppError extends Error {
  status: number;
  isIntentional: true;

  constructor(status: number, message: string) {
    super(message);

    this.status = status;
    this.isIntentional = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
