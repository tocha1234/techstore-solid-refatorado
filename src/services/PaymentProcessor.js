class PaymentProcessor {
 process(method,installments,subtotal){
  if(method==="pix")return {status:"approved",fee:0};
  if(method==="credit_card")return {status:"approved",fee:installments>1?subtotal*.025:0};
  if(method==="boleto")return {status:"waiting_payment",fee:0};
  throw new Error("Forma de pagamento invalida.");
 }
}
module.exports=PaymentProcessor;
