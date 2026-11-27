class Customer {
 constructor(id,name,email,phone,type,address){Object.assign(this,{id,name,email,phone,type,address});}
 getName(){return this.name;} getEmail(){return this.email;} getType(){return this.type;}
 getCity(){return this.address.city;} getState(){return this.address.state;} getRegion(){return this.address.getRegion();}
}
module.exports=Customer;
