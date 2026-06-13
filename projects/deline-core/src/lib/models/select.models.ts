export interface SelectOption {
  label: string;
  value: unknown;
  disabled?: boolean;
}

export interface SelectOptionGroup {
  label: string;
  options: SelectOption[];
}
