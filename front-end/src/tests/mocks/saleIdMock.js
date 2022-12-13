const saleOne = {
  id: 1,
  totalPrice: '0.00',
  saleDate: '2022-12-06T21:09:06.000Z',
  status: 'Em trânsito',
  seller: {
    id: 1,
    name: 'Delivery App Admin',
    email: 'adm@deliveryapp.com',
    role: 'administrator',
  },
  products: [
    {
      id: 1,
      name: 'Skol Lata 250ml',
      price: '2.20',
      urlImage: 'http://localhost:3001/images/skol_lata_350ml.jpg',
      SaleProduct: {
        quantity: 2,
      },
    },
    {
      id: 2,
      name: 'Heineken 600ml',
      price: '7.50',
      urlImage: 'http://localhost:3001/images/heineken_600ml.jpg',
      SaleProduct: {
        quantity: 5,
      },
    },
    {
      id: 4,
      name: 'Brahma 600ml',
      price: '7.50',
      urlImage: 'http://localhost:3001/images/brahma_600ml.jpg',
      SaleProduct: {
        quantity: 1,
      },
    },
  ],
};

module.exports = saleOne;
