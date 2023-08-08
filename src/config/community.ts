import { ui } from 'config';
import isUndefined from 'lodash/isUndefined';

const { communityUrls } = ui.layout.header;

const community = [
  {
    name: 'Twitter',
    href: communityUrls.twitter
  },
  {
    name: 'Medium',
    href: communityUrls.medium
  },
  {
    name: 'Telegram',
    href: communityUrls.telegram
  },
  {
    name: 'Youtube',
    href: communityUrls.youtube
  },
  {
    name: 'LinkedIn',
    href: communityUrls.linkedin
  },
  {
    name: 'GitHub',
    href: communityUrls.github
  }
].filter(({ href }) => !isUndefined(href));

export default community;
