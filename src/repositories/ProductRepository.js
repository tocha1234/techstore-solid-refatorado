const Product=require("../domain/Product");
class ProductRepository {
 constructor(products){this.products=products||[new Product("p1","Notebook Pro 14","notebook",6200,2.1,8),new Product("p2","Mouse Sem Fio","peripheral",120,0.2,30),new Product("p3","Monitor 27","monitor",1450,5.4,12),new Product("p4","Teclado Mecanico","peripheral",380,0.9,15)];}
 findById(id){return this.products.find(p=>p.id===id);}
 updateStock(id,q){const p=this.findById(id);if(!p)throw new Error("Produto nao encontrado.");if(p.stock<q)throw new Error("Estoque insuficiente.");p.stock-=q;return p;}
 list(){return [...this.products];}
}
module.exports=ProductRepository;
