import { http, HttpResponse, delay } from 'msw'

export const gameHandlers = [
  http.get('*/api/v1/games', async () => {
    await delay(400)
    return HttpResponse.json({
      success: true,
      data: [
        { id: 'g_1', name: 'Aviator', provider: 'Spribe', hot: true, thumbnail: 'https://i.pinimg.com/736x/23/42/04/23420488fb869cabc71d55629110c12b.jpg' },
        { id: 'g_2', name: 'Keno Classic', provider: 'Ahadu', hot: false, thumbnail: 'https://i.pinimg.com/736x/d9/7a/aa/d97aaa67e173b31a9a8d2e2df3cc34e5.jpg' },
        { id: 'g_3', name: 'Mines', provider: 'Spribe', hot: true, thumbnail: 'https://i.pinimg.com/736x/69/00/eb/6900eb0a764f364ee767ded173685a0a.jpg' },
        { id: 'g_4', name: 'Plinko', provider: 'Spribe', hot: false, thumbnail: 'https://i.pinimg.com/736x/4a/f0/3c/4af03c2b426d1548cf1eaa77f5d6c2c3.jpg' },
        { id: 'g_5', name: 'Dice', provider: 'Turbo', hot: false, thumbnail: 'https://i.pinimg.com/736x/51/78/bb/5178bbdb1a6accf54c13feb85cdb42ac.jpg' },
        { id: 'g_6', name: 'Goal', provider: 'Spribe', hot: true, thumbnail: 'https://i.pinimg.com/736x/99/c2/c1/99c2c108201f3ae767e8ea89c6304a3b.jpg' },
      ]
    })
  }),

  http.post('*/api/v1/games/:id/launch', async ({ params }) => {
    await delay(600)
    return HttpResponse.json({
      success: true,
      data: {
        launch_url: `https://example.com/games/${params.id}?token=mock_session_token`
      }
    })
  })
]
