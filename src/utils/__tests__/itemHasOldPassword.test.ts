import { IItem } from '../../services/getUserItems';
import itemHasOldPassword from "../itemHasOldPassword";
import { subDays, subMilliseconds } from "date-fns";


describe('should return true if password is older than 30 days', () => {
  test.each([
    [
      false,
      {
        createdAt: subDays(new Date(), 0).toString()
      }
    ],
    [
      false,
      {
        createdAt: subDays(new Date(), 20).toString()
      }
    ],
    [
      true,
      {
        createdAt: subDays(new Date(), 100).toString(),
      }
    ],
    [
      true,
      {
        // 30 days + 1 millisecond
        createdAt: subMilliseconds(new Date(), 30 * 24 * 60 * 60 * 1000 + 1).toString(),
      }
    ]
  ])('should return %s', (expectedResult, item) => {
    expect(itemHasOldPassword(item as IItem)).toBe(expectedResult);
  })
});