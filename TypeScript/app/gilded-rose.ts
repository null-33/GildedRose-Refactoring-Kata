import {
  hasToBeSold,
  isBackstagePass,
  isConjuredItem,
  isDecayableItem,
  isRegularItem,
  isSpecialItem,
  sellInBetween,
} from './filters';
import {
  createCopy,
  decreaseQuality,
  decreaseSellIn,
  increaseQuality,
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

export class GildedRose {
  constructor(public readonly items: Item[] = []) {}

  updateQuality(): GildedRose {
    const items = this.items.map(createCopy);

    const itemsToBeSold = items.filter(hasToBeSold);
    const decayableItems = items.filter(isDecayableItem);
    const regularItems = decayableItems.filter(isRegularItem);
    const conjuredItems = decayableItems.filter(isConjuredItem);
    const backstagePasses = itemsToBeSold.filter(isBackstagePass);
    const specialItems = itemsToBeSold.filter(isSpecialItem);

    itemsToBeSold.forEach(decreaseSellIn);

    regularItems.filter(sellInBetween(0)).forEach(decreaseQuality());
    regularItems
      .filter(sellInBetween(undefined, 0))
      .forEach(decreaseQuality(2));

    conjuredItems.filter(sellInBetween(0)).forEach(decreaseQuality(2));
    conjuredItems
      .filter(sellInBetween(undefined, 0))
      .forEach(decreaseQuality(4));

    specialItems.filter(sellInBetween(0)).forEach(increaseQuality());
    specialItems
      .filter(sellInBetween(undefined, 0))
      .forEach(increaseQuality(2));

    backstagePasses.filter(sellInBetween(undefined, 0)).forEach(setQuality(0));
    backstagePasses.filter(sellInBetween(10)).forEach(increaseQuality());
    backstagePasses.filter(sellInBetween(5, 10)).forEach(increaseQuality(2));
    backstagePasses.filter(sellInBetween(0, 5)).forEach(increaseQuality(3));

    return new GildedRose(items);
  }
}
