/**
 * ============================================================================
 * 🎓 TEACHING DEMO: Authentication (AuthN) vs Authorization (AuthZ / RBAC)
 * ============================================================================
 * 
 * এই ফাইলটি আপনার ভিডিও রেকর্ডিংয়ের জন্য তৈরি করা হয়েছে।
 * আপনি ভিডিওতে এই ফাইলটি ওপেন করে শিক্ষার্থীদের একদম সহজ ৫-৬ লাইনে 
 * দুটি কনসেপ্ট টাইপ করে বা বুঝিয়ে দিতে পারবেন।
 */

import { Request, Response } from "express";

// ============================================================================
// ১. AUTHENTICATION (AuthN) - পরিচয় যাচাইকরণ (Who Are You?)
// ============================================================================
// প্রশ্ন: ইউজার যা দাবি করছে, সে আসলেই কি সেই ব্যক্তি?
// চেক: ইমেইল এবং পাসওয়ার্ড সঠিক কিনা।

export async function loginAuthenticationDemo(req: Request, res: Response) {
  const { email, password } = req.body;

  // ধাপ ১: ইমেইল দিয়ে ডাটাবেজে ইউজারকে খোঁজা
  const user = await fakeDatabase.findUserByEmail(email);
  if (!user) {
    return res.status(401).json({ message: "Authentication Failed: User not found!" });
  }

  // ধাপ ২: পাসওয়ার্ড মিলিয়ে দেখা
  if (user.password !== password) {
    return res.status(401).json({ message: "Authentication Failed: Incorrect password!" });
  }

  // ধাপ ৩: পরিচয় নিশ্চিত! (Authentication Successful)
  return res.status(200).json({
    message: "Authentication Success! You are verified.",
    user: { id: user.id, email: user.email, role: user.role },
  });
}


// ============================================================================
// ২. AUTHORIZATION (AuthZ / RBAC) - অধিকার যাচাইকরণ (What Can You Do?)
// ============================================================================
// প্রশ্ন: ইউজার লগইন করা ঠিক আছে, কিন্তু এই পেজে বা রুটে ঢোকার অধিকার কি তার আছে?
// চেক: ইউজারের রোল STUDENT নাকি MENTOR?

export function mentorAuthorizationGuard(req: Request, res: Response, next: Function) {
  const currentUser = req.user; // লগইন করার পর প্রাপ্ত ইউজার

  // ধাপ ১: ইউজারের রোল চেক করা (Role-Based Access Control)
  if (currentUser?.role !== "MENTOR") {
    // স্টুডেন্ট হলে আটকে দেওয়া হবে (403 Forbidden)
    return res.status(403).json({
      message: "Authorization Failed: Access restricted! Only Mentors are allowed.",
    });
  }

  // ধাপ ২: মেন্টর হলে ড্যাশবোর্ডে ঢোকার অনুমতি দেওয়া
  return next();
}


// ============================================================================
// ৩. PERFORMANCE EXPLANATION (পারফরম্যান্স নষ্ট না হওয়ার গোপন কৌশল)
// ============================================================================
// প্রশ্ন: হাজার হাজার রিকোয়েস্টে সার্ভার কীভাবে স্লো না হয়ে রোল চেক করে?
// উত্তর: প্রতিবার ডাটাবেজে কোয়েরি না করে, লগইনের সময় টোকেনের (JWT) ভেতরেই
// রোল { role: "STUDENT" } স্টোর থাকে। সার্ভার মেমরিতে মাইক্রোসেকেন্ডে এটি পড়ে ফেলে!
