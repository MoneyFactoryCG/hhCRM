import models from '../models';
import errorHandler from '../utils/errorHandler';

const getAll = async (req, res) => {
  try {
    const companies = await models.Company.find(req.query);
    res.status(201).json(companies);
  } catch (e) {
    errorHandler(res, e);
  }
};

const getById = async (req, res) => {
  try {
    const companies = await models.Company.findById(req.params.id);
    res.status(201).json(companies);
  } catch (e) {
    errorHandler(res, e);
  }
};

const add = async (req, res) => {
  try {
    req.body.company_id = req.params.company_id;
    const company = await models.Company.create(req.body);
    res.status(201).json(company);
  } catch (e) {
    errorHandler(res, e);
  }
};

const update = async (req, res) => {
  try {
    const company = await models.Company.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    res.status(201).json(company);
  } catch (e) {
    errorHandler(res, e);
  }
};

export default { getAll, getById, update, add };
