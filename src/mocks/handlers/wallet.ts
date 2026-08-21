import { http, HttpResponse, delay } from 'msw'

export const walletHandlers = [
  http.get('*/api/v1/wallet', async () => {
    await delay(600)
    return HttpResponse.json({
      success: true,
      data: {
        balance: '1500.00',
        reserved_balance: '150.00', // bonus balance
        currency: 'ETB'
      }
    })
  }),

  http.get('*/api/v1/transactions', async () => {
    await delay(400)
    return HttpResponse.json({
      success: true,
      data: {
        data: [
          { id: 1, type: 'deposit', amount: '500.00', created_at: new Date().toISOString() },
          { id: 2, type: 'bet', amount: '50.00', created_at: new Date(Date.now() - 3600000).toISOString() },
          { id: 3, type: 'win', amount: '120.00', created_at: new Date(Date.now() - 7200000).toISOString() },
        ],
        next_page_url: null
      }
    })
  })
]
