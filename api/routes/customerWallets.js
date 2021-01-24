module.exports = app => {
    const controller = require('../controllers/customerWallets')();

    app.route('/api/v1/customerwallets')
    .get(controller.listCustomerWallets)
    .post(controller.saveCustomerWallets);
    
    app.route('/api/v1/customerWallets/:customerId')
    .delete(controller.removeCustomerWallets)
    .put(controller.updateCustomerWallets);
}