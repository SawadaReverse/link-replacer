type TARGETS = 'TWITTER' | 'X' | 'INSTAGRAM' | 'TIKTOK';

export const TAEGET_PATTERNS: Record<TARGETS, RegExp> = {
  TWITTER: /https:\/\/twitter.com\/.+\/status\/[0-9]+/,
  X: /https:\/\/x.com\/.+\/status\/[0-9]+/,
  INSTAGRAM: /https:\/\/(www\.)?instagram.com\/.+/,
  TIKTOK: /https:\/\/(www\.)?tiktok.com\/.+\/[0-9]+/,
};

export const TAEGET_DOMAINS: Record<TARGETS, RegExp> = {
  TWITTER: /twitter.com/,
  X: /x.com/,
  INSTAGRAM: /(www\.)?instagram.com/,
  TIKTOK: /(www\.)?tiktok.com/,
};

export const REPLACE_DOMAINS: Record<TARGETS, string> = {
  TWITTER: 'fxtwitter.com',
  X: 'fixupx.com',
  INSTAGRAM: 'ddinstagram.com',
  TIKTOK: 'vxtiktok.com',
};
