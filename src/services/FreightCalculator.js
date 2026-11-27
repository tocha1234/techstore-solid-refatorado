class FreightCalculator {
 calculate(region,weight){
  const rates={"sudeste":[20,4],"sul":[28,5],"centro-oeste":[35,6],"nordeste":[45,7],"norte":[60,9]};
  const [base,perKg]=rates[region]||[50,8];return base+weight*perKg;
 }
}
module.exports=FreightCalculator;
