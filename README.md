# EduBill

A billing system for a subscription-based online education platform

## How to sync database model and create seed

```
npx @snaplet/seed sync
npx tsx seed.ts > seed.sql
```

## Done
- Supabase configuration
- Seed.sql
- Index page
- List invoices
- Pages layout
- Create Invoice API
- Invoice page

## To Do

- Payment page
- Refund page
- Update Invoice
- List Invoice by status
- Interest calculation
- Function: generate invoices monthly
- Deploy to Vercel