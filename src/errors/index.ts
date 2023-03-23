export class CustomeError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class UnauthenticatedError extends CustomeError {
  statusCode;
  constructor(message: string) {
    super(message);
    this.statusCode = 401;
  }
}

export class UnauthorizedError extends CustomeError {
  statusCode;
  constructor(message: string) {
    super(message);
    this.statusCode = 403;
  }
}

export class BadRequestError extends CustomeError {
  statusCode;
  constructor(message: string) {
    super(message);
    this.statusCode = 400;
  }
}

export class NotFoundError extends CustomeError {
  statusCode;
  constructor(message: string) {
    super(message);
    this.statusCode = 404;
  }
}
