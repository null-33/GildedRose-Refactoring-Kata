import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  let gildedRose: GildedRose;
  let updatedItems: Item[];

  function createStoreAndUpdateQuality(items: Item[]): void {
    gildedRose = new GildedRose(items);
    gildedRose = gildedRose.updateQuality();
    updatedItems = gildedRose.items;
  }

  const expectQuality = (quality: number): void => {
    expect(updatedItems[0].quality).toBe(quality);
  };

  const expectSellIn = (sellIn: number): void => {
    expect(updatedItems[0].sellIn).toBe(sellIn);
  };

  describe('Legendary items', () => {
    const quality = 50;
    const sellIn = 10;

    beforeEach(() => {
      createStoreAndUpdateQuality([
        new Item('Sulfuras, Hand of Ragnaros', sellIn, quality),
      ]);
    });

    describe('updating the quality', () => {
      it('does not change the quality', () => {
        expectQuality(quality);
      });

      it('does not change the sellIn', () => {
        expectSellIn(sellIn);
      });
    });
  });

  describe('Regular items', () => {
    const quality = 10;

    const createStoreWithRegularItem = (
      sellIn: number,
      itemQuality = quality,
    ): void => {
      createStoreAndUpdateQuality([
        new Item('Elixir of the Mongoose', sellIn, itemQuality),
      ]);
    };

    describe('updating the quality', () => {
      describe('with sellIn > 0 days', () => {
        it('decreases quality by 1', () => {
          createStoreWithRegularItem(5);
          expectQuality(quality - 1);
        });
      });

      describe('with sellIn <= 0 days', () => {
        it('decrease quality by 2', () => {
          createStoreWithRegularItem(0);
          expectQuality(quality - 2);
          createStoreWithRegularItem(-1);
          expectQuality(quality - 2);
        });
      });

      it('decreases the sellIn of the item by 1', () => {
        createStoreWithRegularItem(10);
        expectSellIn(9);
        createStoreWithRegularItem(0);
        expectSellIn(-1);
      });

      it('does not decrease quality below 0', () => {
        createStoreWithRegularItem(0, 1);
        expectQuality(0);
      });
    });
  });

  describe('Conjured items', () => {
    const quality = 10;

    const createStoreWithRegularItem = (
      sellIn: number,
      itemQuality = quality,
    ): void => {
      createStoreAndUpdateQuality([
        new Item('Conjured Mana Cake', sellIn, itemQuality),
      ]);
    };

    describe('updating the quality', () => {
      describe('with sellIn > 0 days', () => {
        it('decreases quality by 2', () => {
          createStoreWithRegularItem(5);
          expectQuality(quality - 2);
        });
      });

      describe('with sellIn <= 0 days', () => {
        it('decrease quality by 4', () => {
          createStoreWithRegularItem(0);
          expectQuality(quality - 4);
          createStoreWithRegularItem(-1);
          expectQuality(quality - 4);
        });
      });

      it('decreases the sellIn of the item by 1', () => {
        createStoreWithRegularItem(10);
        expectSellIn(9);
        createStoreWithRegularItem(0);
        expectSellIn(-1);
      });

      it('does not decrease quality below 0', () => {
        createStoreWithRegularItem(0, 1);
        expectQuality(0);
      });
    });
  });

  describe('Special items', () => {
    const quality = 10;

    const createStoreWithSpecialItem = (
      sellIn: number,
      itemQuality = quality,
    ): void => {
      createStoreAndUpdateQuality([new Item('Aged Brie', sellIn, itemQuality)]);
    };

    describe('updating the quality', () => {
      describe('with sellIn > 0 days', () => {
        it('increases quality by 1', () => {
          createStoreWithSpecialItem(1);
          expectQuality(quality + 1);
        });
      });

      describe('with sellIn <= 0 days', () => {
        it('increase quality by 2', () => {
          createStoreWithSpecialItem(0);
          expectQuality(quality + 2);
          createStoreWithSpecialItem(-1);
          expectQuality(quality + 2);
        });
      });

      it('decreases the sellIn of the item by 1', () => {
        createStoreWithSpecialItem(10);
        expectSellIn(9);
        createStoreWithSpecialItem(0);
        expectSellIn(-1);
      });

      it('does not increase quality beyond 50', () => {
        createStoreWithSpecialItem(0, 50);
        expectQuality(50);
      });
    });
  });

  describe('Backstage passes', () => {
    const quality = 10;

    const createStoreWithBackstagePass = (
      sellIn: number,
      itemQuality = quality,
    ): void => {
      createStoreAndUpdateQuality([
        new Item(
          'Backstage passes to a TAFKAL80ETC concert',
          sellIn,
          itemQuality,
        ),
      ]);
    };

    describe('updating the quality', () => {
      describe('with sellIn > 10 days', () => {
        it('increases quality by 1', () => {
          createStoreWithBackstagePass(11);
          expectQuality(quality + 1);
        });
      });

      describe('with sellIn between 6 and 10 days', () => {
        it('increases quality by 2', () => {
          createStoreWithBackstagePass(6);
          expectQuality(quality + 2);
          createStoreWithBackstagePass(10);
          expectQuality(quality + 2);
        });
      });

      describe('with sellIn between 1 and 5 days', () => {
        it('increases quality by 3', () => {
          createStoreWithBackstagePass(5);
          expectQuality(quality + 3);
          createStoreWithBackstagePass(1);
          expectQuality(quality + 3);
        });
      });

      describe('with sellIn <= 0 days', () => {
        it('sets the quality to 0', () => {
          createStoreWithBackstagePass(0);
          expectQuality(0);
          createStoreWithBackstagePass(-1);
          expectQuality(0);
        });
      });

      it('decreases the sellIn of the item by 1', () => {
        createStoreWithBackstagePass(10);
        expectSellIn(9);
      });

      it('does not increase the quality beyond 50', () => {
        createStoreWithBackstagePass(1, 49);
        expectQuality(50);
        createStoreWithBackstagePass(1, 50);
        expectQuality(50);

        // TODO: should the quality be corrected?
        // createStoreWithBackstagePass(1, 51);
        // expect(updatedItems[0].quality).toBe(50);
      });
    });
  });
});
