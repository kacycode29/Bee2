/**
 * A few hundred of the most frequent English words. Used only as a
 * heuristic filter to tell "ordinary" words from more distinctive
 * vocabulary when auto-extracting a text's key vocabulary or picking
 * cloze-deletion candidates — not a linguistic authority.
 */
export const COMMON_WORDS = new Set(
  `a about above after again all also always am an and any are as at
  back be because been before being below between both but by
  call came can cannot could
  day did do does doing done down
  each even ever every
  family far few find first for from
  get give go going gone good got
  had has have he her here him his how
  i if in into is it its
  just
  keep know
  last let life like little live long look
  made make man many may me might more most much must my
  name near need never new next no not now
  of off often on once one only or other our out over own
  people place put
  quite
  really right run
  said same say school see seem she should show since small so some still such
  take tell than that the their them then there these they thing think this those thought
  through time to today together too two
  under until up us use used
  very
  want was way we well went were what when where which while who why will with without world would
  year you your yours yourself
  am is are was were be been being
  going go went gone
  has have had
  can could may might must shall should will would
  it's he's she's don't didn't doesn't isn't wasn't
  ok okay yes no
  street city town house room door window
  day week month year today tomorrow yesterday morning evening night
  water food drink eat
  friend mother father brother sister
  happy sad angry tired
  big small tall short new old young
  one two three four five six seven eight nine ten
  monday tuesday wednesday thursday friday saturday sunday`
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w.toLowerCase())
);

export function isCommonWord(word: string): boolean {
  return COMMON_WORDS.has(word.toLowerCase());
}
