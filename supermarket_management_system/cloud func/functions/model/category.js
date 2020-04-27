class Category{
    constructor(doc){
        this.id=doc.id
        this.categoryName=doc.data().categoryName
        this.isActive=doc.data().isActive
        this.createdDate=doc.data().createdDate
        this.lastupdatedDate=doc.data().lastupdatedDate
    }
}

module.exports=Category