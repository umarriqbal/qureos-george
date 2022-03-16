const Member = require("../models/Member");
const WebsiteToken = require("../models/WebsiteToken");

const getPathToUser = async (src, dest, allMembersHash) => {
  // Finding path to each individual member by BFS.
  var predecessors = {};
  var visited = {};
  var inQueue = [];
  var isFound = false;

  Object.keys(allMembersHash).forEach((memberId) => {
    predecessors[memberId] = -1;
    visited[memberId] = false;
  });
  visited[src] = true;
  inQueue.push(src);

  while (inQueue.length != 0) {
    const current = inQueue.shift();
    const memberFriends = allMembersHash[current].friendList;
    for (friendIdx in memberFriends) {
      const memberFriend = memberFriends[friendIdx];
      if (!visited[memberFriend]) {
        visited[memberFriend] = true;
        predecessors[memberFriend] = current;
        inQueue.push(memberFriend);
        if (memberFriend === dest) {
          isFound = true;
          break;
        }
      }
    }
  }
  if (!isFound) {
    return [];
  }
  var pathFromDest = [];
  var currPoint = dest;
  while (predecessors[currPoint] != -1) {
    pathFromDest.push(currPoint);
    currPoint = predecessors[currPoint];
  }
  pathFromDest.push(src);
  return pathFromDest.reverse();
};

const getPathToUsers = async (source, destinations, token) => {
  if (destinations.length === 0) {
    return [];
  }
  const allMembers = await Member.find();
  var allMembersHash = {};
  var destinationPaths = [];
  allMembers.forEach((member) => {
    allMembersHash[member._id] = {
      id: `${member._id}`,
      name: member.name,
      website: member.website,
      friendList: member.friendList.map((x) => `${x}`),
    };
  });

  for (destIdx in destinations) {
    const dest = destinations[destIdx];
    const pathToDest = await getPathToUser(source, dest, allMembersHash);
    if (pathToDest.length > 0) {
      // Creating a breadcrumb chain from source to heading.
      var pathToDestChain = [];
      pathToDest.forEach((memberId) => {
        pathToDestChain.push({
          id: memberId,
          name: allMembersHash[memberId].name,
          type: "member",
        });
      });
      const headingToInsert = await WebsiteToken.findOne({
        headingToken: token,
        website: allMembersHash[dest].website,
      });
      pathToDestChain.push({
        id: `${headingToInsert._id}`,
        name: headingToInsert.headingText,
        type: "heading",
      });
      destinationPaths.push(pathToDestChain);
    }
  }
  return destinationPaths;
};

module.exports.getPathToUsers = getPathToUsers;
