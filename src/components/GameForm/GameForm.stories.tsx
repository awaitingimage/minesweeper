import React from 'react';
import { action } from '@storybook/addon-actions';
import GameForm from './GameForm';

export default {
  title: 'Game Form',
  component: GameForm,
};

export const GameForm1 = () => (
  <GameForm
    numOfRows={4}
    numOfColumns={4}
    numOfMines={4}
    handleChange={action('clicked')}
    handleSubmit={e => {
      e.preventDefault();
      action('form submitted')(e);
    }}
  />
);

GameForm1.story = {
  name: 'Game Form',
};

// export const ToStorybook = () => <Welcome showApp={linkTo('Button')} />;

// ToStorybook.story = {
//   name: 'to Storybook',
// };

// export const Text = () => <Button onClick={action('clicked')}>Hello Button</Button>;

// export const Emoji = () => (
//   <Button onClick={action('clicked')}>
//     <span role="img" aria-label="so cool">
//       😀 😎 👍 💯
//     </span>
//   </Button>
// );
