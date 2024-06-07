import { testApiHandler } from "next-test-api-route-handler";
import * as appHandler from "../route";
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { serialize } from 'object-to-formdata'

const mockPOSTResponse = {
    count: null,
    status: 200,
    error: null,
    statusText: "OK"
}

const mockPUTResponse = {
    count: null,
    status: 200,
    error: null,
    statusText: "OK"
}

const mockFormPOSTData = {
    subscriptionsLength: '1',
    dueDate: 'Fri, 07 Jun 2024 21:54:29 GMT',
    customerId: '1',
    status: 'Pending',
    'id-0': '1',
    'description-0': 'Postegresql',
    'quantity-0': '2',
    'unitPrice-0': '5',
    'totalAmount-0': '10',
    interestRate: '0.3',
    totalAmount: '10'
}

const mockFormPUTData = {
    status: 'pending',
    subscriptionsLength: '1',
    dueDate: '2024-06-07T21:54:29',
    invoiceId: '15',
    'id-0': '16',
    'description-0': 'Postegres',
    'quantity-0': '2',
    'unitPrice-0': '5',
    'totalAmount-0': '10',
    interestRate: '0.3',
    credit: '0',
    interestAmount: '0',
    totalAmount: '10'
}

const server = setupServer(
    http.all(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/refund`,
        ({ request, params, requestId }) => {
            switch (request.method) {
                case "POST":
                    return HttpResponse.json(mockPOSTResponse);
                case "PUT":
                    return HttpResponse.json(mockPUTResponse);
                default:
                    return HttpResponse.json("Unhandled method");
            }
        })
);

// Ideally you'd move this to a setupTests file
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Invoice api', () => {
    it("POST returns 200", async () => {
        await testApiHandler({
            appHandler,
            test: async ({ fetch }) => {
                const response = await fetch({ method: "POST", body: serialize(mockFormPOSTData) });
                const { count, data, error, statusText } = await response.json();
                expect(response.status).toBe(200);
                expect(count).toBe(null)
                expect(error).toBe(null)
                expect(statusText).toBe("Created")
            },
        });
    });

    it("PUT returns 200", async () => {
        await testApiHandler({
            appHandler,
            test: async ({ fetch }) => {
                const response = await fetch({ method: "PUT", body: serialize(mockFormPUTData) });
                const { count, data, error, statusText } = await response.json();
                expect(response.status).toBe(200);
                expect(count).toBe(null)
                expect(error).toBe(null)
                expect(statusText).toBe("No Content")
            },
        });
    });
})
