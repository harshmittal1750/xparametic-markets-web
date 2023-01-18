import environment from './environment';
import features from './features';

const ui = {
  hero: {
    image: environment.UI_HERO_IMAGE,
    header: environment.UI_HERO_HEADER,
    title: environment.UI_HERO_TITLE,
    action: {
      title: environment.UI_HERO_ACTION_TITLE,
      url: environment.UI_HERO_ACTION_URL
    }
  },
  reportForm: {
    enabled: features.regular.enabled || features.fantasy.reportForm.enabled
  }
} as const;

export default ui;
