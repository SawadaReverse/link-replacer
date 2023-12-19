import { Logger } from '../Logger';
import { TAEGET_PATTERNS } from './constants';
import { UrlReplacer } from './replacer';

const findUrls = (message: string): { type: string; matched: string }[] => {
  const results: { type: string; matched: string }[] = [];
  const urls = message.match(
    /https:\/\/[-_.!~*'()a-zA-Z0-9;/?:@&=+$,%#\u3001-\u30FE\u4E00-\u9FA0\uFF01-\uFFE3]+/g,
  );
  if (urls) {
    urls.forEach((url) => {
      Object.entries(TAEGET_PATTERNS).forEach(([type, domain]) => {
        const parseResults = url.match(domain);
        if (parseResults) {
          Logger.debug(`url matched: ${JSON.stringify(parseResults)}`);
          parseResults.forEach((result) => {
            // if `url` doesn't matched /(www\.)?/ then parseResults contains null
            // if `url` matched /(www\.)?/ then parseResults contains 'www.'
            if (result && result.startsWith('https://'))
              results.push({ type, matched: result });
          });
        }
      });
    });
  }

  results.length > 0 && Logger.info(`found urls: ${JSON.stringify(results)}`);
  return results;
};

export const replaceUrl = (message: string): string[] => {
  const urls = findUrls(message);
  const replaced: string[] = [];
  urls.forEach((url) => {
    switch (url.type) {
      case 'TWITTER':
        replaced.push(UrlReplacer.replaceTwitterUrl(url.matched));
        break;
      case 'X':
        replaced.push(UrlReplacer.replaceXUrl(url.matched));
        break;
      case 'INSTAGRAM':
        replaced.push(UrlReplacer.replaceInstagramUrl(url.matched));
        break;
      case 'TIKTOK':
        replaced.push(UrlReplacer.replaceTiktokUrl(url.matched));
        break;
      default:
        Logger.debug(`unknown url: ${JSON.stringify(url)}`);
    }
  });

  return replaced;
};
