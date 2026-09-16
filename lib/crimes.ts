export const crimes = [
  'বন্ধুদের ৫ মিনিট বলে ২ ঘণ্টা দেরি করানো',
  'চা খেয়ে বিলের সময় হঠাৎ নিখোঁজ হয়ে যাওয়া',
  'বন্ধুর ফোন নিয়ে অনুমতি ছাড়াই gallery খুলতে চাওয়া',
  'রাত ৩টায় “ঘুমাস?” মেসেজ পাঠানো',
  'বিরিয়ানি দেখলে বন্ধুত্বের নীতি ভুলে যাওয়া',
  'অতিরিক্ত ফালতু কথা বলা',
  'নিজেকে সব বিষয়ে expert দাবি করা',
  'ধার নেওয়া জিনিস ফেরত দেওয়ার কথা ভুলে যাওয়া',
  '“৫ মিনিটে আসছি” বলে সময়কে আপেক্ষিক বানানো',
  'বন্ধুর embarrassing story public করে দেওয়া',
];

export const aliases = [
  'THE TALKATIVE ONE','OPERATION TEA','THE LATE ARRIVAL','BURYANI SUSPECT','404 BRAIN','CAPTAIN NONSENSE','THE GROUP CHAT MENACE','SILENTLY CHAOTIC'
];

export function hashFromString(value: string) {
  let h = 2166136261;
  for (let i = 0; i < value.length; i++) h = Math.imul(h ^ value.charCodeAt(i), 16777619);
  return Math.abs(h >>> 0);
}

export function makeResult(seed: string) {
  const h = hashFromString(seed);
  const pick = <T,>(arr: T[], n: number) => arr[(h + n * 17) % arr.length];
  return {
    alias: pick(aliases, 1),
    crime: pick(crimes, 2),
    talk: 60 + (h % 41),
    annoying: 55 + ((h >> 3) % 46),
    commonSense: 8 + ((h >> 7) % 58),
    biryani: 80 + ((h >> 11) % 21),
    threat: 70 + ((h >> 15) % 30),
    caseId: `FCR-${String(h).slice(-6).padStart(6,'0')}`,
  };
}
