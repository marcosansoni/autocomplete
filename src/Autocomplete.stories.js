import styled from 'styled-components';
import Autocomplete from './Autocomplete';
import Color from './constants/Color';

const LeftContent = styled.div`
  border-radius: 50%;
  background-color: ${Color.GRAY_DARK};
  width: 24px;
  height: 24px;
`;

const items = [
  'Açaí', 'Apple', 'Akee', 'Apricot', 'Avocado', 'Banana', 'Bilberry', 'Blackberry',
  'Blackcurrant', 'Black sapote', 'Blueberry', 'Boysenberry', "Buddha's hand", 'Crab',
  'apples', 'Currant', 'Cherry', 'Cherimoya', 'Chico fruit', 'Cloudberry', 'Coconut',
  'Cranberry', 'Cucumber', 'Damson', 'Date', 'Dragonfruit', 'Pitaya', 'Durian',
  'Elderberry', 'Feijoa', 'Fig', 'Goji berry', 'Gooseberry', 'Grape', 'Raisin', 'Grapefruit',
  'Guava', 'Honeyberry', 'Huckleberry', 'Jabuticaba', 'Jackfruit', 'Jambul',
  'Japanese plum', 'Jostaberry', 'Jujube', 'Juniper berry', 'Kiwano', 'Kiwifruit',
  'Kumquat', 'Lemon', 'Lime', 'Loquat', 'Longan', 'Lychee', 'Mango', 'Mangosteen',
  'Marionberry', 'Melon', 'Cantaloupe', 'Honeydew', 'Watermelon', 'Miracle fruit',
  'Mulberry', 'Nectarine', 'Nance', 'Olive', 'Orange', 'Blood orange', 'Clementine',
  'Mandarine', 'Tangerine', 'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon',
  'Plantain', 'Plum', 'Prune', 'Pineapple', 'Pineberry', 'Plumcot', 'Pomegranate',
  'Pomelo', 'Purple mangosteen', 'Quince', 'Raspberry', 'Salmonberry', 'Rambutan',
  'Redcurrant', 'Salal', 'Salak', 'Satsuma', 'Soursop', 'Star apple', 'Star fruit',
  'Strawberry', 'Surinam cherry', 'Tamarillo', 'Tamarind', 'Ugli fruit', 'White currant',
  'White sapote', 'Yuzu', 'Avocado', 'Bell pepper', 'Chili pepper', 'Corn kernel',
  'Cucumber', 'Eggplant', 'Olive', 'Pea', 'Pumpkin', 'Squash', 'Tomato', 'Zucchini'
];

export default {
  title: 'Autocomplete',
  component: Autocomplete,
};

const Template = (args) => <Autocomplete {...args} />;

export const Default = Template.bind({});
Default.storyName = 'Basic';
Default.args = { options: items.map(item => ({ value: item })) };

export const Left = Template.bind({});
Left.storyName = 'LeftContent';
Left.args = { options: items.map(item => ({ value: item, leftContent: <LeftContent /> })) };
