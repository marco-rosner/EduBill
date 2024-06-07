export const getSubscription = (formData: FormData, i: number) => {
    return {
        description: formData.get(`description-${i}`),
        quantity: Number(formData.get(`quantity-${i}`)),
        unit_price: Number(formData.get(`unitPrice-${i}`)),
        total_amount: Number(formData.get(`totalAmount-${i}`))
    }
}

export const getInvoicePOST = (formData: FormData) => {
    return {
        customer_id: formData.get('customerId'),
        status: formData.get('status')?.toString().toLowerCase(),
        total_amount: Number(formData.get('totalAmount')),
        due_date: formData.get('dueDate'),
        interest_rate: Number(formData.get('interestRate'))
    }
}

export const getInvoicePUT = (formData: FormData) => {
    return {
        status: formData.get('status')?.toString().toLowerCase(),
        total_amount: Number(formData.get('totalAmount')),
        credit: Number(formData.get('credit')),
        due_date: formData.get('dueDate'),
        interest_rate: Number(formData.get('interestRate')),
        interest_amount: Number(formData.get('interestAmount'))
    }
}