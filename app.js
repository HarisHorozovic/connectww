const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const AppError = require('./utils/app-error');
const globalErrorHandler = require('./controllers/error.controller');

// Routers
const postRouter = require('./routes/post.routes');
const userRouter = require('./routes/user.routes');
const commentRouter = require('./routes/comment.routes');

const app = express();
app.use(express.json());
// Initial cors setup, can be changed, but leave it here for now
app.use(
  cors({
    origin: [`${process.env.CORS_ALLOWED_ORIGIN}`, 'http://localhost:3000'],
    credentials: true
  })
);
// prevent CORS problems
app.use(function(req, res, next) {
  res.header('Content-Type', 'application/json;charset=UTF-8');
  res.header(
    'Access-Control-Allow-Origin',
    `${process.env.CORS_ALLOWED_ORIGIN}`
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT ,DELETE');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});
// Allow backend to parse cookies to the frontend and req
app.use(cookieParser());

// allow cors options, no need to enable it for now
// app.options('*', cors());

// Middlewares
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Express rate limit to prevent brute force attacks
const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour'
});
app.use('/api', limiter);

// Set security HTTP headers
app.use(helmet());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());
// Data sanitization against XSS (Cross-Side-Scripting-Attacks)
app.use(xss());

// Preventing Parameter Pollution
app.use(
  hpp({
    whitelist: ['duration']
  })
);

// Routes
app.use('/api/v1/posts', postRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/comments', commentRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
