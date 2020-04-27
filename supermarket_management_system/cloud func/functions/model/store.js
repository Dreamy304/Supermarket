class Store{
    constructor(doc){
        this.id=doc.id
        this.clientId=doc.data().clientId
        this.location=doc.data().location
        this.coordinates=doc.data().coordinates
        this.contactNo=doc.data().contactNo
        this.email=doc.data().email
        this.isActive=doc.data().isActive
        this.createdDate=doc.data().createdDate
        this.lastupdatedDate=doc.data().lastupdatedDate
    }
}

module.exports=Store