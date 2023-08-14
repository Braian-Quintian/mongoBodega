import { generateToken } from '../autorizacion.js';

export async function autenticacion(req, res) {
  const { id } = req.params;
  const { collection } = req.query;

  try {
    const jwt = await generateToken(id, collection);
    res.send({ jwt });
  } catch (error) {
    res.status(500).send(error);
  }
}