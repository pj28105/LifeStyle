const product = [];
id = 0;

module.exports = class Product{
    constructor(title,imageUrl,price,description){
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
        this.id = id;
        id++;
    }
    save(){
        product.push(this);
    }
    static fetchAll(){
        return product;
    }
    static findById(id){
        for(let i = 0; i < product.length; i++){
            if(product[i].id == id){
                return product[i];
            }
        }
        return null;
    }
    static editDetails(id,title,imageUrl,price,description){
        for(let i = 0; i < product.length; i++){
            if(product[i].id == id){
                product[i].title = title;
                product[i].imageUrl = imageUrl;
                product[i].price = price;
                product[i].description = description;
                return true;
            }
        }
        return false;
    }
}