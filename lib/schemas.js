import { z } from "zod";

// Phone schema for Bangladesh (11 digits, starts with 01)
const phoneSchema = z
  .string()
  .length(11, "ফোন নাম্বার ১১ ডিজিটের হতে হবে")
  .regex(/^01[3-9]\d{8}$/, "ফোন নাম্বারটি বৈধ নয় (বাংলাদেশের জন্য 01 দিয়ে শুরু হতে হবে)");

// Name schema: no numbers
const nameSchema = z
  .string()
  .min(2, "নাম অন্তত ২ অক্ষরের হতে হবে")
  .max(50, "নাম ৫০ অক্ষরের বেশি হতে পারবে না")
  .regex(/^[^\d]+$/, "নামে নাম্বার থাকা যাবে না");

// Address schema: allow numbers (for road numbers), but valid characters
const addressSchema = z
  .string()
  .min(4, "ঠিকানা অন্তত ৪ অক্ষরের হতে হবে")
  .max(200, "ঠিকানা ২০০ অক্ষরের বেশি হতে পারবে না")
  .regex(/^[a-zA-Z0-9\s,.-]+$/, "ঠিকানায় শুধু অক্ষর, সংখ্যা, স্পেস, কমা, ডট এবং ড্যাশ থাকতে পারে");

// Product schema
const productSchema = z.object({
  _id: z.string(),
  name: z.string(),
  price: z.number().positive(),
  quantity: z.number().int().min(1),
  image: z.string().url().optional(),
  description: z.string().optional(),
});

// Order schema
export const orderSchema = z.object({
  customer: z.object({
    name: nameSchema,
    phone: phoneSchema,
    address: addressSchema,
  }),
  products: z.array(productSchema).min(1, "অন্তত একটি পণ্য সিলেক্ট করুন"),
  total: z.number().positive(),
  shipping: z.number().min(0),
  shippingLocation: z.enum(["inside", "outside"]),
});

export { phoneSchema, nameSchema, addressSchema, productSchema };