class Admin {
    constructor(doc) {
        this.id = doc.id
        this.firstName = doc.data().firstName
        this.lastName = doc.data().lastName
        this.email = doc.data().email
        this.contactNo = doc.data().contactNo
        this.password = doc.data().password
        this.lastModifiedDate = doc.data().lastModifiedDate
    }
}

module.exports = Admin
