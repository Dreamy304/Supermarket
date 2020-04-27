class Cart{
    constructor(doc){
        this.productId=doc.data().productId
        this.customerId=doc.data().customerId
        this.quantity=doc.data().quantity
        this.createdDate=doc.data().createdDate
        this.lastupdatedDate=doc.data().lastupdatedDate
    }
}

module.exports = Cart
