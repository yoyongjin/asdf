import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

export const GlobalStyle = createGlobalStyle`
    ${normalize}
    html,
    body {
        margin: 0;
        padding: 0;
        font-family: NanumGothic;
    }
    ::-webkit-scrollbar {
        width: 6px; /* 1px wider than Lion. */
        background-color: rgba(0, 0, 0, 0);
        -webkit-border-radius: 6.25rem;
    }
    ::-webkit-scrollbar:hover {
        background-color: rgba(0, 0, 0, 0);
    }
    ::-webkit-scrollbar-thumb:vertical {
        background: rgba(0, 0, 0, 0.2);
        -webkit-border-radius: 3px;
    }
    ::-webkit-scrollbar-thumb:vertical:active {
        background: rgba(0, 0, 0, 0.2);
        -webkit-border-radius: 3px;
    }
`;
