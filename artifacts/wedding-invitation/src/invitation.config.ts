export type Language = 'en' | 'ur';
export type LocalizedText = Readonly<Record<Language, string>>;

const partner1 = {
  name: { en: 'Aanya Rahman', ur: 'آنیہ رحمان' },
  shortName: { en: 'Aanya', ur: 'آنیہ' },
  parents: {
    en: 'Daughter of Samira & Imran Rahman',
    ur: 'سمیرا اور عمران رحمان کی صاحبزادی',
  },
  profession: { en: 'Architect', ur: 'معمار' },
};

const partner2 = {
  name: { en: 'Zayd Khan', ur: 'زید خان' },
  shortName: { en: 'Zayd', ur: 'زید' },
  parents: {
    en: 'Son of Farah & Tariq Khan',
    ur: 'فرح اور طارق خان کے صاحبزادے',
  },
  profession: { en: 'Botanist', ur: 'ماہرِ نباتات' },
};

const weddingDate = '2027-01-09T17:00:00+05:30';
const formatting = {
  timeZone: 'Asia/Kolkata',
  westernNumerals: true,
} as const;
const urduLocale = formatting.westernNumerals ? 'ur-PK-u-nu-latn' : 'ur-PK-u-nu-arab';

const venue = {
  name: { en: 'Garden Pavilion at Rambagh Palace', ur: 'رام باغ پیلس کا گارڈن پویلین' },
  address: {
    en: 'Bhawani Singh Road, Rambagh, Jaipur, Rajasthan 302005, India',
    ur: 'بھوانی سنگھ روڈ، رام باغ، جے پور، راجستھان 302005، بھارت',
  },
  mapsUrl: 'https://maps.google.com/?q=Rambagh+Palace+Jaipur',
};

const accommodation = {
  name: { en: 'Sawai Man Mahal', ur: 'سوائی مان محل' },
  note: {
    en: 'A small room block is reserved nearby at Sawai Man Mahal. Please mention our celebration when booking.',
    ur: 'قریبی سوائی مان محل میں چند کمرے مختص ہیں۔ بکنگ کے وقت ہماری تقریب کا حوالہ دیں۔',
  },
  bookingCode: { en: 'AANYAZAYD', ur: 'AANYAZAYD' },
};

const events = [
  {
    id: 'welcome-tea',
    title: { en: 'Welcome & garden tea', ur: 'استقبال اور باغ میں چائے' },
    datetime: '2027-01-09T17:00:00+05:30',
    description: {
      en: 'Arrive, settle in, and share a cup of tea among the winter flowers.',
      ur: 'تشریف لائیں، آرام سے بیٹھیں اور سردیوں کے پھولوں میں چائے کا لطف اٹھائیں۔',
    },
    icon: 'tea',
  },
  {
    id: 'ceremony',
    title: { en: 'The ceremony', ur: 'نکاح کی تقریب' },
    datetime: '2027-01-09T17:45:00+05:30',
    description: {
      en: 'A quiet, joyful moment with our families and closest friends.',
      ur: 'اپنے خاندان اور قریبی دوستوں کے ساتھ ایک پُرمسرت لمحہ۔',
    },
    icon: 'heart',
  },
  {
    id: 'dinner',
    title: { en: 'Dinner beneath the lights', ur: 'چراغوں تلے عشائیہ' },
    datetime: '2027-01-09T19:00:00+05:30',
    description: {
      en: 'A long table, good food, and time to catch up.',
      ur: 'لمبی میز، اچھا کھانا اور ایک دوسرے سے باتوں کا وقت۔',
    },
    icon: 'dinner',
  },
  {
    id: 'music-and-dancing',
    title: { en: 'Music, cake & dancing', ur: 'موسیقی، کیک اور رقص' },
    datetime: '2027-01-09T20:30:00+05:30',
    description: {
      en: 'Stay for a song, a slice of cake, and the last dance.',
      ur: 'ایک گیت، کیک کا ٹکڑا اور آخری رقص کے لیے ہمارے ساتھ رہیے۔',
    },
    icon: 'music',
  },
] as const;

