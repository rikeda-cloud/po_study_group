import { RawResponseData, ResponseData } from './define';

export const mockData: {
  description: string;
  rawData: RawResponseData;
  expectData: ResponseData;
}[] = [
  {
    description: '400応答',
    rawData: {
      status_code: 400,
      data: 'Bad Query String.',
    },
    expectData: {
      status: 'error',
      data: 'Bad Query String.',
    },
  },
  {
    description: '404応答',
    rawData: {
      status_code: 404,
      data: 'User Not Found.',
    },
    expectData: {
      status: 'error',
      data: 'User Not Found.',
    },
  },
  {
    description: '検索結果が1人のケース',
    rawData: {
      status_code: 200,
      data: [
        {
          user_id: 1,
          friend_ids: [2, 3],
          birthday: '1998-07-15',
          is_active: true,
        },
      ],
    },
    expectData: {
      status: 'success',
      data: [
        {
          user_id: 1,
          friend_ids: [2, 3],
          birthday: new Date('1998-07-15'),
        },
      ],
    },
  },
];
