
// *******************TAKING INPUT FROM THE USER FROM THE CONSOLE****************************

// Importing modules for taking input from user
// const readline = require('readline');

// creating interface for user input
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });


// // call question method for taking input from user in terminal
// rl.question("Enter your name: ", (name) => {
//     console.log(name);
//     rl.close();
// })


// rl.on('close',() =>{
//     console.log("Closing interface.")
//     process.exit(0);
// });



// ************************READING AND WRITING THE FILES USING FS MODULE*********************

// const fs = require('fs');
// const input = fs.readFileSync('./Files/input.txt', 'utf-8');
// console.log(input)

// fs.readFile('./Files/append.txt', 'utf-8', (err1, data1) => {
//     console.log(data1);
//     fs.readFile(`./Files/${data1}`, 'utf-8', (err2, data2) => {
//         console.log(data2);
//         fs.writeFile('./Files/output.txt', `${data1}\n\n${data2}\n\n${new Date()}`, () =>{
//             console.log('File written successfully..')
//         })
//     })
// });
// console.log('Reading input file.....')

// let newTxt = `reading from input file:\n ${input} `;

// fs.writeFileSync('./Files/output.txt', newTxt)


// *******************************CREATING THE WEB SERVER USING HTTP MODULE**********************************
const http = require('http');
const fs = require('fs');
const url = require('url')
const replaceHtml = require('./modules/replaceHtml');
const singleProductHtml = fs.readFileSync('./Responce/singleProductHtml.html', 'utf-8');
const html = fs.readFileSync('./Responce/index.html', 'utf-8');
let product = JSON.parse(fs.readFileSync('./data/products.json', 'utf-8'))
let productslist = fs.readFileSync('./Responce/products.html', 'utf-8');

// let newProductList = product.products.map((prod) => {
//     let output = productslist.replace('{{%IMAGE%}}', prod.images);
//     output = output.replace('{{%product-title%}}', prod.title);
//     output = output.replace('{{%product-brand%}}', prod.brand);
//     output = output.replace('{{%product-category%}}', prod.category);
//     output = output.replace('{{%product-description%}}', prod.description);
//     output = output.replace('{{%product-price%}}', prod.price);
//     output = output.replace('{{%product-rating%}}', prod.rating);
//     output = output.replace('{{%product-stock%}}', prod.stock);
//     output = output.replace('{{%product-discount%}}', prod.discountPercentage);
//     output = output.replace('{{%ID%}}', prod.id);

//     return output;
// });

// function replaceHtml(template, product){
//     let output = template.replace('{{%IMAGE%}}', product.images);
//     output = output.replace('{{%product-title%}}', product.title);
//     output = output.replace('{{%product-brand%}}', product.brand);
//     output = output.replace('{{%product-category%}}', product.category);
//     output = output.replace('{{%product-description%}}', product.description);
//     output = output.replace('{{%product-price%}}', product.price);
//     output = output.replace('{{%product-rating%}}', product.rating);
//     output = output.replace('{{%product-stock%}}', product.stock);
//     output = output.replace('{{%product-discount%}}', prod.discountPercentage);
//     output = output.replace('{{%ID%}}', prod.id);

//     return output;
// }
// STEP 1. Create the server

const server = http.createServer((request, responce) => {
    // responce.end(html)
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



// AAPPLYING EVENT DRIVEN ARCHITECTURE FOR CREATING THE SERVER

// const server2 = http.createServer();

// server2.on('request',(req, res)=>{
//     res.end('helllo there!')
//     console.log('responding from server');

// })
// STEP 2. Start the server

server.listen(8000, '127.0.0.1', () => {
    console.log('Server has stared');
})