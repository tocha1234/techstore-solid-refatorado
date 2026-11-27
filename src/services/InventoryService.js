class InventoryService {
 constructor(repository){this.repository=repository;}
 updateForOrder(order){for(const item of order.items)this.repository.updateStock(item.product.id,item.quantity);}
}
module.exports=InventoryService;
