import AppDataSource  from "./ormconfig.js";

AppDataSource.initialize()
  .then(() => {
    console.log("Connected to NeonDB");
  })
  .catch((error) => console.error("DB connection error", error));
