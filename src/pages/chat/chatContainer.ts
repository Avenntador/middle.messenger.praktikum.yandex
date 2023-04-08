import "./chat.scss";

// templates
import chatTemplate from "./chat.hbs";
import chatListItemTemplate from "./templates/chat-list-item.hbs";
import messageTemplate from "./templates/message.hbs";

// icons
import avatarIcon from "static/icons/avatarIcon.png";
import arrowRightIcon from "static/icons/arrowRightIcon.png";
import attachIcon from "static/icons/attachIcon.png";
import deliveredIcon from "static/icons/deliveredIcon.png";

const chatContainer = () => {
  const messages = [
    {
      mine: true,
      message: "Hi",
      status: true,
      time: "11:00",
      deliveredIcon,
    },
    {
      message: "Hi, how are you?",
      time: "11:02",
      deliveredIcon,
    },
    {
      mine: true,
      message: "I'm fine, thank you",
      status: true,
      time: "11:04",
      deliveredIcon,
    },
    {
      mine: true,
      message: "Look at this, duuude",
      status: true,
      time: "11:04",
      image: avatarIcon,
      deliveredIcon,
    },
    {
      message: "No, look at this, dud",
      time: "11:04",
      image: avatarIcon,
      deliveredIcon,
    },
  ];
  const chatListItems = [
    {
      avatarIcon,
      userName: "Андрей",
      lastMessage: "LastMessage1",
      time: "11:00",
      count: 1,
    },
    {
      avatarIcon,
      userName: "Дима",
      lastMessage: "LastMessage2",
      time: "12:00",
      count: 3,
    },
  ];

  const context = {
    avatarIcon,
    arrowRightIcon,
    attachIcon,
    messagesList: createList(messages, messageTemplate),
    chatList: createList(chatListItems, chatListItemTemplate),
  };
  return chatTemplate(context);
};

export default chatContainer;

export const createList = <T>(
  items: T[],
  template: (param?: any) => string
): string => {
  let itemList = ``;
  for (let i = 0; i < items.length; i++) {
    itemList += template(items[i]);
  }
  return itemList;
};
