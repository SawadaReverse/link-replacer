import { replaceUrl } from '../../libs/UrlParser';

type TestPatterns = {
  title: string;
  message: string;
  result: string[];
};

const twitterTestCases: TestPatterns[] = [
  {
    title: 'simple twitter url',
    message: 'https://twitter.com/X/status/1725665176962080802',
    result: ['https://fxtwitter.com/X/status/1725665176962080802'],
  },
  {
    title: 'query params will delete',
    message:
      'https://twitter.com/X/status/1725665176962080802?t=UFeUD-hy6gB-J2kY0hmaDA&s=19',
    result: ['https://fxtwitter.com/X/status/1725665176962080802'],
  },
  {
    title: 'extract url from message sentences',
    message:
      'This is so funny tweet! XD https://twitter.com/X/status/1725665176962080802?t=UFeUD-hy6gB-J2kY0hmaDA&s=19 This is so funny tweet! XD',
    result: ['https://fxtwitter.com/X/status/1725665176962080802'],
  },
  {
    title: 'extract several urls from message sentences',
    message: `This is so funny tweet! XD
    https://twitter.com/X/status/1725665176962080802?t=UFeUD-hy6gB-J2kY0hmaDA&s=19
    https://twitter.com/X/status/1723161754723647526?t=LDwhYbZqCBrUsVX7eB1ZzA&s=19
    This is so funny tweet! XD`,
    result: [
      'https://fxtwitter.com/X/status/1725665176962080802',
      'https://fxtwitter.com/X/status/1723161754723647526',
    ],
  },
];

twitterTestCases.forEach((testCase) => {
  test(testCase.title, () =>
    expect(replaceUrl(testCase.message)).toStrictEqual(testCase.result),
  );
});

const xTestCases: TestPatterns[] = [
  {
    title: 'simple x url',
    message: 'https://x.com/X/status/1725665176962080802',
    result: ['https://fixupx.com/X/status/1725665176962080802'],
  },
  {
    title: 'query params will delete',
    message:
      'https://x.com/X/status/1725665176962080802?t=UFeUD-hy6gB-J2kY0hmaDA&s=19',
    result: ['https://fixupx.com/X/status/1725665176962080802'],
  },
  {
    title: 'extract url from message sentences',
    message:
      'This is so funny post! XD https://x.com/X/status/1725665176962080802?t=UFeUD-hy6gB-J2kY0hmaDA&s=19 This is so funny post! XD',
    result: ['https://fixupx.com/X/status/1725665176962080802'],
  },
  {
    title: 'extract several urls from message sentences',
    message: `This is so funny post! XD
    https://x.com/X/status/1725665176962080802?t=UFeUD-hy6gB-J2kY0hmaDA&s=19
    https://x.com/X/status/1723161754723647526?t=LDwhYbZqCBrUsVX7eB1ZzA&s=19
    This is so funny post! XD`,
    result: [
      'https://fixupx.com/X/status/1725665176962080802',
      'https://fixupx.com/X/status/1723161754723647526',
    ],
  },
];

xTestCases.forEach((testCase) => {
  test(testCase.title, () =>
    expect(replaceUrl(testCase.message)).toStrictEqual(testCase.result),
  );
});

const instagramTestCases: TestPatterns[] = [
  {
    title: 'instagram single url',
    message: 'https://instagram.com/p/CzEpxirv5Vi/',
    result: ['https://ddinstagram.com/p/CzEpxirv5Vi/'],
  },
  {
    title: 'instagram single url with "www."',
    message: 'https://www.instagram.com/p/CzEpxirv5Vi/',
    result: ['https://ddinstagram.com/p/CzEpxirv5Vi/'],
  },
  {
    title: 'query params will NOT delete exclude "igshid"',
    message:
      'https://www.instagram.com/p/CyWn_tQyKAH/?img_index=1&igshid=NmJiYWZiY2E0Mg==',
    result: ['https://ddinstagram.com/p/CyWn_tQyKAH/?img_index=1'],
  },
  {
    title: 'extract url from message sentences',
    message:
      'This is so cute post! XD https://www.instagram.com/p/CzEpxirv5Vi/ This is so cute post! XD',
    result: ['https://ddinstagram.com/p/CzEpxirv5Vi/'],
  },
  {
    title: 'extract several url from message sentences',
    message: `This is so cute post! XD
      https://www.instagram.com/p/CzEpxirv5Vi/
      https://www.instagram.com/p/CyWn_tQyKAH/?img_index=1
      This is so cute post! XD`,
    result: [
      'https://ddinstagram.com/p/CzEpxirv5Vi/',
      'https://ddinstagram.com/p/CyWn_tQyKAH/?img_index=1',
    ],
  },
];

instagramTestCases.forEach((testCase) => {
  test(testCase.title, () =>
    expect(replaceUrl(testCase.message)).toStrictEqual(testCase.result),
  );
});

const tiktokTestCases: TestPatterns[] = [
  {
    title: 'tiktok single url',
    message: 'https://tiktok.com/@tiktok/video/7296959659003497771',
    result: ['https://vxtiktok.com/@tiktok/video/7296959659003497771'],
  },
  {
    title: 'tiktok single url with "www."',
    message: 'https://www.tiktok.com/@tiktok/video/7296959659003497771',
    result: ['https://vxtiktok.com/@tiktok/video/7296959659003497771'],
  },
  {
    title: 'query params will delete',
    message:
      'https://www.tiktok.com/@waroosh0/video/7298952434242555137?is_from_webapp=1&sender_device=mobile&sender_web_id=7309318916606002689',
    result: ['https://vxtiktok.com/@waroosh0/video/7298952434242555137'],
  },
  {
    title: 'extract url from message sentences',
    message:
      'This is so groovy! XD https://www.tiktok.com/@tiktok/video/7296959659003497771 This is so groovy post! XD',
    result: ['https://vxtiktok.com/@tiktok/video/7296959659003497771'],
  },
  {
    title: 'extract several url from message sentences',
    message: `This is so groovy! XD
  https://www.tiktok.com/@tiktok/video/7296959659003497771
  https://www.tiktok.com/@tiktok/video/7257232468800064811
  This is so groovy post! XD`,
    result: [
      'https://vxtiktok.com/@tiktok/video/7296959659003497771',
      'https://vxtiktok.com/@tiktok/video/7257232468800064811',
    ],
  },
];

tiktokTestCases.forEach((testCase) => {
  test(testCase.title, () =>
    expect(replaceUrl(testCase.message)).toStrictEqual(testCase.result),
  );
});
