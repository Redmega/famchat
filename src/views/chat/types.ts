export type Message = {
    id: string,
    body: string,
    from: string
}

export type Room = {
    members: {
        [id: string]: {
            name: string
        }
    }
}