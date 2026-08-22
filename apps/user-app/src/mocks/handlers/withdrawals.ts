import { http, HttpResponse, delay } from 'msw'

let pollCount = 0;

export const withdrawalHandlers = [
  http.post('*/api/v1/withdrawals', async () => {
    await delay(500)
    pollCount = 0;
    return HttpResponse.json({
      success: true,
      data: {
        id: 'wd_123',
        status: 'pending',
        amount: '200.00'
      }
    })
  }),

  http.get('*/api/v1/withdrawals/:id', async () => {
    await delay(500)
    pollCount++;
    const status = pollCount >= 3 ? 'completed' : 'pending';
    return HttpResponse.json({
      success: true,
      data: {
        id: 'wd_123',
        status,
        amount: '200.00'
      }
    })
  })
]
