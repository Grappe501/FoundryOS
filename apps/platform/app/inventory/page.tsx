import type { CSSProperties } from "react";
import { companyInventory, inventorySummary, inventoryValuationDoctrine } from "../../lib/company-inventory";

const money = (value: number) => {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(value % 1_000_000 === 0 ? 0 : 1)}M`;
  if (value >= 1_000) return `$${Math.round(value / 1_000)}K`;
  return `$${value.toLocaleString()}`;
};

const range = (low: number, high: number) => `${money(low)}–${money(high)}`;

const card: CSSProperties = {
  border: "1px solid rgba(148,163,184,.28)",
  borderRadius: 18,
  background: "rgba(15,23,42,.72)",
  padding: 20,
  boxShadow: "0 10px 30px rgba(2,6,23,.16)",
};

const label: CSSProperties = {
  color: "#94a3b8",
  textTransform: "uppercase",
  letterSpacing: ".08em",
  fontSize: 12,
  fontWeight: 800,
};

export default function InventoryPage() {
  const ordered = [...companyInventory].sort((a, b) => b.readiness - a.readiness || b.commercialPotentialHigh - a.commercialPotentialHigh);

  return (
    <main style={{ minHeight: "100vh", background: "linear-gradient(180deg,#020617 0%,#0f172a 45%,#111827 100%)", color: "#e5e7eb", padding: "42px 22px 80px" }}>
      <div style={{ maxWidth: 1440, margin: "0 auto" }}>
        <header style={{ marginBottom: 32 }}>
          <div style={{ ...label, color: "#60a5fa" }}>Company Foundry · Canonical Portfolio Ledger</div>
          <h1 style={{ fontSize: "clamp(2.2rem,5vw,4.5rem)", lineHeight: 1, margin: "10px 0 16px", letterSpacing: "-.04em" }}>Product & IP Inventory</h1>
          <p style={{ maxWidth: 930, fontSize: 18, lineHeight: 1.65, color: "#cbd5e1", margin: 0 }}>
            One operating picture for the products, platforms, books, and reusable intellectual property already inside FoundryOS. Readiness, repositories, customer problem, remaining work, revenue scenarios, and valuation layers are deliberately kept separate so the portfolio can be managed without confusing ambition with proof.
          </p>
        </header>

        <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))", gap: 14, marginBottom: 24 }}>
          {[
            ["Portfolio assets", inventorySummary.productCount.toString()],
            ["Average readiness", `${inventorySummary.weightedReadiness}%`],
            ["Revenue scenarios", range(inventorySummary.annualRevenueLow, inventorySummary.annualRevenueHigh)],
            ["Replacement value", range(inventorySummary.replacementValueLow, inventorySummary.replacementValueHigh)],
            ["Risk-adjusted IP", range(inventorySummary.riskAdjustedIpValueLow, inventorySummary.riskAdjustedIpValueHigh)],
            ["Commercial potential", range(inventorySummary.commercialPotentialLow, inventorySummary.commercialPotentialHigh)],
          ].map(([name, value]) => (
            <div key={name} style={card}>
              <div style={label}>{name}</div>
              <div style={{ fontSize: 28, fontWeight: 900, marginTop: 8, letterSpacing: "-.03em" }}>{value}</div>
            </div>
          ))}
        </section>

        <section style={{ ...card, marginBottom: 24, borderColor: "rgba(251,191,36,.35)", background: "rgba(120,53,15,.15)" }}>
          <div style={{ ...label, color: "#fbbf24" }}>Valuation doctrine</div>
          <p style={{ margin: "8px 0 16px", lineHeight: 1.6, color: "#fde68a" }}>{inventoryValuationDoctrine.warning}</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 14 }}>
            {inventoryValuationDoctrine.layers.map((item) => (
              <div key={item.id} style={{ padding: 14, borderRadius: 14, background: "rgba(2,6,23,.42)" }}>
                <strong>{item.label}</strong>
                <p style={{ color: "#d1d5db", lineHeight: 1.55, marginBottom: 0 }}>{item.definition}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ overflowX: "auto", ...card, padding: 0 }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 1260 }}>
            <thead>
              <tr style={{ background: "rgba(30,41,59,.9)", textAlign: "left" }}>
                {["Asset", "Ready", "Disposition", "Customer / Problem", "Revenue", "Replacement", "Risk-adjusted IP", "Commercial potential", "Next build"].map((item) => (
                  <th key={item} style={{ padding: "15px 14px", ...label, color: "#cbd5e1" }}>{item}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ordered.map((item) => (
                <tr key={item.id} style={{ borderTop: "1px solid rgba(148,163,184,.18)", verticalAlign: "top" }}>
                  <td style={{ padding: 14, width: 210 }}>
                    <div style={{ fontWeight: 900, fontSize: 16 }}>{item.name}</div>
                    <div style={{ color: "#94a3b8", fontSize: 12, marginTop: 6 }}>{item.kind} · {item.evidenceConfidence}</div>
                    <div style={{ color: "#64748b", fontSize: 11, marginTop: 7 }}>{item.sourceRepos.join(" · ")}</div>
                  </td>
                  <td style={{ padding: 14, width: 90 }}>
                    <div style={{ fontWeight: 900, fontSize: 20 }}>{item.readiness}%</div>
                    <div style={{ height: 7, background: "#1e293b", borderRadius: 999, overflow: "hidden", marginTop: 8 }}>
                      <div style={{ width: `${item.readiness}%`, height: "100%", background: item.readiness >= 75 ? "#22c55e" : item.readiness >= 50 ? "#60a5fa" : "#f59e0b" }} />
                    </div>
                  </td>
                  <td style={{ padding: 14, width: 165, fontSize: 12, fontWeight: 800 }}>{item.dispositionLabel}</td>
                  <td style={{ padding: 14, width: 300 }}>
                    <div style={{ fontWeight: 700 }}>{item.customer}</div>
                    <div style={{ color: "#94a3b8", lineHeight: 1.45, marginTop: 7 }}>{item.problem}</div>
                    <div style={{ color: "#bfdbfe", lineHeight: 1.45, marginTop: 7 }}>{item.productThesis}</div>
                  </td>
                  <td style={{ padding: 14, whiteSpace: "nowrap", fontWeight: 800 }}>{range(item.annualRevenueLow, item.annualRevenueHigh)}</td>
                  <td style={{ padding: 14, whiteSpace: "nowrap" }}>{range(item.replacementValueLow, item.replacementValueHigh)}</td>
                  <td style={{ padding: 14, whiteSpace: "nowrap" }}>{range(item.riskAdjustedIpValueLow, item.riskAdjustedIpValueHigh)}</td>
                  <td style={{ padding: 14, whiteSpace: "nowrap" }}>{range(item.commercialPotentialLow, item.commercialPotentialHigh)}</td>
                  <td style={{ padding: 14, minWidth: 250 }}>
                    <ul style={{ margin: 0, paddingLeft: 18, color: "#cbd5e1", lineHeight: 1.5 }}>
                      {item.remainingBuild.slice(0, 4).map((next) => <li key={next}>{next}</li>)}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section style={{ ...card, marginTop: 24 }}>
          <div style={{ ...label, color: "#60a5fa" }}>Executive interpretation</div>
          <h2 style={{ margin: "8px 0", fontSize: 30 }}>The company is not one product.</h2>
          <p style={{ color: "#cbd5e1", lineHeight: 1.65, maxWidth: 1000, marginBottom: 0 }}>
            The portfolio is a collection of reusable systems, operating knowledge, content, research, and products at different maturity levels. The management job is to convert the strongest near-term assets into paid proof while protecting long-horizon IP, consolidating overlapping repositories, and refusing to count speculative future revenue as present company value.
          </p>
        </section>
      </div>
    </main>
  );
}
