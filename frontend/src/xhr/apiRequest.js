const handleFetchErrors = (response) => {
  if (!response.ok) {
    return { success: false };
  }
  return response.json();
};
const doGet = async (inputUrl) => {
  const apiResponse = await fetch(inputUrl).then(handleFetchErrors);
  return apiResponse;
};
const doPost = async (inputUrl, requestBody = {}) => {
  const apiResponse = await fetch(inputUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody),
  }).then(handleFetchErrors);
  return apiResponse;
};

const getAllMembers = async () => {
  return await doGet("/api/member");
};

const getFilteredMembers = async (filterParams) => {
  var urlToGet = "/api/member?";
  if (filterParams.token) {
    urlToGet = `${urlToGet}token=${filterParams.token}`;
  }
  if (filterParams.nameToken) {
    urlToGet = `${urlToGet}nameToken=${filterParams.nameToken}`;
  }
  return await doGet(urlToGet);
};
const createMember = async (memberData) => {
  return await doPost("/api/member/create", memberData);
};

const getSearchTokens = async (token) => {
  return await doGet(`/api/autosuggestions/${token}`);
};

const getMember = async (memberId) => {
  const toGetURL = `/api/member/${memberId}`;
  return await doGet(toGetURL);
};

const getMembersFromToken = async (bodyParams) => {
  return await doPost("/api/search", bodyParams);
};

const addFriend = async (bodyParams) => {
  return await doPost("/api/member/add-friend", bodyParams);
};

export {
  getAllMembers,
  createMember,
  getSearchTokens,
  getFilteredMembers,
  getMember,
  getMembersFromToken,
  addFriend,
};
