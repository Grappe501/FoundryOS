import Link from "next/link";
import { notFound } from "next/navigation";
import { getInventoryAsset } from "../../../lib/inventory-operations";

const money=(v:number)=>v>=1_000_000?`$${(v/1_000_000).toFixed(v%1_000_000===0?0:1)}M`:v>=1_000?`$${Math.round(v/1_000)}K`:`$${v.toLocaleString()}`;
const range=(a:number,b:number)=>`${money(a)}–${money(b)}`;
const card={border:"1px solid rgba(148,163,184,.28)",borderRadius:18,background:"rgba(15,23,42,.72)",padding:20} as const;

export default async function InventoryAssetPage({params}:{params:Promise<{id:string}>}){
  const {id}=await params; const item=getInventoryAsset(id); if(!item)notFound();
  return <main style={{minHeight:"100vh",background:"linear-gradient(180deg,#020617,#0f172a 55%,#111827)",color:"#e5e7eb",padding:"38px 22px 80px"}}><div style={{maxWidth:1180,margin:"0 auto"}}>
    <Link href="/inventory" style={{color:"#93c5fd",textDecoration:"none"}}>← Product & IP Inventory</Link>
    <header style={{margin:"24px 0"}}><div style={{color:"#60a5fa",fontSize:12,fontWeight:900,letterSpacing:".09em"}}>{item.priorityLabel} · PRIORITY {item.priorityScore}</div><h1 style={{fontSize:"clamp(2.2rem,5vw,4rem)",margin:"8px 0",letterSpacing:"-.04em"}}>{item.name}</h1><p style={{fontSize:18,lineHeight:1.6,color:"#cbd5e1",maxWidth:900}}>{item.productThesis}</p></header>
    <section style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(190px,1fr))",gap:12,marginBottom:20}}>{[["Readiness",`${item.readiness}%`],["Cash velocity",item.cashVelocity],["Revenue scenario",range(item.annualRevenueLow,item.annualRevenueHigh)],["Replacement value",range(item.replacementValueLow,item.replacementValueHigh)],["Risk-adjusted IP",range(item.riskAdjustedIpValueLow,item.riskAdjustedIpValueHigh)],["Commercial potential",range(item.commercialPotentialLow,item.commercialPotentialHigh)]].map(([k,v])=><div key={k} style={card}><div style={{color:"#94a3b8",fontSize:11,textTransform:"uppercase",letterSpacing:".08em"}}>{k}</div><strong style={{display:"block",fontSize:24,marginTop:7}}>{v}</strong></div>)}</section>
    <section style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))",gap:16}}>
      <article style={card}><h2>Customer & problem</h2><p><strong>{item.customer}</strong></p><p style={{color:"#cbd5e1",lineHeight:1.6}}>{item.problem}</p></article>
      <article style={card}><h2>Executive action</h2><p style={{color:"#dbeafe",lineHeight:1.6}}>{item.executiveAction}</p><p style={{color:"#94a3b8",lineHeight:1.55}}><strong>Next commercial proof:</strong> {item.nextCommercialProof}</p></article>
      <article style={card}><h2>Remaining build</h2><ol style={{paddingLeft:20,lineHeight:1.7}}>{item.remainingBuild.map(x=><li key={x}>{x}</li>)}</ol></article>
      <article style={card}><h2>Evidence</h2><p><strong>Confidence:</strong> {item.evidenceConfidence}</p><ul style={{paddingLeft:20,lineHeight:1.7,color:"#cbd5e1"}}>{item.evidenceNotes.map(x=><li key={x}>{x}</li>)}</ul></article>
      <article style={card}><h2>Source repositories</h2><ul style={{paddingLeft:20,lineHeight:1.7}}>{item.sourceRepos.map(x=><li key={x}>{x}</li>)}</ul></article>
      <article style={card}><h2>Strategic posture</h2><p><strong>{item.dispositionLabel}</strong></p><p style={{color:"#cbd5e1",lineHeight:1.6}}>{item.strategicNotes??"No additional strategic note recorded."}</p><p style={{color:"#94a3b8"}}>Build leverage: {item.buildLeverage}</p></article>
    </section>
  </div></main>;
}
