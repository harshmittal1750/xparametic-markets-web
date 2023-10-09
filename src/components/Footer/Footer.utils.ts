import type { FooterItem } from './Footer.type';

const defaultFooterText =
  'Parametric Services and POLK Token (POLK) [are not available in Excluded Jurisdictions.](https://www.polkamarkets.com/legal/terms-conditions){default} By accessing and using the interface you agree with our [Terms & Conditions](https://www.polkamarkets.com/legal/terms-conditions){primary underline}';

const regex: RegExp = /\[(.*?)\]\((.*?)\)\{(default|primary)(\s+underline)?\}/g;

function getFooterItems(string: string): FooterItem[] {
  const matchesArray: FooterItem[] = [];
  let match: RegExpExecArray | null;
  let index = 0;

  match = regex.exec(string);

  while (match !== null) {
    const nonMatch = string.slice(index, match.index);

    if (nonMatch !== '') {
      matchesArray.push({ text: nonMatch, isLink: false });
    }

    const text = match[1];
    const url = match[2];
    const color = match[3] as FooterItem['color'];
    const underline = !!match[4];

    matchesArray.push({ text, url, color, underline, isLink: true });
    index = regex.lastIndex;
    match = regex.exec(string);
  }

  const remainingText = string.slice(index);
  if (remainingText !== '') {
    matchesArray.push({ text: remainingText, isLink: false });
  }

  return matchesArray;
}

export { defaultFooterText, getFooterItems };
