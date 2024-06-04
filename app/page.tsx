import Header from "@/components/Header";
import ListInvoices from "@/components/ListInvoices/ListInvoices";

export default async function Index() {

  return (
    <div className="flex-1 w-full flex flex-col gap-10 items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
          Menu
        </div>
      </nav>

      <div className="animate-in flex-1 flex flex-col gap-18 opacity-0 max-w-4xl px-3">
        <Header />
        <main className="flex-1 flex flex-col gap-6">
          <h2 className="font-bold text-4xl mb-4">Current invoices</h2>
          {/* @ts-expect-error Async Server Component */}
          <ListInvoices />
        </main>
      </div>

      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <p>
          Made by{" "}
          <a
            href="https://github.com/marco-rosner"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            Marco Rosner
          </a>
        </p>
      </footer>
    </div>
  );
}
