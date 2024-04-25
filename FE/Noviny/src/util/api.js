const urlBase = "http://localhost:3000";

const handleApiError = (err) => {
  return err.message;
};

export const fetchGet = async (url) => {
  const response = await fetch(urlBase + url);
  const respData = await response.json();
  if (response.ok) {
    return respData;
  } else {
    const respData = await response.json();
    throw new Error(handleApiError(respData));
  }
};

export const fetchPost = async (url, body, method = "POST") => {
  const response = await fetch(urlBase + url, {
    method,
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    return 0;
  } else {
    const respData = await response.json();
    throw new Error(handleApiError(respData));
  }
};
