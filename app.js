const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/app-error');
const globalErrorHandler = require('./controllers/error.controller');

// Routers
const postRouter = require('./routes/post.routes');
const userRouter = require('./routes/user.routes');
const commentRouter = require('./routes/comment.routes');

const app = express();

// Middlewares
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());

// Routes
app.use('/api/v1/posts', postRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/comments', commentRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
