// import axios from "axios";
import { Articles } from "@shared/models/Articles";

const getHeadline = async () => {
  const articles = new Articles(news);
  console.log(articles);
};

export { getHeadline };

const news = [
  {
    source: {
      id: "wired",
      name: "Wired",
    },
    author: "Joel Khalili",
    title:
      "Peter Todd Was ‘Unmasked’ As Bitcoin Creator Satoshi Nakamoto. Now He’s In Hiding",
    description:
      "Peter Todd has gone underground after an HBO documentary named him as the creator of Bitcoin, Satoshi Nakamoto, whose real identity has long remained a mystery.",
    url: "https://www.wired.com/story/peter-todd-was-unmasked-as-bitcoin-creator-satoshi-nakamoto-now-hes-in-hiding/",
    urlToImage:
      "https://media.wired.com/photos/6716870e6874cb5feda0798e/191:100/w_1280,c_limit/102124-bitcoin-satoshi-an.jpg",
    publishedAt: "2024-10-22T11:33:59Z",
    content:
      "In the week before the documentary was released, online betting markets had Len Sassaman, a cryptographer who moved in similar online circles to Satoshi, as the most likely candidate to be revealed a… [+2075 chars]",
  },
  {
    source: {
      id: null,
      name: "[Removed]",
    },
    author: null,
    title: "[Removed]",
    description: "[Removed]",
    url: "https://removed.com",
    urlToImage: null,
    publishedAt: "2024-10-17T19:35:08Z",
    content: "[Removed]",
  },
  {
    source: {
      id: null,
      name: "Gizmodo.com",
    },
    author: "Todd Feathers",
    title:
      "FBI Arrests Man Who Searched ‘How Can I Know for Sure If I Am Being Investigated by the FBI’",
    description:
      "Eric Counsel Jr. is accused of helping to hack the U.S. Securities and Exchange Commission's X account in order to post false information about Bitcoin.",
    url: "https://gizmodo.com/fbi-arrests-man-who-searched-how-can-i-know-for-sure-if-i-am-being-investigated-by-the-fbi-2000513216",
    urlToImage:
      "https://gizmodo.com/app/uploads/2024/10/sec-bitcoin-hack-arrest.jpg",
    publishedAt: "2024-10-17T21:10:49Z",
    content:
      "The FBI has arrested an Alabama man who allegedly hacked the U.S. Securities and Exchange Commission’s X (formerly Twitter) account in order to post erroneous information about Bitcoin that briefly d… [+2369 chars]",
  },
];
