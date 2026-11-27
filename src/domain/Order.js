class Order {
 constructor(id,customer,items,couponCode,paymentMethod,installments){Object.assign(this,{id,customer,items,couponCode,paymentMethod,installments});this.status="created";this.createdAt=new Date();}
 getTotalItems(){return this.items.reduce((t,i)=>t+i.quantity,0);}
 getSubtotal(){return this.items.reduce((t,i)=>t+i.getSubtotal(),0);}
 getTotalWeight(){return this.items.reduce((t,i)=>t+i.getWeight(),0);}
}
module.exports=Order;
