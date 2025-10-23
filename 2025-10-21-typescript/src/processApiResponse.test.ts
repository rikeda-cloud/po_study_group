import processApiResponse from './processApiResponse';
import { mockData } from './data';

describe('processApiResponse', () => {
  for (let i = 0; i < mockData.length; i++) {
    const { description, expectData } = mockData[i];
    test(description, async () => {
      const result = await processApiResponse(i);
      expect(result).toEqual(expectData);
    });
  }
});
