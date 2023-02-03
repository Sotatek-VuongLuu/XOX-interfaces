const PANCAKE_EXTENDED = 'https://tokens.xoxnet.io/pancakeswap-extended.json'
const COINGECKO = 'https://tokens.xoxnet.io/coingecko.json'
const CMC = 'https://tokens.xoxnet.io/cmc.json'

// List of official tokens list
export const OFFICIAL_LISTS = [PANCAKE_EXTENDED]

export const UNSUPPORTED_LIST_URLS: string[] = []
export const WARNING_LIST_URLS: string[] = []

// lower index == higher priority for token import
export const DEFAULT_LIST_OF_LISTS: string[] = [CMC]

// default lists to be 'active' aka searched across
export const DEFAULT_ACTIVE_LIST_URLS: string[] = []
