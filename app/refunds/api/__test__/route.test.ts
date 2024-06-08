import { testApiHandler } from "next-test-api-route-handler";
import * as appHandler from "../route";
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { serialize } from 'object-to-formdata'

const mockResponse = {
    count: null,
    status: 200,
    data: ["test"],
    error: null,
    statusText: "OK"
}

const mockFormData = {
    refundDate: 'Fri, 07 Jun 2024 21:29:41 GMT',
    invoiceId: '14',
    invoiceStatus: 'partially_refunded',
    amount: '1',
    reason: 'Reason'
}

const mockFormDataInvalidId = {
    ...mockFormData,
    invoiceId: 'sp'
}

const server = setupServer(
    http.all(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/refund`,
        ({ request, params, requestId }) => {
            switch (request.method) {
                case "POST":
                    return HttpResponse.json(mockResponse);
                default:
                    return HttpResponse.json("Unhandled method");
            }
        })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Refund api', () => {
    it("POST returns 200", async () => {
        await testApiHandler({
            appHandler,
            test: async ({ fetch, }) => {
                const response = await fetch({ method: "POST", body: serialize(mockFormData) });
                const { count, data, error, statusText } = await response.json();
                expect(response.status).toBe(200);
                expect(count).toBe(null)
                expect(data.data).toEqual(['test'])
                expect(error).toBe(null)
                expect(statusText).toBe("OK")
            },
        });
    });

    it("POST returns 400 - Validation error", async () => {
        await testApiHandler({
            appHandler,
            test: async ({ fetch }) => {
                const response = await fetch({ method: "POST", body: serialize(mockFormDataInvalidId) });
                const { error } = await response.json();
                expect(response.status).toBe(400);
                expect(error).toStrictEqual(
                    { "code": "22P02", "details": null, "hint": null, "message": "invalid input syntax for type bigint: \"sp\"" }
                )
            }
        });
    });
})
