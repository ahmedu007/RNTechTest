import './__mocks__/libs';
import './__mocks__/getAssetsContext';

jest.unstable_mockModule('react-redux', () => {
  return {
    ...jest.requireActual('react-redux'),
    useSelector: jest.fn().mockImplementation(() => ({})),
    useDispatch: () => jest.fn(),
  };
});
