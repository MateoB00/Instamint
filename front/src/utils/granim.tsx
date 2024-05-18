import Granim from 'granim';

export function initializeBackgroundProfile() {
  return new Granim({
    element: '#canvas-basic',
    name: 'granim',
    states: {
      'default-state': {
        gradients: [
          ['#16502d', '#4a504d'],
          ['#4a504d', '#b7c8ba'],
        ],
      },
    },
  });
}
