export const put = async (key: string, value: any) => {
  const result = await fetch(`/api/sheets/${key}`, {
    method: "PUT",
    body: JSON.stringify(value),
  }).then((res) => res.json());
  return result.message;
};

export const del = async (key: string) => {
  const result = await fetch(`/api/sheets/${key}`, {
    method: "DELETE",
  }).then((res) => res.json());
  return result.message;
};

export const get = async (key: string) => {
  try {
    const response = await fetch(`/api/sheets/${key}`);
    if (response.status !== 200) return null;
    const result = await response.json();
    return JSON.parse(result.message).data;
  } catch (error) {
    return null;
  }
};

export const getAll = async () => {
  try {
    const response = await fetch(`/api/sheets`);
    if (response.status !== 200) return null;
    const result = await response.json();
    return JSON.parse(result.message);
  } catch (error) {
    return null;
  }
};
