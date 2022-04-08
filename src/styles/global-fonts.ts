import { createGlobalStyle } from 'styled-components';

import FranklinGothicCondensed from 'fonts/Franklin Gothic Condensed.otf';
import NanumBarunGothicTTF from 'fonts/NanumBarunGothic.ttf';
import NanumBarunGothicEOT from 'fonts/NanumBarunGothic.eot';
import NanumGothicTTF from 'fonts/NanumGothic.ttf';
import NanumGothicEOT from 'fonts/NanumGothic.eot';

export const GlobalFonts = createGlobalStyle`
    @font-face {
        font-family: 'NanumBarunGothic';
        font-display: fallback;
        src: url(${NanumBarunGothicEOT}),url(${NanumBarunGothicTTF})
    }
    @font-face {
        font-family: 'FranklinGothicCondensed';
        src: url(${FranklinGothicCondensed})
    }
    @font-face {
        font-family: 'NanumGothic';
        src: url(${NanumGothicEOT}),url(${NanumGothicTTF})
    }
`;
