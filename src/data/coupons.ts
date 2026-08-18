import { Coupon } from "../types";

export const coupons: Coupon[] = [
  {
    code: "WELCOME10",
    discountType: "percentage",
    discountValue: 10,
    minOrderAmount: 50,
    usageLimit: 500,
    usageCount: 142,
    active: true
  },
  {
    code: "NOVARA25",
    discountType: "fixed",
    discountValue: 25,
    minOrderAmount: 150,
    usageLimit: 100,
    usageCount: 38,
    active: true
  },
  {
    code: "FREESHIP",
    discountType: "percentage",
    discountValue: 0,
    minOrderAmount: 100,
    active: true,
    usageCount: 92
  }
];
