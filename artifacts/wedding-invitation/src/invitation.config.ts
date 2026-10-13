export type Language = 'en' | 'ur';
export type LocalizedText = Readonly<Record<Language, string>>;

const partner1 = {
  name: { en: 'Raiyyan Ahmad', ur: 'رایّان احمد' },
  shortName: { en: 'Raiyyan Ahmad', ur: 'رایّان احمد' },
  parents: {
    en: 'S/O Mr Shamshad Ahmad & Mrs Shabista Ahmed',
    ur: 'مسٹر شمشاد احمد اور مسز شبستہ احمد کے صاحبزادے',
  },
};

const partner2 = {
  name: { en: 'Lubna Atique', ur: 'لبنیٰ عتیق' },
  shortName: { en: 'Lubna Atique', ur: 'لبنیٰ عتیق' },
  parents: {
    en: 'D/O Mr Atique Ahmad & Mrs Kahkashan',
    ur: 'مسٹر عتیق احمد اور مسز کہکشاں کی صاحبزادی',
  },
};

const weddingDate = '2026-11-18T20:00:00+05:30';
const formatting = {
  timeZone: 'Asia/Kolkata',
  westernNumerals: true,
} as const;
const urduLocale = formatting.westernNumerals ? 'ur-PK-u-nu-latn' : 'ur-PK-u-nu-arab';

const venue = {
  name: { en: 'Plaza Palace', ur: 'پلازا پیلس' },
  address: {
    en: 'Bhagwan Chungi, Pratapgarh, UP',
    ur: 'بگوان چنگی، پرتاپ گڑھ، اتر پردیش',
  },
  mapsUrl: `https://maps.google.com/?q=${encodeURIComponent('Plaza Palace, Bhagwan Chungi, Pratapgarh, UP')}`,
};

const events = [
  {
    id: 'walima',
    title: { en: 'Walima', ur: 'ولیمہ' },
    datetime: weddingDate,
    description: {
      en: 'Your presence will make our day more special and complete.',
      ur: 'آپ کی موجودگی ہمارا دن مزید خاص اور مکمل بنا دے گی۔',
    },
    icon: 'dinner',
  },
] as const;

const weddingDateValue = new Date(weddingDate);
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

const eventTitle = {
  en: `${partner1.name.en} & ${partner2.name.en} — Walima`,
  ur: `${partner1.name.ur} اور ${partner2.name.ur} — ولیمہ`,
};
const eventLocation = {
  en: `${venue.name.en}, ${venue.address.en}`,
  ur: `${venue.name.ur}، ${venue.address.ur}`,
};
const eventDescription = events[0].description;

