import type { ComponentMeta, ComponentStory } from '@storybook/react';

import MedalIcon from './MedalIcon';

const Template: ComponentStory<typeof MedalIcon> = props => (
  <MedalIcon {...props} />
);

export default {
  component: MedalIcon
} as ComponentMeta<typeof MedalIcon>;
export const Accessible = Template.bind({});
export const Sm = Template.bind({});
export const Md = Template.bind({});
export const Lg = Template.bind({});

Accessible.args = {
  accessible: true
};
Sm.args = {
  size: 'sm'
};
Md.args = {
  size: 'md'
};
Lg.args = {
  size: 'lg'
};
