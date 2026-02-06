'use server';

import { ConvexHttpClient } from 'convex/browser';
import { api } from '../../../convex/_generated/api';

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function subscribeEmail(email: string) {
  try {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return { success: false, error: 'Please enter a valid email address' };
    }

    const result = await convex.mutation(api.emailSignups.subscribe, {
      email,
    });

    if (result.alreadySubscribed) {
      return { success: false, error: 'This email is already subscribed!' };
    }

    return { success: true, data: { id: result.id } };
  } catch (error) {
    console.error('Subscribe error:', error);
    return { success: false, error: 'An unexpected error occurred. Please try again.' };
  }
}
