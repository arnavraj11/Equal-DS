// Sample content for screens and flows. Replace freely.
import type { ChatAction } from '../components/ChatListItem';
import type { Category } from '../foundations/Asset';

export type SampleChat = { id: string; name: string; preview: string; date: string; unread: number; actions: ChatAction[]; initials?: string; phone: string; category: Category };

export const sampleChats: SampleChat[] = [
  {
    id: 'c1',
    name: 'Arnav Raj',
    preview: 'You have a visitor',
    date: 'Yesterday',
    unread: 5,
    category: 'na',
    phone: '+91 98717 46113',
    actions: [
      { label: 'Call Back', emoji: '📞' },
      { label: 'Update Address', emoji: '✏️' },
      { label: 'Add to Calendar', emoji: '🗓️' },
    ],
  },
  {
    id: 'c2',
    name: 'Dr Mehta Clinic',
    preview: 'Appointment confirmed for tomorrow, 10 AM',
    date: '03:21',
    unread: 2,
    category: 'others',
    phone: '+91 99100 22114',
    actions: [
      { label: 'Add to Calendar', emoji: '🗓️' },
      { label: 'Call Back', emoji: '📞' },
    ],
  },
  {
    id: 'c3',
    name: 'Amit Nanda',
    preview: 'Count me in for Sunday 8 PM 👍',
    date: '12 July',
    unread: 0,
    initials: 'AN',
    category: 'na',
    phone: '+91 98717 46113',
    actions: [{ label: 'Call Back', emoji: '📞' }],
  },
  {
    id: 'c4',
    name: 'Vijay · NoBroker',
    preview: 'Offer on a 2BHK flat in Sector 12',
    date: '10 July',
    unread: 0,
    category: 'real-estate',
    phone: '+91 80471 90021',
    actions: [{ label: 'Call Back', emoji: '📞' }],
  },
  {
    id: 'c5',
    name: 'Swiggy Delivery',
    preview: 'Your order is at the gate',
    date: '09 July',
    unread: 0,
    category: 'delivery',
    phone: '+91 80690 44310',
    actions: [{ label: 'Update Address', emoji: '✏️' }],
  },
  {
    id: 'c6',
    name: 'HDFC Bank',
    preview: 'Pre-approved loan offer. You said not interested',
    date: '08 July',
    unread: 0,
    category: 'financial',
    phone: '+91 22612 60000',
    actions: [{ label: 'Call Back', emoji: '📞' }],
  },
  {
    id: 'c7',
    name: 'Amazon',
    preview: 'OTP for your delivery is 4821',
    date: '07 July',
    unread: 0,
    category: 'otp',
    phone: '+91 80471 11111',
    actions: [],
  },
];
