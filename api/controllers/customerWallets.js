const uuid = require('uuid')
// import { v4 as uuid } from 'uuid';
// const uuid = require('uuid/dist/index.js');

module.exports = () => {
    const customerWalletsDB = require('../data/customerWallets.json');
    const controller = {}; 
    const { customerWallets: customerWalletsMock} = customerWalletsDB;

    controller.listCustomerWallets = (req, res) => res.status(200).json(customerWalletsDB);

    controller.saveCustomerWallets = (req, res) => {
        customerWalletsMock.data.push({
            id: uuid.v4(),
            parentId: uuid.v4(),
            name: req.body.name,
            birthDate: req.body.birthDate,
            cellphone: req.body.cellphone,
            phone: req.body.phone,
            email: req.body.email,
            occupation: req.body.occupation,
            state: req.body.state
        });

        res.status(201).json(customerWalletsMock);
    }

    controller.removeCustomerWallets = (req, res) => {
        const { customerId } = req.params;

        const foundCustomerIndex = customerWalletsMock.data.findIndex(customer => customer.id === customerId);

        if (foundCustomerIndex === -1) {
            res.status(404).json({
                message: 'Cliente não encontrado na base de dados.',
                success: false,
                customerWallets: customerWalletsMock
            });
        } else {
            customerWalletsMock.data.splice(foundCustomerIndex, 1);
            res.status(200).json({
                message: 'Cliente encontrado e deletado com sucesso.',
                success: true,
                customerWallets: customerWalletsMock
            })
        }
    }

    controller.updateCustomerWallets = (req, res) => {
        const { customerId } = req.params;
        
        const foundCustomerIndex = customerWalletsMock.data.findIndex(customer => customer.id === customerId)

        if (foundCustomerIndex === -1) {
            res.status(404).json({
                message: 'Cliente não encontrado na base de dados',
                success: false,
                customerWallets: customerWalletsMock
            });
        } else {
            const newCustomer = {
                id: customerId,
                parentId: req.body.parentId,
                name: req.body.name,
                birthDate: req.body.birthDate,
                cellphone: req.body.cellphone,
                phone: req.body.phone,
                email: req.body.email,
                occupation: req.body.occupation,
                state: req.body.state
            }
            customerWalletsMock.data.splice(foundCustomerIndex, 1, newCustomer);
            res.status(200).json({
                message: 'Dados do cliente alterados com sucesso!',
                success: true,
                customerWallets: customerWalletsMock
            });
        }
    }

    return controller;
}