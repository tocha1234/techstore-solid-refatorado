const OrderValidator=require("./OrderValidator");
const DiscountCalculator=require("./DiscountCalculator");
const FreightCalculator=require("./FreightCalculator");
const PaymentProcessor=require("./PaymentProcessor");
const InventoryService=require("./InventoryService");
const OrderRepository=require("../repositories/OrderRepository");
const NotificationService=require("./NotificationService");
const Logger=require("../utils/Logger");
class OrderService {
 constructor({productRepository,orderRepository=new OrderRepository(),validator=new OrderValidator(),discountCalculator=new DiscountCalculator(),freightCalculator=new FreightCalculator(),paymentProcessor=new PaymentProcessor(),notificationService=new NotificationService(),logger=new Logger()}){
  if(!productRepository)throw new Error("ProductRepository obrigatorio.");
  Object.assign(this,{productRepository,orderRepository,validator,discountCalculator,freightCalculator,paymentProcessor,notificationService,logger});
  this.inventoryService=new InventoryService(productRepository);
 }
 process(order){
  this.logger.info(`Iniciando processamento do pedido ${order.id}.`);
  this.validator.validate(order,this.productRepository);
  const subtotal=order.getSubtotal(),weight=order.getTotalWeight();
  let discount=this.discountCalculator.calculate(order,subtotal);
  let freight=this.freightCalculator.calculate(order.customer.getRegion(),weight);
  if(order.couponCode==="FRETEGRATIS")freight=0;
  const payment=this.paymentProcessor.process(order.paymentMethod,order.installments,subtotal);
  const total=Number((subtotal-discount+freight+payment.fee).toFixed(2));
  if(total<=0)throw new Error("Total do pedido invalido.");
  this.inventoryService.updateForOrder(order);
  order.status=payment.status==="approved"?"confirmed":"waiting_payment";
  const summary={id:order.id,customerName:order.customer.getName(),customerEmail:order.customer.getEmail(),city:order.customer.getCity(),state:order.customer.getState(),
   items:order.items.map(i=>({productId:i.product.id,name:i.product.name,quantity:i.quantity,subtotal:i.getSubtotal()})),
   subtotal,discount:Number(discount.toFixed(2)),freight:Number(freight.toFixed(2)),paymentFee:Number(payment.fee.toFixed(2)),total,paymentMethod:order.paymentMethod,status:order.status,createdAt:order.createdAt};
  this.orderRepository.save(summary);
  if(order.status==="confirmed")this.notificationService.sendOrderConfirmation(order.customer,order.id,total);else this.logger.warn(`Pedido ${order.id} aguardando pagamento.`);
  return summary;
 }
}
module.exports=OrderService;
