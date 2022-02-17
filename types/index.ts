export type StatePropsType = {
  errors: Record<string, string> | null;
  data: Record<string, string>;
  message: string | null;
  loading: boolean;
}