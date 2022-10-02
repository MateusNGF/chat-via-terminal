const net = require("net")


const host = process.argv[2] || 'localhost'
const port = process.argv[3] || 9000

const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
});

const server = net.connect(port, host, () => {
    readline.write(`\n Success connection in ${host}:${port} \n\n`)

    server.on('data', (data) => {
        readline.write(data.toString())
    })
    InLine();
}).on('error', systemClose)

function systemClose(error) {
    readline.write(`\rERROR : ${error.message}`);
    server.end();process.exit();
}
const InLine = () => {
    readline.addListener('line', (line) => {
        server.write(line)
    })
};