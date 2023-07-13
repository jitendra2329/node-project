const http = require('http');
const fs = require('fs');
const url = require('url')
const replaceHtml = require('./modules/replaceHtml');
const singleProductHtml = fs.readFileSync('./Responce/singleProductHtml.html', 'utf-8');
const html = fs.readFileSync('./Responce/index.html', 'utf-8');
let product = JSON.parse(fs.readFileSync('./data/products.json', 'utf-8'))
let productslist = fs.readFileSync('./Responce/products.html', 'utf-8');

const server = http.createServer();

server.on('request',(request, responce) => {
    let {pathname: path} = url.parse(request.url, true)
    // let path = request.url;
    

    let x =  url.parse(request.url, true)
    console.log(x)
    let i = product.products[x.query.id]
    console.log(i);
    console.log(!x.query.id);

    if(path ==='/' || path.toLocaleLowerCase() === '/home'){
        responce.writeHead(200);
        responce.end(html.replace('{{%CONTENT%}}', 'You are on home page'));
    }else if(path.toLocaleLowerCase() ==='/about'){
        responce.writeHead(200);
        responce.end(html.replace('{{%CONTENT%}}', 'You are on about page'));
    }else if(path.toLocaleLowerCase() === '/services'){
        responce.writeHead(200);
        responce.end(html.replace('{{%CONTENT%}}', 'You are on services page'));
    }else if(path.toLocaleLowerCase() === '/contact'){
        responce.writeHead(200);
        responce.end(html.replace('{{%CONTENT%}}', 'You are on contact page'));
    }else if(path.toLocaleLowerCase()=== '/products'){
        if(!x.query.id){
        let newProductListArray =  product.products.map((prod) => {

           return replaceHtml(productslist, prod);

        })
        console.log(newProductListArray);
        console.log(newProductListArray.join(','));
        let productsHtml = html.replace('{{%CONTENT%}}',newProductListArray.join(','));
        responce.writeHead(200,{'Content-Type': 'text/html' });
        // console.log(productsHtml);
        responce.end(productsHtml);
     } else {
        let singleProduct = product.products[x.query.id];
        let singleProductResponce = replaceHtml(singleProductHtml, singleProduct);
        responce.end(html.replace('{{%CONTENT%}}',singleProductResponce))
     }
        
    }
     else {
        responce.writeHead(404);
        responce.end(html.replace('{{%CONTENT%}}', 'error 404: page not found'));
    }
    // responce.end(path)
    console.log('A request recieved');
})

server.listen(8000, '127.0.0.1', () => {
    console.log('Server has stared');
})

const user = require('./modules/user')
const customeEmiter = new user();

customeEmiter.on('user created',(id, name) => {
    console.log(`A new user ${name} with id = ${id} is created.`)
})

customeEmiter.emit('user created', 101, 'Jitendra');

