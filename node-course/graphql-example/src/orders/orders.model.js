const orders = [
  {
    date: "29/08/2022",
    subtotal: 90.12,
    items: [
      {
        product: {
          id: "redshoe",
          description: "Old Red Shoe",
          price: 45.11,
        },
        quantity: 2,
      },
    ],
  },
];

function getAllOrders() {
  return orders;
}

module.exports = {
  getAllOrders,
};
