import Pusher from 'pusher-js'

export const pusherClient = new Pusher("622f1b31cc98d1102966", {
    cluster: 'us2',
    forceTLS: true,
    disableStats: true,

    
})

