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

interface Invoice_DB {
    id: string;
    customer_id: string;
    status: InvoiceStatus;
    invoice_item: {
        id: number;
        description: string;
    }[];
    total_amount: number;
    create_at: string;
    due_date: string;
    update_at: string;
    interest_rate: number;
    interest_amount: number
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

interface Payment_DB {
    id: string;
    amount: number;
    payment_date: Date;
    payment_method: PaymentMethod;
    invoice: {
        id: number;
        status: InvoiceStatus
    }
}

// Refund model
interface Refund {
    id: string;
    invoiceId: string;
    amount: number;
    refundDate: Date;
    reason: string;
}

interface Refund_DB {
    id: string;
    amount: number;
    refund_date: Date;
    reason: string;
    invoice: {
        id: number;
        status: InvoiceStatus
    }
}

export { type Invoice, type Invoice_DB, type InvoiceLineItem, type Payment, type Payment_DB, type Refund, type Refund_DB, InvoiceStatus, PaymentMethod }