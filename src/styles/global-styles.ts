import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

export const GlobalStyle = createGlobalStyle`
    ${normalize}
    html,
    body {
        /* Position */
        margin: 0;
        padding: 0;

        /* Text */
        font-family: NanumGothic;
    }
    ::-webkit-scrollbar {
        /* Display */
        width: 6px;
    }
    ::-webkit-scrollbar-thumb:vertical {
        /* Display */
        border-radius: 6px;
        -webkit-border-radius: 6px;

        /* Color */
        background-color: rgba(0, 0, 0, 0.2);
    }
    ::-webkit-scrollbar-thumb:vertical:hover {
        /* Color */
        background-color: rgba(0, 0, 0, 0.3);
    }
    ::-webkit-scrollbar-thumb:vertical:active {
        /* Color */
        background-color: rgba(0, 0, 0, 0.4);
    }
`;
