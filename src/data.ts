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
  {
    description: '検索結果が2人のケース',
    rawData: {
      status_code: 200,
      data: [
        {
          user_id: 1,
          friend_ids: [2, 3],
          birthday: '1998-07-15',
          is_active: true,
        },
        {
          user_id: 2,
          friend_ids: [1],
          birthday: '2000-01-01',
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
        {
          user_id: 2,
          friend_ids: [1],
          birthday: new Date('2000-01-01'),
        },
      ],
    },
  },
  {
    description: '検索結果が１人で、user_idが文字列のケース',
    rawData: {
      status_code: 200,
      data: [
        {
          user_id: '123',
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
          user_id: 123,
          friend_ids: [2, 3],
          birthday: new Date('1998-07-15'),
        },
      ],
    },
  },
  {
    description:
      '検索結果が1人で、friend_idsに文字列と数値が混在する配列のケース',
    rawData: {
      status_code: 200,
      data: [
        {
          user_id: 1,
          friend_ids: [2, '3', 4, '5'],
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
          friend_ids: [2, 3, 4, 5],
          birthday: new Date('1998-07-15'),
        },
      ],
    },
  },
  {
    description: '検索結果が１人で、friend_idsがnullのケース',
    rawData: {
      status_code: 200,
      data: [
        {
          user_id: 1,
          friend_ids: null,
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
          friend_ids: [],
          birthday: new Date('1998-07-15'),
        },
      ],
    },
  },
  {
    description:
      '検索結果が3人で、birthdayがYYYY-MM-DD形式とYYY/MM/DD形式とUnixTimestanpのケース',
    rawData: {
      status_code: 200,
      data: [
        {
          user_id: 1,
          friend_ids: null,
          birthday: '1998-07-15',
          is_active: true,
        },
        {
          user_id: 2,
          friend_ids: null,
          birthday: '2002/03/10',
          is_active: true,
        },
        {
          user_id: 3,
          friend_ids: null,
          birthday: 1698285600,
          is_active: true,
        },
      ],
    },
    expectData: {
      status: 'success',
      data: [
        {
          user_id: 1,
          friend_ids: [],
          birthday: new Date('1998-07-15'),
        },
        {
          user_id: 2,
          friend_ids: [],
          birthday: new Date('2002-03-10'),
        },
        {
          user_id: 3,
          friend_ids: [],
          birthday: new Date(1698285600 * 1000),
        },
      ],
    },
  },
  {
    description:
      '検索結果が2人で、birthdayがUnixTimestanpの人と、nullの人のケース',
    rawData: {
      status_code: 200,
      data: [
        {
          user_id: 1,
          friend_ids: null,
          birthday: 1698285600,
          is_active: true,
        },
        {
          user_id: 2,
          friend_ids: null,
          birthday: null,
          is_active: true,
        },
      ],
    },
    expectData: {
      status: 'success',
      data: [
        {
          user_id: 1,
          friend_ids: [],
          birthday: new Date(1698285600 * 1000),
        },
      ],
    },
  },
  {
    description: '検索結果が5人で、is_activeがTrue, False, 1, 0, nullのケース',
    rawData: {
      status_code: 200,
      data: [
        {
          user_id: 1,
          friend_ids: null,
          birthday: '1998-07-15',
          is_active: true,
        },
        {
          user_id: 2,
          friend_ids: null,
          birthday: '1998-07-15',
          is_active: false,
        },
        {
          user_id: 3,
          friend_ids: null,
          birthday: '1998-07-15',
          is_active: 1,
        },
        {
          user_id: 4,
          friend_ids: null,
          birthday: '1998-07-15',
          is_active: 0,
        },
        {
          user_id: 5,
          friend_ids: null,
          birthday: '1998-07-15',
          is_active: null,
        },
      ],
    },
    expectData: {
      status: 'success',
      data: [
        {
          user_id: 1,
          friend_ids: [],
          birthday: new Date('1998-07-15'),
        },
        {
          user_id: 3,
          friend_ids: [],
          birthday: new Date('1998-07-15'),
        },
      ],
    },
  },
];