export const invitationConfig = {
  meta: {
    title: eventTitle,
    description: {
      en: `Walima of ${partner1.name.en} and ${partner2.name.en} on 18 November 2026 at ${eventLocation.en}.`,
      ur: `${partner1.name.ur} اور ${partner2.name.ur} کا ولیمہ 18 نومبر 2026 کو ${eventLocation.ur} میں۔`,
    },
    ogAlt: {
      en: 'Raiyyan Ahmad and Lubna Atique Walima invitation',
      ur: 'رایّان احمد اور لبنیٰ عتیق کے ولیمے کا دعوت نامہ',
    },
  },
  partner1,
  partner2,
  weddingDate,
  formatting: { ...formatting, urduLocale },
  events,
  venue,
  music: {
    audioFilePath: '/audio/wedding-theme.mp3',
    placeholder: true,
  },
  event: {
    title: eventTitle,
    venue: eventLocation,
    description: eventDescription,
  },
  quran: {
    bismillah: { en: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', ur: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ' },
    arabic: {
      en: 'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ',
      ur: 'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ',
    },
    title: { en: 'A verse on love and mercy', ur: 'محبت اور رحمت کی آیت' },
    translation: {
      en: 'And among His signs is that He created for you from yourselves mates that you may find tranquility in them; and He placed between you affection and mercy. Indeed, in that are signs for a people who give thought.',
      ur: 'اور اُس کی نشانیوں میں سے ہے کہ اُس نے تمہارے لیے تم ہی میں سے جوڑے بنائے تاکہ تم اُن سے سکون پاؤ، اور تمہارے درمیان محبت اور رحمت رکھ دی۔ بے شک اس میں غور کرنے والوں کے لیے نشانیاں ہیں۔',
    },
    reference: { en: 'Surah Ar-Rum · 30:21', ur: 'سورۃ الروم · 30:21' },
  },
  copy: {
    language: { en: 'اردو', ur: 'English' },
    mute: { en: 'Mute invitation music', ur: 'دعوت کی موسیقی بند کریں' },
    unmute: { en: 'Play invitation music', ur: 'دعوت کی موسیقی چلائیں' },
    skip: { en: 'Skip the opening', ur: 'دعوت کھولیں' },
    tapToOpen: { en: 'Tap the seal to open', ur: 'مہر پر ٹیپ کرکے دعوت کھولیں' },
    openEnvelope: { en: 'Open your invitation', ur: 'اپنا دعوت نامہ کھولیں' },
    inviteEyebrow: { en: 'With the love of our families', ur: 'اپنے خاندانوں کی محبت کے ساتھ' },
    invitationText: {
      en: 'With the blessings of Allah and the love of our families, we cordially invite you to the wedding of',
      ur: 'اللہ کی برکت اور اپنے خاندانوں کی محبت کے ساتھ ہم آپ کو شادی میں شرکت کی دعوت دیتے ہیں',
    },
    weds: { en: 'Weds', ur: 'کے ساتھ' },
    partner1Name: partner1.shortName,
    partner2Name: partner2.shortName,
    parentsA: partner1.parents,
    parentsZ: partner2.parents,
    date: dateLabel,
    time: {
      en: formatTime(weddingDate, 'en-US'),
      ur: formatTime(weddingDate, urduLocale),
    },
    venueShort: { en: 'Plaza Palace · Pratapgarh, UP', ur: 'پلازا پیلس · پرتاپ گڑھ، اتر پردیش' },
    scroll: { en: 'Walima details', ur: 'ولیمے کی تفصیل' },
    scratchTitle: { en: 'Scratch to reveal', ur: 'کھرچ کر تاریخ دیکھیں' },
    scratchHint: { en: 'Gently brush away the gold to reveal the Walima date', ur: 'سنہری تہہ ہٹائیں اور ولیمے کی تاریخ دیکھیں' },
    revealDate: { en: 'Reveal the date', ur: 'تاریخ ظاہر کریں' },
    revealed: { en: 'Walima date', ur: 'ولیمے کی تاریخ' },
    saveDate: { en: 'Add to Google Calendar', ur: 'گوگل کیلنڈر میں شامل کریں' },
    countdownTitle: { en: 'Until the Walima', ur: 'ولیمے تک' },
    days: { en: 'Days', ur: 'دن' },
    hours: { en: 'Hours', ur: 'گھنٹے' },
    minutes: { en: 'Minutes', ur: 'منٹ' },
    seconds: { en: 'Seconds', ur: 'سیکنڈ' },
    pastDate: { en: 'The Walima is today', ur: 'آج ولیمہ ہے' },
    married: { en: 'Walima celebrated', ur: 'ولیمہ مبارک' },
    programTitle: { en: 'Walima', ur: 'ولیمہ' },
    programIntro: eventDescription,
    venueTitle: { en: 'Venue', ur: 'مقام' },
    venueName: venue.name,
    venueAddress: venue.address,
    mapLink: { en: 'Open in Maps', ur: 'نقشے میں کھولیں' },
    celebrationTitle: { en: 'Walima', ur: 'ولیمہ' },
    celebration: eventDescription,
    coupleFooter: { en: `${partner1.name.en} & ${partner2.name.en}`, ur: `${partner1.name.ur} اور ${partner2.name.ur}` },
    footer: { en: '18 November 2026 · Pratapgarh, UP', ur: '18 نومبر 2026 · پرتاپ گڑھ، اتر پردیش' },
    loadingCountdown: { en: 'Preparing the countdown', ur: 'الٹی گنتی تیار ہو رہی ہے' },
    sealInitials: { en: 'R & L', ur: 'ر + ل' },
  },
} as const;

export type CopyKey = keyof typeof invitationConfig.copy;
