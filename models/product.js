const product = [];

module.exports = class Product{
    constructor(title,image,price){
        this.title = title;
        this.image = image;
        this.price = price;
    }
    save(){
        product.push(this);
    }
    static fetchAll(){
        return product;
    }
}