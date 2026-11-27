const Address=require("./domain/Address"),Customer=require("./domain/Customer"),Order=require("./domain/Order"),OrderItem=require("./domain/OrderItem");
const ProductRepository=require("./repositories/ProductRepository"),OrderService=require("./services/OrderService");
const repository=new ProductRepository();
const customer=new Customer("c1","Ana Souza","ana.souza@example.com","18999990000","vip",new Address("Rua das Palmeiras","120","Presidente Prudente","SP","19000-000","sudeste"));
const order=new Order("o1001",customer,[new OrderItem(repository.findById("p1"),1),new OrderItem(repository.findById("p2"),2)],"TECH10","credit_card",3);
const service=new OrderService({productRepository:repository});
console.log(JSON.stringify(service.process(order),null,2));