const shuttle = {
  note: {
    en: 'A complimentary shuttle leaves Jaipur Junction at 4:15 pm and returns after the festivities.',
    ur: 'مفت شٹل شام 4:15 بجے جے پور جنکشن سے روانہ ہوگی اور تقریب کے بعد واپس آئے گی۔',
  },
};

const rsvpDeadline = '2026-12-12T23:59:59+05:30';
const weddingDateValue = new Date(weddingDate);
const deadlineValue = new Date(rsvpDeadline);
const formatTime = (iso: string, locale: string) =>
  new Intl.DateTimeFormat(locale, {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: formatting.timeZone,
  }).format(new Date(iso));
const dateLabel = {
  en: new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: formatting.timeZone,
  }).format(weddingDateValue),
  ur: new Intl.DateTimeFormat(urduLocale, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: formatting.timeZone,
  }).format(weddingDateValue),
};
const deadlineLabel = {
  en: new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'Asia/Kolkata',
  }).format(deadlineValue),
  ur: new Intl.DateTimeFormat(urduLocale, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: formatting.timeZone,
  }).format(deadlineValue),
};
const title = {
  en: `${partner1.shortName.en} & ${partner2.shortName.en} — Wedding Celebration`,
  ur: `${partner1.shortName.ur} اور ${partner2.shortName.ur} — شادی کی تقریب`,
};
const eventLocation = {
  en: `${venue.name.en}, ${venue.address.en}`,
  ur: `${venue.name.ur}، ${venue.address.ur}`,
};
const eventDescription = {
  en: `Welcome tea at ${formatTime(events[0].datetime, 'en-US')}, ceremony at ${formatTime(events[1].datetime, 'en-US')}, and dinner at ${formatTime(events[2].datetime, 'en-US')}. Kindly reply by ${deadlineLabel.en}.`,
  ur: `استقبال ${formatTime(events[0].datetime, 'ur-PK-u-nu-latn')}، نکاح ${formatTime(events[1].datetime, 'ur-PK-u-nu-latn')} اور عشائیہ ${formatTime(events[2].datetime, 'ur-PK-u-nu-latn')}۔ براہِ کرم ${deadlineLabel.ur} تک جواب دیں۔`,
};

