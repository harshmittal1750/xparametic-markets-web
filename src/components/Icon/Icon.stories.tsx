import type { ComponentMeta, ComponentStory } from '@storybook/react';

import Icon from './Icon';

const Template: ComponentStory<typeof Icon> = props => <Icon.Menu {...props} />;

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

export default {
  component: Icon
} as ComponentMeta<typeof Icon>;
