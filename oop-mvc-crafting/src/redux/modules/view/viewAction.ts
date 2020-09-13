export function viewShow(key: string | null, action: any, field?: any) {
  return {
    type: action,
    payload: { key, field },
  };
}
