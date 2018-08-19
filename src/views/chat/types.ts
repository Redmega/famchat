export type Message = {
    id: string,
    body: string,
    from: string,
    meta: boolean,
}

export type Room = {
    members: {
        [id: string]: {
            name: string
        }
    }
}