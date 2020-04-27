class Order{
    constructor(doc){
        this.id=doc.id
        this.orderDate=doc.data().orderDate
        this.totalQuantity=doc.data().totalQuantity
        this.totalPrice=doc.data().totalPrice
        this.customerId=doc.data().customerId
        this.deliveryAddress=doc.data().deliveryAddress
        this.orderStatus=doc.data().orderStatus
        this.expectedDeliveryDate=doc.data().expectedDeliveryDate
        this.actualDeliveryDate=doc.data().actualDeliveryDate
        this.data=doc.data().data
        this.products=doc.data().products
    }
}

module.exports=Order