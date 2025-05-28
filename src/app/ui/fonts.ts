import { Inter } from 'next/font/google';
import { Space_Mono } from 'next/font/google'; 
import { Sora } from 'next/font/google';

export const sora = Sora({
  subsets: ['latin'],
  weight: ['600', '700'],
});

export const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '700', '900'],
});

export const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
});

