import { http, HttpResponse, delay } from 'msw'

export const authHandlers = [
  http.post('*/api/v1/auth/telegram', async () => {
    await delay(500)
    
    // Simulate validation error
    // return HttpResponse.json({ success: false, message: 'Invalid Telegram data' }, { status: 422 })

    return HttpResponse.json({
      success: true,
      data: {
        token: 'mock_jwt_token_123',
        user: { id: 1, name: 'Test User' }
      }
    })
  })
]
