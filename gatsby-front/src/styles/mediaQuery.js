// these breakpoints refer to gallery layout with maw-width 350px
const breakpoints = {
  xs: 360,
  sm: 500,
  md: 720,
  lg: 1040,
  xl: 1360,
  xxl: 1680,
};

export const mediaQuery = key => style =>
  `@media only screen and (min-width: ${breakpoints[key]}px) { ${style} }`;

export const mediaQueryMax = key => style =>
  `@media only screen and (max-width: ${breakpoints[key]}px) { ${style} }`;
