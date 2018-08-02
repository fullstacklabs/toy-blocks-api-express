const {Model} = require("objection");

class Peer extends Model {
    static get tableName() {
        return 'peers';
    }

    $beforeInsert() {
        this.created_at = new Date();
        this.updated_at = new Date();
    }

    $beforeUpdate() {
        this.updated_at = new Date();
    }
}

module.exports = Peer;