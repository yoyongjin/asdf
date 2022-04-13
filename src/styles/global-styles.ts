import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

export const GlobalStyle = createGlobalStyle`
    ${normalize}
    html,
    body {
        /* Position */
        margin: 0;
        padding: 0;

        font-size: 10px;
        font-family: 'NanumGothic';

        input, button {
            border: none;
            outline: none;
        }
    }
    ::-webkit-scrollbar {
        /* Display */
        width: 6px;
        height: 6px;
    }
    ::-webkit-scrollbar-thumb {
        /* Display */
        border-radius: 6px;
        -webkit-border-radius: 6px;

        /* Color */
        background-color: rgba(0, 0, 0, 0.2);
    }
    ::-webkit-scrollbar-thumb:hover {
        /* Color */
        background-color: rgba(0, 0, 0, 0.3);
    }
    ::-webkit-scrollbar-thumb:active {
        /* Color */
        background-color: rgba(0, 0, 0, 0.4);
    }
`;
