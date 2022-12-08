//(1, 'Delivery App Admin', 'adm@deliveryapp.com', 'a4c86edecc5aee06eff8fdeda69e0d04', 'administrator'), -- senha: md5('--adm2@21!!--')
//(2, 'Fulana Pereira', 'fulana@deliveryapp.com', '3c28d2b0881bf46457a853e0b07531c6', 'seller'), -- senha: md5('fulana@123')
// (3, 'Cliente Zé Birita', 'zebirita@email.com', '1c37466c159755ce1fa181bd247cb925', 'customer'); -- senha: md5('$#zebirita#$')
const mockUsers = [
    {
        id: 1,
        name: 'Delivery App Admin',
        email: 'adm@deliveryapp.com', 
        role: 'administrator',
    },
    {
        id: 2,
        name: 'Fulana Pereira',
        email: 'fulana@deliveryapp.com', 
        role: 'seller',
    },
    {
        id: 3,
        name: 'Cliente Zé Birita',
        email: 'zebirita@email.com', 
        role: 'customer',
    }
]

const mockCustomer = [
    {
        id: 3,
        name: 'Cliente Zé Birita',
        email: 'zebirita@email.com', 
        role: 'customer',
    }
]

module.exports = { mockCustomer, mockUsers }
