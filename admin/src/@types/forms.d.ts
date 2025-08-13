export interface BasicFormsProps<TValue> {
  defaultValues?: TValue;
  handler: (values: TValue) => void | Promise<void>;
}
