module.exports = function (template, product){
    let output = template.replace('{{%IMAGE%}}', product.images);
    output = output.replace('{{%product-title%}}', product.title);
    output = output.replace('{{%product-brand%}}', product.brand);
    output = output.replace('{{%product-category%}}', product.category);
    output = output.replace('{{%product-description%}}', product.description);
    output = output.replace('{{%product-price%}}', product.price);
    output = output.replace('{{%product-rating%}}', product.rating);
    output = output.replace('{{%product-stock%}}', product.stock);
    output = output.replace('{{%product-discount%}}', product.discountPercentage);
    output = output.replace('{{%ID%}}', product.id);

    return output;
}