import { Client, Account, ID } from "appwrite";
import { env } from "../env/env.js";

class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(env.appwrite_endpoint)
      .setProject(env.appwrite_project_id);

    this.account = new Account(this.client);
  }

  signup = async ({ email, password, name }) => {
    try {
      const userdata = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (userdata) await this.login({ email, password });
      const status = await this.currentUser();

      return { userdata, status };
    } catch (error) {
      console.log(`appwrite service error: ${error.message}`);
      return { userdata: error.message, status: false };
    }
  };

  login = async ({ email, password }) => {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.log(`appwrite service error: ${error.message}`);
      return error.message;
    }
  };

  logout = async () => {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.log(`appwrite service error: ${error.message}`);
      return false;
    }
  };

  currentUser = async () => {
    try {
      const userdata = await this.account.get();

      return userdata ? userdata : false;
    } catch (error) {
      console.log(`appwrite service error: ${error.message}`);
      return false;
    }
  };
}

export const Auth = new AuthService();
