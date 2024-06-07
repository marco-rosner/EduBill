import { testApiHandler } from "next-test-api-route-handler";
import * as appHandler from "../route";
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'

const mockResponse = {
    count: null,
    status: 200,
    error: null,
    statusText: "OK"
}

const server = setupServer(
    http.all(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/invoice`,
        ({ request, params, requestId }) => {
            switch (request.method) {
                case "GET":
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

describe('Invoice api/applyinterest', () => {
    it("GET returns 200", async () => {
        await testApiHandler({
            appHandler,
            test: async ({ fetch }) => {
                const response = await fetch({ method: "GET" });
                const { count, data, error, statusText } = await response.json();
                expect(response.status).toBe(200);
                expect(count).toBe(null)
                expect(error).toBe(null)
                expect(statusText).toBe("OK")
            },
        });
    });
})
