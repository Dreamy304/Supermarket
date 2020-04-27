require('../config/dbconfig')
var admin = require("firebase-admin");
const Customer = require('../model/customer')
const Product = require('../model/product')
const Category = require('../model/category')
const db = admin.firestore();

let getCustomerByEmail = (email) => {
  console.log('Inside getCustomerByEmail')
  return new Promise((resolve, reject) => {
    db.collection('Customers').where('email', '==', email).where('isActive', '==', true).get()
      .then(snapshot => {
        if (snapshot.empty) {
          return reject(new Error('No matching documents.'));
        }
        snapshot.forEach(doc=>{
          return resolve(new Customer(doc))
        })
        return resolve([])
      })
      .catch(err => {
        console.log(err)
        return reject(err)
      });
  })

}

let getCustomerById = (customerId, isActive) => {
  console.log('Inside getCustomerById')
  console.log(customerId)
  return new Promise((resolve, reject) => {
    db.collection('Customers').doc(customerId).get()
      .then(snapshot => {
        if (snapshot.empty) {
          return reject(new Error('No matching documents.'))
        }
        return resolve(new Customer(snapshot))
      })
      .catch(err => {
        console.log(err)
        return reject(err)
      })
  })
}

let getCustomers = () => {
  console.log('Inside getCustomers')
  return new Promise((resolve, reject) => {
    db.collection('Customers').get()
      .then(snapshot => {
        if (snapshot.empty) {
          return reject(new Error('No matching documents.'))
        }
        let customers = []
        snapshot.forEach(doc => {
          return customers.push(new Customer(doc))
        })
        return resolve(customers)
      })
      .catch(err => {
        console.log(err)
        return reject(err)
      })
  })
}

let getProductsByClientId = (clientId) => {
  console.log('Inside getProductsByClientId')
  return new Promise((resolve, reject) => {

    db.collection('Store').where('clientId', '==', clientId).get()
      .then(stores => {
        if (stores.empty) {
          return reject(new Error('No matching client.'))
        }
        return stores
      })
      .then(stores => {

        let p = []
        let promiseArr = []
        stores.forEach(function (store) {
          promiseArr.push(db.collection('StoreStock').where('storeId', '==', store.id).get())
        });
        let ss = []
        Promise.all(promiseArr).then(function (resultsArray) {
          resultsArray.forEach(stock => {
            stock.forEach(doc => {
              ss.push(doc)
            })
          })
        return ss
        }).catch(function (err) {
          console.error(err)
        })
        .then(ss=>{
          let promiseArr = []
          ss.forEach(function (storeStock) {
            promiseArr.push(db.collection('Product').doc(storeStock.data().productId).get())
          });

          Promise.all(promiseArr).then(function (resultsArray) {
            resultsArray.forEach(doc => {
              p.push(new Product(doc))
            })
           return p
          }).catch(function (err) {
            console.error(err)
          }).then((p)=>{
return resolve(p)
          }).catch(function (err) {
            console.error(err)
          })
          return resolve(p)
        }).catch(function (err) {
          console.error(err)
        })
        return resolve(p)
      }).catch(function (err) {
        console.error(err)
      })
  })
}

let getProducts = () => {
  console.log('Inside getProducts')
  return new Promise((resolve, reject) => {
    db.collection('Product').get()
      .then(snapshot => {
        if (snapshot.empty) {
          return reject(new Error('No matching documents.'))
        }
        let products = []
        snapshot.forEach(doc => {
          console.log(doc.data())
          return products.push(new Product(doc))
        })
        return resolve(products)
      })
      .catch(err => {
        console.log(err)
        return reject(err)
      })
  })
}

let getCategories = () => {
  console.log('Inside getCategories')
  return new Promise((resolve, reject) => {
    db.collection('Category').get()
      .then(snapshot => {
        if (snapshot.empty) {
          return reject(new Error('No matching documents.'))
        }
        let categories = []
        snapshot.forEach(doc => {
          console.log(doc.data())
          return categories.push(new Category(doc))
        })
        return resolve(categories)
      })
      .catch(err => {
        console.log(err)
        return reject(err)
      })
  })
}

const data = {
  getCustomerByEmail,
  getCustomerById,
  getCustomers,
  getProductsByClientId,
  getProducts,
  getCategories
}

module.exports = data;