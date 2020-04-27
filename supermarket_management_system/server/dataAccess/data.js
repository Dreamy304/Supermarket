const Category = require('../model/category');

let getCategoryById = (categoryId) => {
    new Promise((resolve, reject) => {
        try {
            console.log("Inside getCategoryId")
            if (categoryId==null) {
                console.log("get all categories")
                let category = Category.find({});
                console.log(category)
                resolve(category);
            }
            else{
                console.log("get category with Id:"+categoryId)
                let category = Category.findById(categoryId);
                console.log(category)
                resolve(category);
            }
            
        } catch (error) {
            reject(error);
        }
    });
}

let addCategory = (categoryName) => {
    new Promise((resolve, reject) => {
        try {
            console.log("Inside addCategory")
            new Category({
                categoryName: categoryName
            }).save().then((savedContent)=>{
                console.log(savedContent)
                resolve(savedContent);
            });
            
        } catch (error) {
            reject(error);
        }
    });
    
}

module.exports.dataAccess={
    getCategoryById,
    addCategory
};