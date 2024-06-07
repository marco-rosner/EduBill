# EduBill

A billing system for a subscription-based online education platform

## Lists

### Invoices page

In the Invoices page is possible to choose the status of invoices that will be shown in the list. Default value is *pending*.

### Payments page

In the Payments page, the list will show the invoices filtered by status in pending or partiallly paid.

### Refund page

In the Refund page, the list will show the invoices filtered by status in paid or partiallly refunded.

## Apply Interest

There a button on Header that will call a stored procedure ([code here](./database/applyInterest.pgsql)) on database (postgresql/supabase) to calculate the interest for all invoice that pass the due data and the status is not paid and has positive value on total_amount attribute.

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
- Update Invoice
- Interest calculation
- Improve Error Handling
- Validate types API

## To Do

- Tests
- Deploy to Vercel

## Future improvements
- Add a invoice transactions table to save the invoice history