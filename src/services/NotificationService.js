class NotificationService {sendOrderConfirmation(customer,orderId,total){console.log(`Notificacao enviada para ${customer.getEmail()}: pedido ${orderId}, total R$ ${total.toFixed(2)}.`);}}
module.exports=NotificationService;
