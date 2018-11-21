function show(req, res) {
  return res.send({
    node_name: process.env.NODE_NAME,
  });
}

module.exports = {
  show,
};
