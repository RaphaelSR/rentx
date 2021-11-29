import 'styled-components';
import theme from './theme';

declare module 'styled-components' {
    type theme = typeof theme;
    export interface DefaultTheme extends theme {}
}