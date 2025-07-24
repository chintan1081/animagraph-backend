import { EntitySchema } from "typeorm";

const UserGeneration = new EntitySchema({
  name: "UserGeneration",
  // tableName: "user_generation",
  columns: {
    id: {
      primary: true,
      type: "uuid",
      generated: "uuid",
    },
    prompt: {
      type: "varchar",
    },
    codeGenerated: {
      type: "text",
    },
    videoUrl: {
      type: "varchar",
    },
        llmChat: {
      type: "varchar",
    },
  },
});

export default UserGeneration;