const renderTweet = (data) => {
  const tweet = document.createElement("div");
  tweet.classList.add("tweet-container", "card", "mb-3");

  const header = renderHeader(data);
  tweet.appendChild(header);
  const body = renderBody(data);
  tweet.appendChild(body);
  return tweet;
};

const renderHeader = (data) => {
  const header = document.createElement("div");
  header.classList.add("card-header", "profile-container");
  const avatar = document.createElement("img");
  avatar.classList.add("avatar");
  avatar.setAttribute("src", data.user.avatar);

  const nameContainer = document.createElement("div");
  nameContainer.classList.add("name-container");
  const realName = document.createElement("div");
  realName.classList.add("real-name");
  realName.innerHTML = data.user.realName;
  const accountName = document.createElement("div");
  accountName.classList.add("account-name");
  accountName.innerHTML = data.user.accountName;

  nameContainer.appendChild(realName);
  nameContainer.appendChild(accountName);

  header.appendChild(avatar);
  header.appendChild(nameContainer);
  return header;
};

const renderBody = (data) => {
  const body = document.createElement("div");
  body.classList.add("card-body");

  //Card image
  const cardImage = document.createElement("img");
  cardImage.classList.add("card-img-top");
  cardImage.setAttribute("src", data.tweet.images);

  //Content
  const content = document.createElement("p");
  content.classList.add("card-text");
  content.innerHTML = data.tweet.content;

  //Time stamp
  const timeStampContainer = document.createElement("p");
  timeStampContainer.classList.add("card-text");
  const timeStamp = document.createElement("small");
  timeStamp.classList.add("text-muted");
  timeStamp.innerHTML = data.tweet.timestamp;
  timeStampContainer.appendChild(timeStamp);

  //Stats container
  const statsContainer = document.createElement("div");
  statsContainer.classList.add("stats-container", "card-text");

  //Retweet container
  const retweetContainer = document.createElement("div");
  retweetContainer.classList.add("stat-container");
  const retweetStat = document.createElement("span");
  retweetStat.classList.add("stat");
  retweetStat.innerHTML = data.tweet.retweetCount;
  const retweetStatType = document.createElement("span");
  retweetStatType.classList.add("stat-type");
  retweetStatType.innerHTML = "Retweets";
  retweetContainer.appendChild(retweetStat);
  retweetContainer.appendChild(retweetStatType);
  statsContainer.appendChild(retweetContainer);

  //Quotetweet container
  const quotetweetContainer = document.createElement("div");
  quotetweetContainer.classList.add("stat-container");
  const quotetweetStat = document.createElement("span");
  quotetweetStat.classList.add("stat");
  quotetweetStat.innerHTML = data.tweet.quoteTweetCount;
  const quotetweetStatType = document.createElement("span");
  quotetweetStatType.classList.add("stat-type");
  quotetweetStatType.innerHTML = "Quote Tweets";
  quotetweetContainer.appendChild(quotetweetStat);
  quotetweetContainer.appendChild(quotetweetStatType);
  statsContainer.appendChild(quotetweetContainer);

  //Like container
  const likeContainer = document.createElement("div");
  likeContainer.classList.add("stat-container");
  const likeStat = document.createElement("span");
  likeStat.classList.add("stat");
  likeStat.innerHTML = data.tweet.quoteTweetCount;
  const likeStatType = document.createElement("span");
  likeStatType.classList.add("stat-type");
  likeStatType.innerHTML = "Likes";
  likeContainer.appendChild(likeStat);
  likeContainer.appendChild(likeStatType);
  statsContainer.appendChild(likeContainer);

  body.appendChild(cardImage);
  body.appendChild(content);
  body.appendChild(timeStampContainer);
  body.appendChild(statsContainer);

  return body;
};
