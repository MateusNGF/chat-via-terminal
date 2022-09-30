var net = require("net");

const port = 9000;
const host = 'localhost';
let clients = [];




const server = net.createServer();
server.on('connection', (client) => {
  connectedClient(client)
  client.on('data', (data) => { 
    broadcast(client, formatMessage(data.toString(), `from ${getPositionInClients(client)}`)) 
  })

  client.on('end', () => { desconnectedClient(client) })
  client.on('error', (e) => {desconnectedClient(client)} )
})

function broadcast(origin, msg){
  clients.filter(socket => socket !== origin).forEach(socket => socket.write(msg))
}
function formatMessage(msg, prefix = "SERVER") {
  if (!msg) throw { message: "Msg undefined" }
  return `${prefix.toUpperCase()} : ${String(msg).toLowerCase()}\r`
}
function getPositionInClients (client){
  return clients.indexOf(client)
}
function connectedClient(client){
  clients.push(client);
  let messagem = formatMessage(`${getPositionInClients(client)} SE CONECTOU !!!`) 
  console.log(messagem);
  broadcast(client, messagem)
}
function desconnectedClient(client){
  let messagem = formatMessage(`${getPositionInClients(client)} SE DESCONECTOU !!!`) 
  console.log(messagem);
  broadcast(client, messagem)
  clients.splice(clients.indexOf(client), 1)
}


server.listen(port, host, () => {
    console.log(formatMessage(`${host}:${port}`))
})



