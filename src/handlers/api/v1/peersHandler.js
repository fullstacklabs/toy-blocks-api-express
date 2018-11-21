const Peer = require("../../../models/Peer");

async function index(req, res) {
  return res.status(200).send({peers: await Peer.query()});
}

async function create(req, res) {
  if (!req.query.url) {
    return res.status(500).send("Missing url query param!");
  }

  const peer = await Peer.query().insert({url: req.query.url});
  return res.status(201).send({peer: peer});
}

async function destroy(req, res) {
  await Peer.query().deleteById(req.params.id);
  return res.send({});
}

module.exports = {
  index,
  create,
  destroy,
};
