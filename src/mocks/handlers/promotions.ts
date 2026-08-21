import { http, HttpResponse, delay } from 'msw'

export const promotionHandlers = [
  http.post('*/api/v1/promotions/redeem', async () => {
    await delay(500)
    // const { code } = await request.json() as any;
    // mock coupon redemption
    return HttpResponse.json({
      success: true,
      data: {
        message: 'Coupon redeemed successfully',
        bonus_amount: '50.00'
      }
    })
  })
]
