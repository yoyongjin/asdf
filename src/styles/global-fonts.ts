import { createGlobalStyle } from 'styled-components';

import FranklinGothicCondensed from 'fonts/Franklin Gothic Condensed.otf';
import NanumBarunGothic from 'fonts/NanumBarunGothic.ttf';
import NanumGothic from 'fonts/NanumGothic.ttf';

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
    @font-face {
        font-family: 'NanumGothic';
        src: url(${NanumGothic})
    }
`;
