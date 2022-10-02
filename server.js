var net = require("net");
const database = require('./database')

const port = 9000 || process.env.PORT;


const server = net.createServer();
server.on('connection', (client) => {
  client = connectClient(client)

  client.connection.on('data', data => {
    broadcast(data.toString(), client.id)
  })

  client.connection.on('error' || 'close', () => {
    desconnectClient(client)
  })
})

function connectClient(newClient){
  const client = database.insert(newClient)
  broadcast(`${client.id} has connected !!!`, client.id, true)
 return client
}

function desconnectClient(client){
  database.remove(client)
  broadcast(`${client.id} has desconnected !!!`, client.id, true)
 return client
}

function broadcast(data, from, isServerMessage) {
  const clientsConnected = database.list()
  const to = clientsConnected.filter(client => client.id !== from)
  let message = `From ${from}: ${data}`
  if (isServerMessage){
    message = `==> Server : ${data}`
    console.log(message)
  }
  to.length && to.forEach(client => client.connection.write(message))
}

server.listen(port , () => {
    console.log(`==> Server running in ${port} port`)
})



