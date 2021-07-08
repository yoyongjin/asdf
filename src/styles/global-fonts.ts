import { createGlobalStyle } from 'styled-components';

import NanumBarunGothic from 'fonts/NanumBarunGothic.ttf';
import FranklinGothicCondensed from 'fonts/Franklin Gothic Condensed.otf';

export const GlobalFonts = createGlobalStyle`
    @font-face {
        font-family: 'NanumBarunGothic';
        font-display: fallback;
        src: url(${NanumBarunGothic})
    }
    @font-face {
        font-family: 'FranklinGothicCondensed';
        src: url(${FranklinGothicCondensed})
    }
`;