export const invitationConfig = {
  meta: {
    title: { en: 'Aanya & Zayd — A day to remember', ur: 'آنیہ اور زید — ایک یادگار دن' },
    description: {
      en: 'With full hearts, Aanya Rahman and Zayd Khan invite you to celebrate their wedding.',
      ur: 'آنیہ رحمان اور زید خان آپ کو اپنی شادی کی خوشی میں شریک ہونے کی دعوت دیتے ہیں۔',
    },
    ogAlt: {
      en: 'Botanical wedding invitation for Aanya and Zayd',
      ur: 'آنیہ اور زید کی شادی کا نباتاتی دعوت نامہ',
    },
  },
  partner1,
  partner2,
  weddingDate,
  formatting: { ...formatting, urduLocale },
  events,
  venue,
  shuttle,
  accommodation,
  music: {
    audioFilePath: '/audio/wedding-theme.mp3',
    placeholder: true,
  },
  rsvp: {
    endpointPath: '/api/rsvp',
    deadline: rsvpDeadline,
    deadlineLabel,
  },
  event: {
    title,
    venue: eventLocation,
    description: eventDescription,
  },
  copy: {
    language: { en: 'اردو', ur: 'English' },
    mute: { en: 'Mute invitation music', ur: 'دعوت کی موسیقی بند کریں' },
    unmute: { en: 'Play invitation music', ur: 'دعوت کی موسیقی چلائیں' },
    skip: { en: 'Skip the opening', ur: 'دعوت کھولیں' },
    tapToOpen: { en: 'Tap the seal to open', ur: 'مہر پر ٹیپ کرکے دعوت کھولیں' },
    openEnvelope: { en: 'Open your invitation', ur: 'اپنا دعوت نامہ کھولیں' },
    envelopeHint: {
      en: 'A little something, sealed just for you',
      ur: 'آپ کے لیے ایک خاص پیغام',
    },
    inviteEyebrow: {
      en: 'Together with our families',
      ur: 'اپنے خاندانوں کی محبت کے ساتھ',
    },
    inviteLine: {
      en: 'request the pleasure of your company',
      ur: 'آپ کی شرکت ہمارے لیے باعثِ مسرت ہوگی',
    },
    weddingOf: { en: 'at the wedding celebration of', ur: 'کی شادی کی خوشی میں' },
    heroEyebrow: { en: "We're getting married", ur: 'ہم شادی کر رہے ہیں' },
    parentsA: partner1.parents,
    parentsZ: partner2.parents,
    professions: {
      en: `${partner1.shortName.en} · ${partner1.profession.en}  |  ${partner2.shortName.en} · ${partner2.profession.en}`,
      ur: `${partner1.shortName.ur} · ${partner1.profession.ur}  |  ${partner2.shortName.ur} · ${partner2.profession.ur}`,
    },
    date: dateLabel,
    time: {
      en: formatTime(weddingDate, 'en-US'),
      ur: formatTime(weddingDate, 'ur-PK-u-nu-latn'),
    },
    venueShort: { en: 'Rambagh Palace · Jaipur', ur: 'رام باغ پیلس · جے پور' },
    scroll: { en: 'A day made brighter with you', ur: 'آپ کی موجودگی سے روشن دن' },
    scratchTitle: { en: 'A date worth uncovering', ur: 'ایک تاریخ جو آپ کی منتظر ہے' },
    scratchHint: {
      en: 'Gently brush away the gold to find our day',
      ur: 'سنہری تہہ ہٹائیں اور ہماری تاریخ دریافت کریں',
    },
    revealDate: { en: 'Reveal the date', ur: 'تاریخ ظاہر کریں' },
    revealed: { en: 'Our day is', ur: 'ہماری خوشی کا دن ہے' },
    saveDate: { en: 'Save the date', ur: 'تاریخ محفوظ کریں' },
    countdownTitle: { en: 'Counting Down to Forever', ur: 'ہماری ہمیشہ کی خوشی تک' },
    days: { en: 'days', ur: 'دن' },
    hours: { en: 'hours', ur: 'گھنٹے' },
    minutes: { en: 'minutes', ur: 'منٹ' },
    seconds: { en: 'seconds', ur: 'سیکنڈ' },
    pastDate: { en: 'Today is the day', ur: 'آج ہماری شادی کا دن ہے' },
    married: { en: 'Married', ur: 'شادی شدہ' },
    programTitle: { en: 'An evening together', ur: 'ایک یادگار شام' },
    programIntro: {
      en: 'A few lovely moments, shared in good company.',
      ur: 'اپنوں کے ساتھ چند خوبصورت لمحات۔',
    },
    venueTitle: { en: 'Find your way to us', ur: 'ہم تک پہنچنے کا راستہ' },
    venueName: venue.name,
    venueAddress: venue.address,
    mapLink: { en: 'Open in Maps', ur: 'نقشے میں کھولیں' },
    mapNote: {
      en: 'The map link is a placeholder and will be updated before the celebration.',
      ur: 'نقشے کا لنک عارضی ہے، تقریب سے پہلے تازہ کر دیا جائے گا۔',
    },
    shuttleTitle: { en: 'A little help getting there', ur: 'آمدورفت کی سہولت' },
    shuttleText: shuttle.note,
    stayTitle: { en: 'Staying nearby', ur: 'قریبی قیام' },
    stayText: accommodation.note,
    bookingCode: accommodation.bookingCode,
    copyCode: { en: 'Copy booking code', ur: 'بکنگ کوڈ نقل کریں' },
    copied: { en: 'Booking code copied', ur: 'بکنگ کوڈ نقل ہوگیا' },
    rsvpTitle: { en: 'Will you join us?', ur: 'کیا آپ ہمارے ساتھ ہوں گے؟' },
    rsvpIntro: {
      en: `Kindly reply by ${deadlineLabel.en}. We cannot wait to celebrate with you.`,
      ur: `براہِ کرم ${deadlineLabel.ur} تک جواب دیں۔ آپ کے ساتھ خوشی منانے کے منتظر ہیں۔`,
    },
    fullName: { en: 'Your full name', ur: 'آپ کا پورا نام' },
    attendance: { en: 'Your reply', ur: 'آپ کا جواب' },
    yes: { en: 'Joyfully accepts', ur: 'خوشی سے شرکت کریں گے' },
    no: { en: 'Regretfully declines', ur: 'معذرت کے ساتھ شرکت نہیں کر سکیں گے' },
    maybe: { en: 'Replying soon', ur: 'جلد جواب دیں گے' },
    guests: { en: 'How many in your party?', ur: 'آپ کے ساتھ کتنے افراد ہوں گے؟' },
    message: { en: 'A note for the couple (optional)', ur: 'جوڑے کے لیے پیغام (اختیاری)' },
    messagePlaceholder: { en: 'Leave a little love…', ur: 'اپنی محبت کا پیغام لکھیں…' },
    submit: { en: 'Send our reply', ur: 'اپنا جواب بھیجیں' },
    sending: { en: 'Sending your reply', ur: 'آپ کا جواب بھیجا جا رہا ہے' },
    requiredName: { en: 'Please enter your full name.', ur: 'براہِ کرم اپنا پورا نام درج کریں۔' },
    requiredAttendance: { en: 'Please choose a reply.', ur: 'براہِ کرم اپنا جواب منتخب کریں۔' },
    validationError: {
      en: 'Please check the highlighted details and try again.',
      ur: 'براہِ کرم نمایاں تفصیل درست کرکے دوبارہ کوشش کریں۔',
    },
    submitError: {
      en: 'We could not send your reply just now. Please try again.',
      ur: 'ابھی جواب بھیجا نہیں جا سکا۔ براہِ کرم دوبارہ کوشش کریں۔',
    },
    thankYou: {
      en: 'Your reply has found its way to us. Thank you.',
      ur: 'آپ کا جواب ہم تک پہنچ گیا۔ بہت شکریہ۔',
    },
    storedNote: { en: 'Your response has been saved.', ur: 'آپ کا جواب محفوظ ہوگیا ہے۔' },
    demoNote: {
      en: 'Thank you — your reply was received. The hosts still need to configure RSVP storage.',
      ur: 'شکریہ — آپ کا جواب موصول ہوا۔ میزبانوں کو ابھی جواب محفوظ کرنے کی سہولت ترتیب دینی ہے۔',
    },
    privacyNote: {
      en: 'Your details are used only by the hosts to plan the wedding.',
      ur: 'آپ کی تفصیلات صرف میزبان شادی کی منصوبہ بندی کے لیے استعمال کریں گے۔',
    },
    celebration: {
      en: "We can't wait to celebrate with you",
      ur: 'ہم آپ کے ساتھ خوشی منانے کے منتظر ہیں',
    },
    footer: { en: 'Made with love · Jaipur, India', ur: 'محبت سے · جے پور، بھارت' },
    coupleFooter: {
      en: `${partner1.shortName.en} & ${partner2.shortName.en}`,
      ur: `${partner1.shortName.ur} اور ${partner2.shortName.ur}`,
    },
    loadingCountdown: { en: 'Preparing the countdown', ur: 'الٹی گنتی تیار ہو رہی ہے' },
    honeypotLabel: { en: 'Leave this field empty', ur: 'اس خانے کو خالی چھوڑیں' },
    sealInitials: { en: 'A & Z', ur: 'آ & ز' },
    nameAanya: partner1.shortName,
    nameZayd: partner2.shortName,
    celebrationTitle: { en: 'Until then, with love', ur: 'تب تک، محبت کے ساتھ' },
  },
} as const;

export type CopyKey = keyof typeof invitationConfig.copy;
