import { http, HttpResponse, delay } from 'msw'

let pollCount = 0;

export const depositHandlers = [
  http.post('*/api/v1/deposits', async () => {
    await delay(500)
    pollCount = 0;
    return HttpResponse.json({
      success: true,
      data: {
        id: 'dep_123',
        status: 'pending',
        amount: '100.00',
        reference: 'REF123'
      }
    })
  }),

  http.get('*/api/v1/deposits/:id', async () => {
    await delay(500)
    pollCount++;
    const status = pollCount >= 3 ? 'completed' : 'pending';
    return HttpResponse.json({
      success: true,
      data: {
        id: 'dep_123',
        status,
        amount: '100.00',
        reference: 'REF123'
      }
    })
  })
]
