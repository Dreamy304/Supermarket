class Client {
    constructor(doc) {
        this.id = doc.id
        this.name = doc.data().name
        this.address = doc.data().address
        this.contactNo = doc.data().contactNo
        this.email = doc.data().email
        this.isActive = doc.data().isActive
        this.createdDate = doc.data().createdDate
        this.lastupdatedDate = doc.data().lastupdatedDate
    }
}

module.exports = Client