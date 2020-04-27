class Product{
    constructor(doc){
        this.id=doc.id
        this.productName=doc.data().productName
        this.categoryId=doc.data().categoryId
        this.brand=doc.data().brand
        this.price=doc.data().price
        this.image=doc.data().image
        this.isActive=doc.data().isActive
        this.createdDate=doc.data().createdDate
        this.lastupdatedDate=doc.data().lastupdatedDate
    }
}

module.exports=Product
