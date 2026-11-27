class DiscountCalculator {
 calculate(order,subtotal){
  let discount=0;
  if(order.customer.getType()==="vip")discount+=subtotal*.08;
  if(order.customer.getType()==="employee")discount+=subtotal*.15;
  if(order.couponCode==="TECH10")discount+=subtotal*.10;
  if(order.couponCode==="FRETEGRATIS")discount+=0;
  if(subtotal>8000)discount+=250;
  if(order.paymentMethod==="pix")discount+=subtotal*.03;
  return discount;
 }
}
module.exports=DiscountCalculator;
