# EduBill

A billing system for a subscription-based online education platform

## Lists

### Invoices page

In the Invoices page is possible to choose the status of invoices that will be shown in the list. Default value is *pending*.

### Payments page

In the Payments page, the list will show the invoices filtered by status in pending or partiallly paid.

### Refund page

In the Refund page, the list will show the invoices filtered by status in paid or partiallly refunded.

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
- Lists by status and credit

## To Do

- Update Invoice
- Interest calculation
- Tests
- Function: generate invoices monthly
- Deploy to Vercel