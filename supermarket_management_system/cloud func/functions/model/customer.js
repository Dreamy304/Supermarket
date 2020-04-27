class Customer{
    constructor(doc){
        this.id=doc.id
        this.firstName=doc.data().firstName
        this.lastName=doc.data().lastName
        this.contactNo=doc.data().contactNo
        this.email=doc.data().email
        this.password=doc.data().password
        this.image=doc.data().image
        this.isAdmin=doc.data().isAdmin
        this.isActive=doc.data().isActive
        this.clientId=doc.data().clientId
        this.createdDate=doc.data().createdDate
        this.lastupdatedDate=doc.data().lastupdatedDate
    }
}

module.exports = Customer
