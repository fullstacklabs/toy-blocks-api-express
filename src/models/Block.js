const {Model} = require("objection");
const crypto = require("crypto");

class Block extends Model {
  static get tableName() {
    return "blocks";
  }

  $formatJson(json, options) {
    json.hash = json.current_hash;
    delete json.current_hash;
    json.timestamp = json.timestamp.valueOf();

    return super.$formatJson(json, options);
  }

  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        index: {type: "string"},
        previous_hash: {type: "string"},
        current_hash: {type: "string"},
        data: {type: "string"},
        timestamp: {type: "date-time"},
      },
    };
  }

  async $beforeInsert() {
    const previous_block = await retrievePreviousBlock();
    this.index = previous_block.index + 1;
    this.previous_hash = previous_block.current_hash;
    this.timestamp = new Date();

    if (!this.current_hash) {
      this.current_hash = crypto
        .createHash("sha256")
        .update(
          `${this.index}${this.previous_hash}${this.timestamp.valueOf()}${
            this.data
          }`
        )
        .digest("base64");
    }
  }
}

async function retrievePreviousBlock() {
  let previous = await Block.query()
    .orderBy("timestamp", "desc")
    .first();

  if (!previous) {
    return {
      index: 0,
      previous_hash: "0",
      timestamp: 0,
      data: "",
      current_hash: crypto
        .createHash("sha256")
        .update("000")
        .digest("base64"),
    };
  }

  return previous;
}

module.exports = Block;
