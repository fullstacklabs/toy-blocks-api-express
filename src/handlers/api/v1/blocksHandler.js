const Block = require("../../../models/Block");

const JSONAPISerializer = require("json-api-serializer");

const Serializer = new JSONAPISerializer();

Serializer.register("blocks", {
    id: "id",
    jsonapiObject: false,
    blacklist: ['created_at', 'updated_at']
});

async function index(req, res) {
    const blocks = await Block.query();
    const response = Serializer.serialize('blocks', blocks.map(block => block.toJSON()));
    return res.send(response);
};

async function show(req, res) {
    const block = await Block.query().findById(req.params.id);
    return res.send(Serializer.serialize('blocks', block.toJSON()));
}

async function create(req, res) {
    if(!req.query.data) {
        return res.status(500).send("Missing data query param!");
    }

    const block = await Block.query().insert({data: req.query.data});
    return res.status(201).send(Serializer.serialize('blocks', block.toJSON()));
}

module.exports = {
    index,
    show,
    create
}