export const put = async (key: string, value: any) => {
  const result = await fetch(
    `/api/set?key=${key}&value=${JSON.stringify(value)}`
  ).then((res) => res.json());
  return result.message;
};

export const del = async (key: string) => {
  const result = await fetch(`/api/delete?key=${key}`).then((res) =>
    res.json()
  );
  return result.message;
};

export const get = async (key: string) => {
  try {
    const response = await fetch(`/api/get?key=${key}`);
    if (response.status !== 200) return null;
    const result = await response.json();
    return JSON.parse(result.message).data;
  } catch (error) {
    return null;
  }
};
