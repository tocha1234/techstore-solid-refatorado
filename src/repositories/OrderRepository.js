class OrderRepository {constructor(){this.orders=[];} save(summary){this.orders.push(summary);return summary;} findAll(){return [...this.orders];}}
module.exports=OrderRepository;
