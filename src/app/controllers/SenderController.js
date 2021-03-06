import * as Yup from 'yup';
import Sender from '../models/Sender';

class SenderController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Falha na validação' });
    }

    const { name, email } = req.body;

    const senderExists = await Sender.findOne({
      where: { email },
    });

    if (senderExists) {
      return res.status(401).json({ error: 'Este remetente já existe.' });
    }

    await Sender.create({
      name,
      email,
    });

    return res.json({
      name,
      email,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação' });
    }

    const sender = await Sender.findOne({
      where: { id: req.params.id },
      attributes: ['id', 'name', 'email'],
    });

    if (!sender) {
      return res.status(400).json({ error: 'Remetente não existente.' });
    }

    await sender.update(req.body);

    return res.json(sender);
  }

  async delete(req, res) {
    const sender = await Sender.findOne({
      where: { id: req.params.id },
    });

    if (!sender) {
      return res.status(400).json({ error: 'Remetente não encontrado.' });
    }

    await sender.destroy();

    const allSenders = await Sender.findAll({
      attributes: ['id', 'name', 'email'],
    });

    return res.json(allSenders);
  }

  async index(req, res) {
    const { page = 1 } = req.query;

    const sender = await Sender.findAll({
      attributes: ['id', 'name', 'email'],
      order: [['createdAt', 'ASC']],
      limit: 6,
      offset: (page - 1) * 6,
    });

    return res.json(sender);
  }
}

export default new SenderController();
