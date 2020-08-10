import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

export const GlobalStyle = createGlobalStyle`
    ${normalize}
    html,
    body {
        margin: 0;
        padding: 0;
        font-family: NanumBarunGothic;
        font-size: 16px;
    }
`;
