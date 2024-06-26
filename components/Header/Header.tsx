"use client"

import { applyInterest } from "@/app/actions";

export const Header = (): React.ReactElement => (
  <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
    <div className="w-full max-w-4xl flex justify-center items-center p-3 text-sm">
      <a href="/">Home</a>
      <span className="border-l rotate-180 m-5 h-6" />
      <a href="/invoices">Invoices</a>
      <span className="border-l rotate-180 m-5 h-6" />
      <a href="/payments">Payments</a>
      <span className="border-l rotate-180 m-5 h-6" />
      <a href="/refunds">Refund</a>
      <span className="border-l rotate-180 m-5 h-6" />
      <button onClick={async () => { await applyInterest() }}>Apply Interest</button>
    </div>
  </nav>
);
