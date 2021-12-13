import createServer from "./server.js";
import connectDatabase from "./database.js";
import env from "dotenv"
env.config()

const appName = "Server API";
const port = process.env.PORT || 8080;
async function main() {
    try {
      await connectDatabase();
      const server = createServer();
      server.listen(port, () =>
        console.log(`${appName} running on port ${port}!`)
      );
    } catch (error) {
      console.error(error);
    }
  }
  
  main();

// server.listen(port, () => console.log(`${appName} running on port ${port}!`));