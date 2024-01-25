import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../customer/repository/sequelize/customer.model";
import OrderItemModel from "./orderItem.model";
import ProductModel from "../../../product/repository/sequelize/product.model";
import CustomerRepository from "../../../customer/repository/sequelize/customer.repository";
import Customer from "../../../../domain/customer/entity/customer";
import Address from "../../../../domain/customer/value-object/address";
import ProductRepository from "../../../product/repository/sequelize/product.repository";
import Product from "../../../../domain/product/entity/product";
import OrderItem from "../../../../domain/checkout/entity/orderItem";
import Order from "../../../../domain/checkout/entity/order";
import OrderRepository from "./order.repository";
import OrderModel from "./order.model";

describe("Order Repository test", () => {
  
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true},
    });
    
    sequelize.addModels([CustomerModel, OrderItemModel, OrderModel, ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("Should create a new Order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Mario Bros");
    const address = new Address(
      "Rua vinte", 12, "13211856", "Jundiaí"
    );
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order("1", "1", [orderItem]);
      
    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({where : { id: order.id} , include: ["items"]});

    expect(orderModel.toJSON()).toStrictEqual({
      id: "1",
      customerId: "1",
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          productId: orderItem.productId,
          orderId: "1"
        },
      ]
    })
  });

  it("Should update an order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Julio");
    const address = new Address(
      "Rua vinte", 12, "13211856", "Jundiaí"
    );
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order("1", "1", [orderItem]);
      
    const orderRepository = new OrderRepository();
    await orderRepository.create(order);
    
    const product2 = new Product("2", "Product 2", 20);
    await productRepository.create(product2);
    const orderItemToUpdate = new OrderItem("2", product2.name, product2.price, product2.id, 1);
    const orderToUpdate = new Order("1", "1", [orderItemToUpdate]);
    
    await orderRepository.update(orderToUpdate);
    const orderUpdated = await orderRepository.find(order.id);
    console.log(orderUpdated)
    expect(orderUpdated).toStrictEqual(orderToUpdate);

  });

  it("Should find an order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Mario Bros");
    const address = new Address(
      "Rua vinte", 12, "13211856", "Jundiaí"
    );
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order("1", "1", [orderItem]);
      
    const orderRepository = new OrderRepository();
    await orderRepository.create(order);
    
    const orderResult = await orderRepository.find("1");

    expect(orderResult).toStrictEqual(order);
  });

  it("Should throw an erro when orderId is not found", async () => {

    const orderRepository = new OrderRepository();
    expect(async () => {
      const orderResult = await orderRepository.find("123");
    }).rejects.toThrow("Order not found");
  });

  it("Should find all orders", async () => {

    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Mario Bros");
    const address = new Address(
      "Rua vinte", 12, "13211856", "Jundiaí"
    );
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 10);
    const product2 = new Product("2", "product 2", 20);

    await productRepository.create(product);
    await productRepository.create(product2);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const orderItem2 = new OrderItem(
      "2",
      product2.name,
      product2.price,
      product2.id,
      2
    );

    const order = new Order("1", "1", [orderItem]);
    const order2 = new Order("2", "1", [orderItem2]);
      
    const orderRepository = new OrderRepository();
    await orderRepository.create(order);
    await orderRepository.create(order2);

    const ordersResult = await orderRepository.findAll();
    const orders = [order, order2];

    expect(ordersResult).toHaveLength(2);
    expect(orders).toEqual(ordersResult);

  });
});