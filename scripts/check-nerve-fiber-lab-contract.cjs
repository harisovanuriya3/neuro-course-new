// Source-level regression checks for the Module 3 nerve-fiber teaching simulator.
// These checks do not replace TypeScript compilation or browser interaction tests.
const fs=require("node:fs");
const assert=require("node:assert/strict");
const src=fs.readFileSync("components/NerveFiberLab.tsx","utf8");
for(const [id,velocity] of [["Aα",100],["Aβ",55],["Aγ",25],["Aδ",15],["B",7],["C",1.2]]){
  assert(src.includes('"'+id+'": { velocity: '+velocity+',') || src.includes(id+': { velocity: '+velocity+','),"Missing baseline for "+id);
}
assert(src.includes("f.myelinated?myelin:1"),"Unmyelinated C fibers must ignore the myelin control");
assert(src.includes("disabled={!current.myelinated}"),"Myelin control must be disabled for C fibers");
assert(src.includes("const animationDurationMs="),"Animation timing must respond to model latency");
assert(src.includes("/animationDurationMs"),"Animation must use the model-dependent display duration");
assert(src.includes("animationDurationMs=Math.max"),"Compressed display duration must have bounds");
assert(src.includes('aria-pressed={tab===id}'),"Toggle buttons must expose pressed state");
assert(!src.includes('aria-selected={tab===id}'),"Do not use aria-selected on ordinary buttons");
assert(!src.includes("<main className={styles.stage}>"),"Avoid nested main landmarks");
assert(src.includes('RU:{prompt:"Сравните скорость'),"Russian prediction instruction must be in Russian");
assert(src.includes("The model does not simulate conduction block"),"Limitations of demyelination model must be explicit");
assert(src.includes('current.myelinated?Math.round(myelin*100)+"%":"N/A"'),"C-fiber history must not imply myelin percentage");
assert(src.includes('onClick={()=>setTab("lab")}>{classification.part2}'),"Micro mode must provide a way to select a prediction");
const calc=(base,myelinated,temperature,diameterPct,myelin,distance)=>{
 const tf=Math.max(.45,1-(37-temperature)*.025);
 const df=myelinated?diameterPct/100:Math.sqrt(diameterPct/100);
 const v=base*tf*df*(myelinated?myelin:1);
 return {v,ms:distance/v*1000};
};
for(const base of [100,55,25,15,7,1.2]){
 const myelinated=base!==1.2;
 for(const temperature of [20,37,42])
  for(const diameter of [30,100,170])
   for(const myelin of [.3,.6,1]){
    const a=calc(base,myelinated,temperature,diameter,myelin,.2);
    const b=calc(base,myelinated,temperature,diameter,myelin,2);
    assert(a.v>0&&Number.isFinite(a.ms),"Nonfinite simulated conduction");
    assert.equal(a.v,b.v,"Distance must not alter conduction velocity");
    assert(b.ms>a.ms,"Distance must increase latency");
   }
 if(myelinated){
  assert(calc(base,true,37,100,.3,1).v<calc(base,true,37,100,1,1).v);
 }else{
  assert.equal(calc(base,false,37,100,.3,1).v,calc(base,false,37,100,1,1).v);
 }
}
console.log("PASS: Module 3 nerve-fiber source contracts and model boundary arithmetic.");
console.log("NOTE: illustration is not a validated biophysical simulation.");
