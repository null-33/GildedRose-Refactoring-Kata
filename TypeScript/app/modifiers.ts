import { Item } from './gilded-rose';

const MAX_QUALITY = 50;
const MIN_QUALITY = 0;

export const decreaseSellIn = (item: Item): number => item.sellIn--;

export const createCopy = (item: Item): Item =>
  new Item(item.name, item.sellIn, item.quality);

export const increaseQualityBy = (value: number) => (item: Item) => {
  setQuality(item.quality + value)(item);
};

export const decreaseQualityBy = (value: number) => (item: Item) => {
  setQuality(item.quality - value)(item);
};

export const setQuality = (quality: number) => (item: Item) => {
  quality = Math.min(MAX_QUALITY, quality);
  quality = Math.max(MIN_QUALITY, quality);

  item.quality = quality;
};
