class Purchase{
    constructor(doc){
        this.productId=doc.data().productId
        this.quantity=doc.data().quantity
        this.pricePerProduct=doc.data().pricePerProduct
    }
}

module.exports=Purchase