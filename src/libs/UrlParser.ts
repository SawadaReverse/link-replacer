import { Logger } from './Logger';

type TARGETS = 'TWITTER' | 'X' | 'INSTAGRAM' | 'TIKTOK';

const TAEGET_PATTERNS: Record<TARGETS, RegExp> = {
  TWITTER: /https:\/\/twitter.com\/.+\/status\/[0-9]+/,
  X: /https:\/\/x.com\/.+\/status\/[0-9]+/,
  INSTAGRAM: /https:\/\/(www\.)?instagram.com\/.+/,
  TIKTOK: /https:\/\/(www\.)?tiktok.com\/.+/,
};

const TAEGET_DOMAINS: Record<TARGETS, RegExp> = {
  TWITTER: /twitter.com/,
  X: /x.com/,
  INSTAGRAM: /(www\.)?instagram.com/,
  TIKTOK: /(www\.)?tiktok.com/,
};

const REPLACE_DOMAINS: Record<TARGETS, string> = {
  TWITTER: 'fxtwitter.com',
  X: 'fixupx.com',
  INSTAGRAM: 'ddinstagram.com',
  TIKTOK: 'vxtiktok.com',
};

const findTarget = (message: string): { type: string; matched: string }[] => {
  const results: { type: string; matched: string }[] = [];
  const urls = message.match(
    /https:\/\/[-_.!~*'()a-zA-Z0-9;/?:@&=+$,%#\u3001-\u30FE\u4E00-\u9FA0\uFF01-\uFFE3]+/g,
  );
  if (urls) {
    urls.forEach((url) => {
      Object.entries(TAEGET_PATTERNS).forEach(([key, value]) => {
        const parseResults = url.match(value);
        if (parseResults) {
          Logger.debug(`url matched: ${JSON.stringify(parseResults)}`);
          parseResults.forEach((v) => {
            // if `url` doesn't matched /(www\.)?/ then parseResults contains null
            // if `url` matched /(www\.)?/ then parseResults contains 'www.'
            if (v && v.startsWith('https://'))
              results.push({ type: key, matched: v });
          });
        }
      });
    });
  }

  Logger.info(`found urls: ${JSON.stringify(results)}`);
  return results;
};

export const replaceUrl = (message: string): string[] => {
  const urls = findTarget(message);
  const replaced: string[] = [];
  urls.forEach((url) => {
    switch (url.type) {
      case 'TWITTER':
        replaced.push(
          url.matched.replace(TAEGET_DOMAINS.TWITTER, REPLACE_DOMAINS.TWITTER),
        );
        break;
      case 'X':
        replaced.push(url.matched.replace(TAEGET_DOMAINS.X, REPLACE_DOMAINS.X));
        break;
      case 'INSTAGRAM':
        replaced.push(
          url.matched.replace(
            TAEGET_DOMAINS.INSTAGRAM,
            REPLACE_DOMAINS.INSTAGRAM,
          ),
        );
        break;
      case 'TIKTOK':
        replaced.push(
          url.matched.replace(TAEGET_DOMAINS.TIKTOK, REPLACE_DOMAINS.TIKTOK),
        );
        break;
      default:
        Logger.debug(`unknown url: ${JSON.stringify(url)}`);
    }
  });

  return replaced;
};
