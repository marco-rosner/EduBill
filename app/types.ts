enum InvoiceStatus {
    PENDING = 'pending',
    PAID = 'paid',
    PARTIALLY_PAID = 'partially_paid',
    REFUNDED = 'refunded',
    PARTIALLY_REFUNDED = 'partially_refunded',
}

enum PaymentMethod {
    CREDIT = 'credit_card',
    BANK = 'bank_transfer',
    PAYPAL = 'paypal'
}

// Invoice model
interface Invoice {
    id: string;
    customerId: string;
    status: InvoiceStatus;
    totalAmount: number;
    createdAt: Date;
    dueDate: Date;
    updatedAt: Date;
    lineItems: InvoiceLineItem[];
    interestRate: number; // monthly interest rate as a percentage
    interestAmount?: number; // calculated interest amount on unpaid balance
}

// InvoiceLineItem model
interface InvoiceLineItem {
    id: string;
    description: string;
    quantity: number;
    unitPrice: number;
    totalAmount: number;
}

// Payment model
interface Payment {
    id: string;
    invoiceId: string;
    amount: number;
    paymentDate: Date;
    paymentMethod: PaymentMethod;
}

// Refund model
interface Refund {
    id: string;
    invoiceId: string;
    amount: number;
    refundDate: Date;
    reason: string;
}

export { type Invoice, type InvoiceLineItem, type Payment, type Refund, InvoiceStatus, PaymentMethod }