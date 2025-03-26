import { colors, sizes } from 'styles/Variables';

export const textCentered = `
  text-align: center;
`;

export const fontTitle = `
  color: ${colors.primary};
  font: 35px sans-serif;
  font-weight: 800;
  `;
export const fontSubTitle = `
  font: 26px sans-serif black;
  font-weight: 700;
  `;
export const fontContent = `
  font-size: 20px;
  font-weight: 400;
  font-family: sans-serif;
  color: #333;
  `;

export const textOneLine = `
  line-break: strict;
  word-break: keep-all;
  white-space: nowrap;
  text-overflow: ellipsis;
  `;

export const PrimaryContainer = `
  background-color: ${colors.secondary};
  padding: ${sizes.padding.main}px;
  border-radius: ${sizes.radius.out};
`;
