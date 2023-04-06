function createSvg(pathD) {
  const xmlns = 'http://www.w3.org/2000/svg';

  const svgAttr = {
    xmlns,
    'xmlns:xlink': 'http://www.w3.org/1999/xlink',
    'aria-hidden': 'true',
    focusable: 'false',
    width: '1em',
    height: '1em',
    preserveAspectRatio: 'xMidYMid meet',
    viewBox: '0 0 24 24',
    style: 'vertical-align: -0.125em; transform: rotate(360deg);',
  };

  const svg = document.createElementNS(xmlns, 'svg');
  const path = document.createElementNS(xmlns, 'path');

  const keys = Object.keys(svgAttr);

  keys.forEach((key) => {
    svg.setAttribute(key, svgAttr[key]);
  });

  path.setAttribute('d', pathD);
  svg.appendChild(path);

  return svg;
}

export { createSvg };
