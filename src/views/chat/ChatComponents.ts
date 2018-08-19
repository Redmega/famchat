import styled from 'react-emotion'

export const ChatWrapper = styled('div')`
    form {
        background: grey;
        padding: 10px;
        position: fixed;
        bottom: 0;
        width: 100%;
    }

    form input {
        border: 0;
        padding: 10px;
        width: 90%;
        margin-right: .5%;
    }

    form button {
        width: 9%;
        background: rgb(130, 224, 255);
        border: none;
        padding: 10px;
    }

    #messages {
        list-style-type: none;
        margin: 0;
        padding: 0;
    }

    #messages li {
        padding: 5px 10px;
    }

    #messages li[data-meta] {
        font-style: italic;
    }

    #messages li:nth-child(odd) {
        background: #eee;
    }
`

export const ChatRoster = styled('div')`
    padding: 0.5rem;

    h3 {
        padding-bottom: 0.5rem;
    }
    
    .username:not(:last-child):after {
        content: ', ';
    }
`