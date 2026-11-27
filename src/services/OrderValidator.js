class OrderValidator {
 validate(order,repository){
  if(!order.customer)throw new Error("Cliente obrigatorio.");
  const email=order.customer.getEmail();if(!email||!email.includes("@"))throw new Error("E-mail do cliente invalido.");
  if(!order.items||!order.items.length)throw new Error("Pedido sem itens.");
  for(const item of order.items){if(!item.product)throw new Error("Item sem produto.");if(item.quantity<=0)throw new Error("Quantidade invalida.");
   const p=repository.findById(item.product.id);if(!p)throw new Error(`Produto ${item.product.id} nao encontrado.`);
   if(p.stock<item.quantity)throw new Error(`Estoque insuficiente para ${p.name}.`);
  }
  if(!["pix","credit_card","boleto"].includes(order.paymentMethod))throw new Error("Forma de pagamento invalida.");
 }
}
module.exports=OrderValidator;
