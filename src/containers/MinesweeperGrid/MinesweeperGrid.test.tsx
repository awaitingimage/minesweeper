import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import MinesweeperGrid from './MinesweeperGrid';

let wrapper: ShallowWrapper<{}, {}, MinesweeperGrid>;
let mineCoordinates = [
  [0, 1],
  [1, 0],
  [1, 1],
  [2, 2],
];
let mineNumber = 0;

const generateRandomCoordinateMock = (colMax: number, rowMax: number): number[] => {
  return mineCoordinates[mineNumber++];
};

let mockFn = jest.fn(generateRandomCoordinateMock);

beforeAll(() => {
  wrapper = shallow(<MinesweeperGrid numOfRows={4} numOfColumns={4} numOfMines={4} />, {
    disableLifecycleMethods: true,
  });
});

it('randomCoordinate returns an array', () => {
  const coordinate = wrapper.instance().generateRandomCoordinate(0, 0);
  expect(Array.isArray(coordinate)).toBe(true);
  expect(coordinate).toStrictEqual([0, 0]);
});

it('called generateCoordinate once', () => {
  wrapper.instance().generateRandomCoordinate = mockFn;
  wrapper.instance().generateGrid();
  expect(mockFn).toHaveBeenCalledTimes(4);
});

it('to match snapshot', () => {
  //const wrapper = shallow(<MinesweeperGrid numOfRows={4} numOfColumns={4} numOfMines={4} />);
  expect(wrapper).toMatchSnapshot();
});
