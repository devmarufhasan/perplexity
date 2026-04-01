export const mockChatsResponse = {
  success: true,
  chats: [
    {
      _id: "69ca15613af5804b44a6b37a",
      user: "69c684c0cb9bcee888f410a0",
      title: "AWS Evaluation",
      createdAt: "2026-03-30T06:17:05.009Z",
      updatedAt: "2026-04-01T19:26:22.612Z",
      __v: 0,
    },
    {
      _id: "69ca70003af5804b44a6b40b",
      user: "69c684c0cb9bcee888f410a0",
      title: "Project kickoff notes",
      createdAt: "2026-03-31T10:22:10.100Z",
      updatedAt: "2026-03-31T10:40:00.000Z",
      __v: 0,
    },
    {
      _id: "69ca8f113af5804b44a6b4c8",
      user: "69c684c0cb9bcee888f410a0",
      title: "New product ideas",
      createdAt: "2026-04-01T06:00:00.000Z",
      updatedAt: "2026-04-01T06:00:00.000Z",
      __v: 0,
    },
    {
      _id: "69caa1113af5804b44a6b590",
      user: "69c684c0cb9bcee888f410a0",
      title: "Research summary",
      createdAt: "2026-04-01T11:00:00.000Z",
      updatedAt: "2026-04-01T11:05:00.000Z",
      __v: 0,
    },
  ],
};

export const mockChatMessageResponses = {
  success: true,
  chatTitle: "AWS Evaluation",
  chat: {
    _id: "69ca15613af5804b44a6b37a",
    user: "69c684c0cb9bcee888f410a0",
    title: "AWS Evaluation",
    createdAt: "2026-03-30T06:17:05.009Z",
    updatedAt: "2026-03-30T06:17:05.009Z",
    __v: 0,
  },
  aiMessage: {
    chat: "69ca15613af5804b44a6b37a",
    content:
      "Okay, let's simplify this comparison of AWS and Cloudflare. They are good for very different things, and often they are used together.",
    role: "ai",
    _id: "69cd715e5ccf1c4416b653ec",
    createdAt: "2026-04-01T19:26:22.612Z",
    updatedAt: "2026-04-01T19:26:22.612Z",
    __v: 0,
  },
  userMessage: {
    chat: "69ca15613af5804b44a6b37a",
    content: "is aws or cloudflre which is good?",
    role: "user",
    _id: "69cd715e5ccf1c4416b653ea",
    createdAt: "2026-04-01T19:26:22.604Z",
    updatedAt: "2026-04-01T19:26:22.604Z",
    __v: 0,
  },
  conversationHistory: [
    {
      id: "69ca15663af5804b44a6b37c",
      chat: "69ca15613af5804b44a6b37a",
      content: "is it good AWS?",
      role: "user",
      createdAt: "2026-03-30T06:17:10.129Z",
      updatedAt: "2026-03-30T06:17:10.129Z",
    },
    {
      id: "69ca15663af5804b44a6b37e",
      chat: "69ca15613af5804b44a6b37a",
      content:
        "AWS is generally considered excellent because it offers broad infrastructure, strong scalability, and a very mature platform.",
      role: "ai",
      createdAt: "2026-03-30T06:17:10.132Z",
      updatedAt: "2026-03-30T06:17:10.132Z",
    },
    {
      id: "69ca15893af5804b44a6b382",
      chat: "69ca15613af5804b44a6b37a",
      content: "give me an small summary why again?",
      role: "user",
      createdAt: "2026-03-30T06:17:45.348Z",
      updatedAt: "2026-03-30T06:17:45.348Z",
    },
    {
      id: "69ca15893af5804b44a6b384",
      chat: "69ca15613af5804b44a6b37a",
      content:
        "AWS is good because it is mature, scalable, and gives access to a wide range of cloud services.",
      role: "ai",
      createdAt: "2026-03-30T06:17:45.350Z",
      updatedAt: "2026-03-30T06:17:45.350Z",
    },
    {
      id: "69ca2dd04746cfd4b64ee52f",
      chat: "69ca15613af5804b44a6b37a",
      content: "is aws or cloudflre which is good?",
      role: "user",
      createdAt: "2026-03-30T08:01:20.562Z",
      updatedAt: "2026-03-30T08:01:20.562Z",
    },
    {
      id: "69ca2dd04746cfd4b64ee531",
      chat: "69ca15613af5804b44a6b37a",
      content:
        "AWS is the infrastructure layer, while Cloudflare improves delivery, caching, and security. Many teams use both together.",
      role: "ai",
      createdAt: "2026-03-30T08:01:20.564Z",
      updatedAt: "2026-03-30T08:01:20.564Z",
    },
    {
      id: "69cd715e5ccf1c4416b653ea",
      chat: "69ca15613af5804b44a6b37a",
      content: "is aws or cloudflre which is good?",
      role: "user",
      createdAt: "2026-04-01T19:26:22.604Z",
      updatedAt: "2026-04-01T19:26:22.604Z",
    },
    {
      id: "69cd715e5ccf1c4416b653ec",
      chat: "69ca15613af5804b44a6b37a",
      content:
        "AWS is good when you need hosting and infrastructure. Cloudflare is good when you need speed and protection. Using both is common.",
      role: "ai",
      createdAt: "2026-04-01T19:26:22.612Z",
      updatedAt: "2026-04-01T19:26:22.612Z",
    },
  ],
};
