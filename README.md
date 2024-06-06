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
- Payment page
- Refund page

## To Do

- Update Invoice
- Lists by status and check total_amount
- Interest calculation
- Tests
- Function: generate invoices monthly
- Deploy to Vercel