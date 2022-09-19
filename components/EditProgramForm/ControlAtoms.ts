import { atom, useAtom } from 'jotai';

export const blockAtom = atom(0);
export const weekAtom = atom(0);
export const dayAtom = atom(0);

export function getPath() {
  const [blockTab] = useAtom(blockAtom);
  const [weekTab] = useAtom(weekAtom);
  const [dayTab] = useAtom(dayAtom);

  return `blocks.${blockTab}.weeks.${weekTab}.days.${dayTab}.exercises`;
}
