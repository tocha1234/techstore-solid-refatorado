const test=require("node:test");const assert=require("node:assert/strict");
const Address=require("../src/domain/Address"),Customer=require("../src/domain/Customer"),Order=require("../src/domain/Order"),OrderItem=require("../src/domain/OrderItem"),ProductRepository=require("../src/repositories/ProductRepository"),OrderService=require("../src/services/OrderService"),FreightCalculator=require("../src/services/FreightCalculator"),DiscountCalculator=require("../src/services/DiscountCalculator");
function fixture(method="pix",coupon=null,type="regular",items=null){
 const repo=new ProductRepository();const c=new Customer("c","Teste","teste@exemplo.com","1",type,new Address("Rua","1","Cidade","SP","000","sudeste"));
 const order=new Order("o1",c,items||[new OrderItem(repo.findById("p2"),2)],coupon,method,2);
 const service=new OrderService({productRepository:repo,notificationService:{sendOrderConfirmation(){}} ,logger:{info(){},warn(){},error(){}}});return {repo,order,service};
}
test("subtotal e peso calculados por Order",()=>{const f=fixture();assert.equal(f.order.getSubtotal(),240);assert.equal(f.order.getTotalWeight(),.4);});
test("frete regional calculado",()=>{assert.equal(new FreightCalculator().calculate("sudeste",2),28);});
test("desconto VIP e cupom aplicados",()=>{const f=fixture("credit_card","TECH10","vip");assert.equal(new DiscountCalculator().calculate(f.order,240),43.2);});
test("PIX confirma pedido e baixa estoque",()=>{const f=fixture();const initial=f.repo.findById("p2").stock;const s=f.service.process(f.order);assert.equal(s.status,"confirmed");assert.equal(f.repo.findById("p2").stock,initial-2);assert.equal(s.paymentFee,0);});
test("boleto gera pedido aguardando pagamento",()=>{const f=fixture("boleto");const s=f.service.process(f.order);assert.equal(s.status,"waiting_payment");});
test("pedido vazio é rejeitado",()=>{const f=fixture("pix",null,"regular",[]);assert.throws(()=>f.service.process(f.order),/Pedido sem itens/);});
test("estoque insuficiente é rejeitado antes da baixa",()=>{const f=fixture();f.order.items=[new OrderItem(f.repo.findById("p2"),999)];assert.throws(()=>f.service.process(f.order),/Estoque insuficiente/);});
test("forma de pagamento inválida é rejeitada",()=>{const f=fixture("invalid");assert.throws(()=>f.service.process(f.order),/Forma de pagamento invalida/);});
