import Pusher from 'pusher-js'

export const pusherClient = new Pusher(process.env.KEY, {
    cluster: process.env.CLUSTER,
})