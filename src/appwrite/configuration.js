import { Client, Databases, Storage, ID, Query } from "appwrite";
import { env } from "../env/env.js";

class DataService {
  client = new Client();
  storage;
  databases;

  constructor() {
    this.client
      .setEndpoint(env.appwrite_endpoint)
      .setProject(env.appwrite_project_id);

    this.storage = new Storage(this.client);
    this.databases = new Databases(this.client);
  }

  // Database Methods
  documentCreate = async ({
    documentId,
    title,
    content,
    picture,
    status,
    userId,
  }) => {
    try {
      const document = await this.databases.createDocument(
        env.appwrite_database_id,
        env.appwrite_collection_id,
        documentId,
        {
          title,
          content,
          picture,
          status,
          userId,
        }
      );

      return document ? document : false;
    } catch (error) {
      console.log(`appwrite service error: ${error.message}`);
      return false;
    }
  };

  documentUpdate = async (documentId, { title, content, picture, status }) => {
    try {
      const document = await this.databases.updateDocument(
        env.appwrite_database_id,
        env.appwrite_collection_id,
        documentId,
        {
          title,
          content,
          picture,
          status,
        }
      );

      return document ? document : false;
    } catch (error) {
      console.log(`appwrite service error: ${error.message}`);
      return false;
    }
  };

  documentDelete = async (documentId) => {
    try {
      await this.databases.deleteDocument(
        env.appwrite_database_id,
        env.appwrite_collection_id,
        documentId
      );

      return true;
    } catch (error) {
      console.log(`appwrite service error: ${error.message}`);
      return false;
    }
  };

  findDocument = async (documentId) => {
    try {
      const document = await this.databases.getDocument(
        env.appwrite_database_id,
        env.appwrite_collection_id,
        documentId
      );

      return document ? document : false;
    } catch (error) {
      console.log(`appwrite service error: ${error.message}`);
      return false;
    }
  };

  findDocuments = async (queries = [Query.equal("status", "active")]) => {
    try {
      const documents = await this.databases.listDocuments(
        env.appwrite_database_id,
        env.appwrite_collection_id,
        queries
      );

      return documents ? documents : false;
    } catch (error) {
      console.log(`appwrite service error: ${error.message}`);
      return false;
    }
  };

  // Storage Methods
  fileUpload = async (file) => {
    try {
      const response = await this.storage.createFile(
        env.appwrite_storage_id,
        ID.unique(),
        file
      );

      return response ? response : false;
    } catch (error) {
      console.log(`appwrite service error: ${error.message}`);
      return false;
    }
  };

  fileDelete = async (fileId) => {
    try {
      await this.storage.deleteFile(env.appwrite_storage_id, fileId);
      return true;
    } catch (error) {
      console.log(`appwrite service error: ${error.message}`);
      return false;
    }
  };

  fileView = (fileId) => {
    try {
      const link = this.storage.getFileView(env.appwrite_storage_id, fileId);

      return link ? link : false;
    } catch (error) {
      console.log(`appwrite service error: ${error.message}`);
      return false;
    }
  };
}

export const Service = new DataService();
