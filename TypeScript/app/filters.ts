import { type Item } from './gilded-rose';
import {
  BACKSTAGE_PASS,
  CONJURED,
  LEGENDARY,
  SPECIAL,
} from './item_categories';

export const isItemOfCategory =
  (categories: string[]) =>
  (item: Item): boolean =>
    categories.includes(item.name);

export const isSpecialItem = isItemOfCategory(SPECIAL);
export const isConjuredItem = isItemOfCategory(CONJURED);
export const isBackstagePass = isItemOfCategory(BACKSTAGE_PASS);
export const isLegendary = isItemOfCategory(LEGENDARY);

export const isRegularItem = (item: Item): boolean =>
  !(
    isSpecialItem(item) ||
    isConjuredItem(item) ||
    isBackstagePass(item) ||
    isLegendary(item)
  );

export const hasToBeSold = (item: Item): boolean => !isLegendary(item);

export const sellInBetween =
  (from?: number, to?: number) =>
  (item: Item): boolean =>
    (from === undefined || item.sellIn >= from) &&
    (to === undefined || item.sellIn < to);
