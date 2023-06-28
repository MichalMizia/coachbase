import { Option } from "react-multi-select-component";

export const allTags: string[] = [
  "Trójbój",
  "Conditioning",
  "Kulturystyka",
  "Przygotowanie motoryczne",
  "Wege(homo)",
  "Keto",
];

export const tagOptions: Option[] = allTags.map((tag) => {
  return { label: tag, value: tag };
});
