const mongoDb = require('mongodb');
const getDb = require('../util/database').getDb;

class Product {
  constructor(title, price, description, imageUrl, id, userId) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id ? new mongoDb.ObjectId(id) : null;
    this.userId = userId;
  }

  save() {
    const db = getDb();
    let dbOp = this._id
      ? db.collection('products').updateOne({ _id: this._id }, { $set: this })
      : db.collection('products').insertOne(this);

    return dbOp.then(result => console.log(result))
      .catch(err => console.log(err));
  }

  static fetchAll() {
    const db = getDb();
    return db.collection('products')
      .find()
      .toArray()
      .then(products => {
        console.log(products);
        return products;
      })
      .catch(err => console.log(err));;
  }

  static findById(productId) {
    const db = getDb();
    return db.collection('products')
      .find({ _id: new mongoDb.ObjectId(productId) })
      .next()
      .then(product => {
        console.log(product);
        return product;
      })
      .catch(err => console.log(err));;
  }

  static deleteById(productId) {
    const db = getDb();
    return db.collection('products')
      .deleteOne({ _id: new mongoDb.ObjectId(productId) })
      .then(product => {
        console.log('DELETED');
      })
      .catch(err => console.log(err));;
  }
}

module.exports = Product;
