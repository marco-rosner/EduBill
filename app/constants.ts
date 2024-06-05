export const DEFAULT_URL = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

export const CUSTOMER_ID = 1

export const INVOICE_STATUS = ['Pending', 'Paid', 'Partially Paid', 'Refunded', 'Partially Refunded']