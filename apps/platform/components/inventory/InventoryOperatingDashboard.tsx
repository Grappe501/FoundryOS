"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { PortfolioOperatingRecord } from "../../lib/inventory-operations";

type Props = { items: PortfolioOperatingRecord[] };

type SortKey = "priority" | "readiness" | "revenue" | "value";

const money = (value: number) => {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(value % 1_000_000 === 0 ? 0 : 1)}M`;
  if (value >= 1_000) return `$${Math.round(value / 1_000)}K`;
  return `$${value.toLocaleString()}`;
};

const range = (low: number, high: number) => `${money(low)}–${money(high)}`;

export function InventoryOperatingDashboard({ items }: Props) {
  const [query, setQuery] = useState("");
  const [band, setBand] = useState("all");
  const [kind, setKind] = useState("all");
  const [sort, setSort] = useState<SortKey>("priority");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const rows = items.filter((item) => {
      const text = [item.name, item.customer, item.problem, item.productThesis, item.sourceRepos.join(" ")].join(" ").toLowerCase();
      return (!q || text.includes(q)) && (band === "all" || item.priorityBand === band) && (kind === "all" || item.kind === kind);
    });
    return rows.sort((a, b) => {
      if (sort === "readiness") return b.readiness - a.readiness;
      if (sort === "revenue") return b.annualRevenueHigh - a.annualRevenueHigh;
      if (sort === "value") return b.riskAdjustedIpValueHigh - a.riskAdjustedIpValueHigh;
      return b.priorityScore - a.priorityScore;
    });
  }, [items, query, band, kind, sort]);

  const selectStyle = { background: "#0f172a", border: "1px solid rgba(148,163,184,.35)", color: "#e5e7eb", borderRadius: 10, padding: "10px 12px" };

  return (
    <section style={{ marginTop: 24 }}>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(240px,2fr) repeat(3,minmax(150px,1fr))", gap: 10, marginBottom: 14 }}>
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search product, customer, problem, repository…" style={{ ...selectStyle, width: "100%" }} />
        <select value={band} onChange={(e) => setBand(e.target.value)} style={selectStyle}>
          <option value="all">All operating bands</option><option value="sell-now">Sell / pilot now</option><option value="finish-and-sell">Finish → sell</option><option value="incubate">Incubate / validate</option><option value="publish">Publishing track</option><option value="hold">Hold / blocker</option>
        </select>
        <select value={kind} onChange={(e) => setKind(e.target.value)} style={selectStyle}>
          <option value="all">All asset types</option><option value="software">Software</option><option value="platform">Platform</option><option value="book">Book</option><option value="service">Service</option><option value="component">Component</option>
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)} style={selectStyle}>
          <option value="priority">Priority score</option><option value="readiness">Readiness</option><option value="revenue">Revenue potential</option><option value="value">Risk-adjusted IP</option>
        </select>
      </div>

      <div style={{ fontSize: 13, color: "#94a3b8", marginBottom: 10 }}>{filtered.length} assets shown</div>

      <div style={{ overflowX: "auto", border: "1px solid rgba(148,163,184,.28)", borderRadius: 18, background: "rgba(15,23,42,.72)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 1300 }}>
          <thead><tr style={{ background: "rgba(30,41,59,.9)", textAlign: "left" }}>{["Priority", "Asset", "Ready", "Cash", "Customer / problem", "Revenue", "Risk-adjusted IP", "Executive action"].map((x) => <th key={x} style={{ padding: 14, color: "#94a3b8", fontSize: 11, textTransform: "uppercase", letterSpacing: ".08em" }}>{x}</th>)}</tr></thead>
          <tbody>{filtered.map((item) => <tr key={item.id} style={{ borderTop: "1px solid rgba(148,163,184,.16)", verticalAlign: "top" }}>
            <td style={{ padding: 14, width: 150 }}><div style={{ fontSize: 24, fontWeight: 900 }}>{item.priorityScore}</div><div style={{ fontSize: 11, color: item.priorityBand === "sell-now" ? "#86efac" : item.priorityBand === "hold" ? "#fca5a5" : "#93c5fd", fontWeight: 800 }}>{item.priorityLabel}</div></td>
            <td style={{ padding: 14, width: 230 }}><Link href={`/inventory/${item.id}`} style={{ color: "#fff", fontWeight: 900, textDecoration: "none" }}>{item.name} →</Link><div style={{ color: "#94a3b8", fontSize: 12, marginTop: 5 }}>{item.kind} · {item.evidenceConfidence}</div><div style={{ color: "#64748b", fontSize: 11, marginTop: 6 }}>{item.sourceRepos.join(" · ")}</div></td>
            <td style={{ padding: 14, width: 90 }}><strong style={{ fontSize: 20 }}>{item.readiness}%</strong><div style={{ height: 7, background: "#1e293b", borderRadius: 999, overflow: "hidden", marginTop: 8 }}><div style={{ width: `${item.readiness}%`, height: "100%", background: item.readiness >= 75 ? "#22c55e" : item.readiness >= 50 ? "#60a5fa" : "#f59e0b" }} /></div></td>
            <td style={{ padding: 14, width: 100 }}><strong>{item.cashVelocity}</strong><div style={{ color: "#94a3b8", fontSize: 11, marginTop: 5 }}>leverage {item.buildLeverage}</div></td>
            <td style={{ padding: 14, width: 320 }}><strong>{item.customer}</strong><div style={{ color: "#94a3b8", lineHeight: 1.45, marginTop: 6 }}>{item.problem}</div></td>
            <td style={{ padding: 14, whiteSpace: "nowrap", fontWeight: 800 }}>{range(item.annualRevenueLow, item.annualRevenueHigh)}</td>
            <td style={{ padding: 14, whiteSpace: "nowrap" }}>{range(item.riskAdjustedIpValueLow, item.riskAdjustedIpValueHigh)}</td>
            <td style={{ padding: 14, minWidth: 310 }}><div style={{ lineHeight: 1.45, color: "#dbeafe" }}>{item.executiveAction}</div><div style={{ fontSize: 12, color: "#94a3b8", marginTop: 8 }}><strong>Proof:</strong> {item.nextCommercialProof}</div></td>
          </tr>)}</tbody>
        </table>
      </div>
    </section>
  );
}
