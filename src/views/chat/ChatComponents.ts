import styled from 'react-emotion'

export const ChatWrapper = styled('div')`
    display: flex;
    flex-direction: column;
    height: 100%;

    form {
        background: grey;
        padding: 10px;
        display: flex;
        flex: 0 1 auto;
        bottom: 0;
        width: 100%;
    }

    form input {
        border: 0;
        padding: 10px;
        display: flex;
        flex: 1 0 auto;
    }

    form button {
        display: flex:
        flex: 0 1 auto;
        background: rgb(130, 224, 255);
        border: none;
        padding: 10px;
    }

    #messages {
        flex: 1 1 80%;
        list-style-type: none;
        margin: 0;
        padding: 0;
        overflow-y: auto;
    }

    #messages li {
        padding: 5px 10px;
    }

    #messages li[data-meta] {
        font-style: italic;
    }
`

export const ChatRoster = styled('div')`
    padding: 0.5rem 0.5rem 0 0.5rem;

    h3 {
        padding-bottom: 0.5rem;
    }
    
    .username:not(:last-of-type):after {
        content: ', ';
    }

    hr {
        margin-top: 0.25rem;
    }
`