const jsonServer = require('json-server');
const midleware = jsonServer.defaults();
const server = jsonServer.create();

server.use(midleware);
server.use(jsonServer.bodyParser);

const superheroData = require('../server/data/superheros');

server.get('/api/superheros', (req, res, next) => {
    console.log('sever get');
    res.status(200).send(superheroData.getSuperHeros);
});


server.post('/api/superheros/new', (req, res, next) => {
    console.log('sever put');
    res.status(200).send(4);
});

server.listen(3000, () => {
    console.log('JSON server listening on port 3000');
})