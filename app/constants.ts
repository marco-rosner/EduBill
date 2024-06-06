export const DEFAULT_URL = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

export const CUSTOMER_ID = 1

export const INVOICE_STATUS = {
    pending: 'Pending',
    paid: 'Paid',
    partially_paid: 'Partially Paid',
    refunded: 'Refunded',
    partially_refunded: 'Partially Refunded',
}

export const PAYMENT_METHOD = {
    credit_card: 'Credit Card',
    bank_transfer: 'Bank Transfer',
    paypal: 'PayPal'
}