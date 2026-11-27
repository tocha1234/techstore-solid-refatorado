class Address {
 constructor(street,number,city,state,zipCode,region){Object.assign(this,{street,number,city,state,zipCode,region});}
 getRegion(){return this.region;}
}
module.exports=Address;
