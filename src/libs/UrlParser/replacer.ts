import { REPLACE_DOMAINS, TAEGET_DOMAINS } from './constants';

export class UrlReplacer {
  static replaceTwitterUrl(url: string): string {
    return url.replace(TAEGET_DOMAINS.TWITTER, REPLACE_DOMAINS.TWITTER);
  }

  static replaceXUrl(url: string): string {
    return url.replace(TAEGET_DOMAINS.X, REPLACE_DOMAINS.X);
  }

  static replaceInstagramUrl(url: string): string {
    const parsed = new URL(
      url.replace(TAEGET_DOMAINS.INSTAGRAM, REPLACE_DOMAINS.INSTAGRAM),
    );

    // delete tracking params
    if (parsed.searchParams.has('igshid')) parsed.searchParams.delete('igshid');

    return parsed.toString();
  }

  static replaceTiktokUrl(url: string): string {
    return (
      url
        .replace(TAEGET_DOMAINS.TIKTOK, REPLACE_DOMAINS.TIKTOK)
        // delete all query parameters
        .split('?')[0]
    );
  }
}
