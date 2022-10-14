import type { ComponentMeta, ComponentStory } from '@storybook/react';

import Icon from './Icon';

const Meta: ComponentMeta<typeof Icon> = {
  component: Icon
};
const Story: ComponentStory<typeof Icon> = props => <Icon {...props} />;

const Example = Story.bind({});
Example.args = {
  name: 'Arrow',
  title: 'Arrow',
  size: 'lg'
};

export default Meta;
export { Example };
