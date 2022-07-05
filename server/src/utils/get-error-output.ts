import { CastError, MongooseError } from 'mongoose';
import { MongoServerError } from 'mongodb';
import { GraphQLError } from 'graphql';

const handleCastErrorDB = (error: CastError) => {
  const message = `Invalid ${error.path}: ${error.value}.`;
  return { status: 400, message };
};

const handleDuplicateFieldsDB = (error: MongoServerError) => {
  const value = error.errmsg.match(/(["'])(\\?.)*?\1/)?.[0];

  const message = `Duplicate field value: ${value}. Please use another value!`;
  return { status: 400, message };
};

const handleValidationErrorDB = (error: { errors: Record<string, MongooseError> }) => {
  const errors = Object.values(error.errors).map((el) => el.message);

  const message = `Invalid input data. ${errors.join('. ')}`;
  return { status: 400, message };
};

const handleGraphqlOriginalError = (error: GraphQLError) => ({
  status: 500,
  message: (error.originalError as { isIntentional?: boolean }).isIntentional
    ? error.originalError?.message
    : 'Something went wrong!',
  locations: error.locations,
  path: error.path,
});

const getErrorOutput = (error: any) => {
  if (process.env.NODE_ENV === 'development') return error;

  if (error.customError) return { status: error.status, message: error.message };
  if (error.name === 'CastError') return handleCastErrorDB(error);
  if (error.code === 11000) return handleDuplicateFieldsDB(error);
  if (error.name === 'ValidationError') return handleValidationErrorDB(error);
  if (error instanceof GraphQLError && error.originalError) {
    return handleGraphqlOriginalError(error);
  }
  console.error('ERROR 💥', error);
  return { status: 500, message: 'Something went wrong!' };
};

export default getErrorOutput;
