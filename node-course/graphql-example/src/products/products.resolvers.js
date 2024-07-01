const productModel = require("./products.model");
module.exports = {
  Query: {
    products: () => {
      return productModel.getAllProducts();
    },
    productsByPrice: (parent, args) => {
      return productModel.getProductsByPrice(args.min, args.max);
    },
    product: (parent, args) => {
      return productModel.getProductById(args.id);
    },
  },
  Mutation: {
    addNewProduct: (parent, args) => {
      return productModel.addNewProduct(args.id, args.description, args.price);
    },
    addNewProductReview: (parent, args) => {
      return productModel.addNewProductReview(
        args.id,
        args.rating,
        args.comment
      );
    },
  },
};
