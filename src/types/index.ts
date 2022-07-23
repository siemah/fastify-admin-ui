export type StatePropsType = {
  errors: Record<string, string> | null;
  data: Record<string, any>;
  message: string | null;
  loading: boolean;
}