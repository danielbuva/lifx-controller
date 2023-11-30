export function onSliderSelect(
  e: MouseEvent,
  container: HTMLDivElement,
  normalizeTo: number = 100
) {
  const left =
    e.pageX - (container.getBoundingClientRect().left + window.scrollX);

  if (left < 0) {
    return 0;
  } else if (left > container.clientWidth) {
    return normalizeTo;
  }
  return (normalizeTo * left) / container.clientWidth;
}

function f(hue: number, saturation: number = 100) {
  const k = hue % 12;
  const color =
    0.5 - saturation * 0.005 * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  return Math.round(255 * color)
    .toString(16)
    .padStart(2, "0"); // convert to Hex and prefix "0" if needed
}

export function hueToHex(hue: number) {
  hue /= 30;
  return `#${f(hue)}${f(8 + hue)}${f(4 + hue)}`;
}

export function clamp(number: number) {
  return Math.max(0, Math.min(number, 1));
}

export function hueSaturationToHex(hue: number, saturation: number) {
  hue /= 30;
  return `#${f(hue, saturation)}${f(8 + hue, saturation)}${f(
    4 + hue,
    saturation
  )}`;
}
