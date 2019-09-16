import models from '../models';
import errorHandler from '../utils/errorHandler';
import use from '../utils/use';

const getAll = async (req, res) => {
  try {
    const fields = req.query.fields
      ? req.query.fields.replace(/,/gi, ' ')
      : '';

    const full_name = use.toRegex(req.query.full_name);
    const phone = use.toRegex(req.query.phone);

    const clients = await models.Client.find(
      {
        full_name: { $regex: full_name },
        'phones.phone': { $regex: phone },
        user: req.user.id,
        company: req.params.company_id || { $ne: null },
      },
      fields,
    );

    res.status(201).json(clients);
  } catch (e) {
    errorHandler(res, e);
  }
};

const getById = async (req, res) => {
  try {
    const clients = await models.Client.findById(req.params.id);
    res.status(201).json(clients);
  } catch (e) {
    errorHandler(res, e);
  }
};

const add = async (req, res) => {
  try {
    console.log(`${req.params.company_id} ${req.user.id}`);
    req.body.company = req.params.company_id;
    req.body.user = req.user.id;
    const client = await models.Client.create(req.body);
    res.status(201).json(client);
  } catch (e) {
    errorHandler(res, e);
  }
};

const addPhone = async (req, res) => {
  try {
    req.body.company_id = req.params.company_id;
    const client = await models.Client.findByIdAndUpdate(
      req.params.id,
      { $push: { phones: req.body } },
      { new: true, runValidators: true },
    );
    res.status(201).json(client);
  } catch (e) {
    errorHandler(res, e);
  }
};

const update = async (req, res) => {
  try {
    const client = await models.Client.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );
    res.status(201).json(client);
  } catch (e) {
    errorHandler(res, e);
  }
};

export default { getAll, getById, update, add, addPhone };
