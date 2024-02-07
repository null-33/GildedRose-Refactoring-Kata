import {
  hasToBeSold,
  isBackstagePass,
  isConjuredItem,
  isRegularItem,
  isSpecialItem,
  sellInBetween,
} from './filters';
import {
  createCopy,
  decreaseQualityBy,
  decreaseSellIn,
  increaseQualityBy,
  setQuality,
} from './modifiers';

export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const DECAY_RATE = 1;
const IMPROVE_RATE = 1;

export class GildedRose {
  constructor(public readonly items: Item[] = []) {}

  updateQuality(): GildedRose {
    const items = this.items.map(createCopy);

    const itemsToBeSold = items.filter(hasToBeSold);
    const regularItems = itemsToBeSold.filter(isRegularItem);
    const conjuredItems = itemsToBeSold.filter(isConjuredItem);
    const backstagePasses = itemsToBeSold.filter(isBackstagePass);
    const specialItems = itemsToBeSold.filter(isSpecialItem);

    itemsToBeSold.forEach(decreaseSellIn);

    regularItems
      .filter(sellInBetween(0))
      .forEach(decreaseQualityBy(DECAY_RATE));
    regularItems
      .filter(sellInBetween(undefined, 0))
      .forEach(decreaseQualityBy(DECAY_RATE * 2));

    conjuredItems
      .filter(sellInBetween(0))
      .forEach(decreaseQualityBy(DECAY_RATE * 2));
    conjuredItems
      .filter(sellInBetween(undefined, 0))
      .forEach(decreaseQualityBy(DECAY_RATE * 4));

    specialItems
      .filter(sellInBetween(0))
      .forEach(increaseQualityBy(IMPROVE_RATE));
    specialItems
      .filter(sellInBetween(undefined, 0))
      .forEach(increaseQualityBy(IMPROVE_RATE * 2));

    backstagePasses.filter(sellInBetween(undefined, 0)).forEach(setQuality(0));
    backstagePasses
      .filter(sellInBetween(10))
      .forEach(increaseQualityBy(IMPROVE_RATE));
    backstagePasses
      .filter(sellInBetween(5, 10))
      .forEach(increaseQualityBy(IMPROVE_RATE * 2));
    backstagePasses
      .filter(sellInBetween(0, 5))
      .forEach(increaseQualityBy(IMPROVE_RATE * 3));

    return new GildedRose(items);
  }
}
