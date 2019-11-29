const catchAsync = require('../utils/catch-async');
const AppError = require('../utils/app-error');

exports.createOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    if (!doc) return next(new AppError('Error creating the document', 400));

    res.status(201).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });

exports.getAll = Model =>
  catchAsync(async (req, res, next) => {
    // To allow for nested get comments on post
    let filter = {};
    if (req.params.id) filter = { post: req.params.id };

    const doc = await Model.find(filter).sort({ createdAt: -1 });

    if (doc.length === 0) {
      return next(new AppError('No documents to show', 404));
    }

    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        data: doc
      }
    });
  });

exports.getMe = (req, res, next) => {
  req.params.id = req.user._id;

  next();
};

exports.getOne = (Model, popOpts) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);

    if (popOpts) query = query.populate(popOpts);

    const doc = await query;

    if (!doc) {
      return next(new AppError('Document not found', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });

exports.updateOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!doc) {
      return next(new AppError('No document found', 404));
    }

    res.status(201).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });

exports.deleteOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError('Document not found', 404));
    }

    res.status(204).json({
      status: 'success',
      doc: null
    });
  });
