import Autocomplete from './Autocomplete';

export default {
  title: 'Autocomplete',
  component: Autocomplete,
  // args: {
  //   children: <StoryArea height="300px">Story</StoryArea>,
  // },
};

const options = [
  {
    value: 'ciao'
  },
  {
    value: 'ci'
  },
  {
    value: 'cia'
  },
  {
    value: 'i'
  },
  {
    value: 'a'
  },
];

const Template = () => <Autocomplete options={options} />;

export const Default = Template.bind({});
Default.storyName = 'Autocomplete';
