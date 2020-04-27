class StoreStock{
    constructor(doc){
        this.productId=doc.data().productId
        this.storeId=doc.data().storeId
        this.quantity=doc.data().quantity
        this.expiryDate=doc.data().expiryDate
        this.createdDate=doc.data().createdDate
        this.lastupdatedDate=doc.data().lastupdatedDate
    }
}

module.exports=StoreStock