import { testApiHandler } from "next-test-api-route-handler";
import * as appHandler from "../route";
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { serialize } from 'object-to-formdata'

const mockResponse = {
    count: null,
    status: 200,
    data: ["payment"],
    error: null,
    statusText: "OK"
}

const mockFormData = {
    paymentMethod: 'credit_card',
    paymentDate: 'Fri, 07 Jun 2024 21:49:42 GMT',
    invoiceId: '6',
    invoiceStatus: 'partially_paid',
    amount: '2'
}

const server = setupServer(
    http.all(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/payment`,
        ({ request, params, requestId }) => {
            switch (request.method) {
                case "POST":
                    return HttpResponse.json(mockResponse);
                default:
                    return HttpResponse.json("Unhandled method");
            }
        })
);

// Ideally you'd move this to a setupTests file
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Payment api', () => {
    it("POST returns 200", async () => {
        await testApiHandler({
            appHandler,
            test: async ({ fetch }) => {
                const response = await fetch({ method: "POST", body: serialize(mockFormData) });
                const { count, data, error, statusText } = await response.json();
                expect(response.status).toBe(200);
                expect(count).toBe(null)
                expect(data.data).toEqual(['payment'])
                expect(error).toBe(null)
                expect(statusText).toBe("OK")
            },
        });
    });
})
