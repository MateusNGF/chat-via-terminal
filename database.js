const crypto = require("crypto");

class Database {
    clients = [];

    insert(connection) {
        let dataFouned = this.getByConnection(connection)
        if (dataFouned) return dataFouned

        connection = {
            id : this.generateID(),
            connection
        }
        this.clients.push(connection)
        return connection
    }

    getByConnection(connection) {
        return this.clients.find(client => client.connection === connection)
    }

    getByClientId(id){
        return this.clients.find(client => client.id === id)
    }

    remove(id) {
        if (this.getByClientId(id)) {
            this.clients = this.clients.filter(client => client.id !== id)
        }
    }

    list(){
        return this.clients
    }

    generateID(){
        return crypto.randomBytes(2).toString('hex')
    }
}

module.exports = new Database()