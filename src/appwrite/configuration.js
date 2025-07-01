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

      if (document) return document;
      else return false;
    } catch (error) {
      console.log("Appwrite Service Error: Document Create ", error);
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

      if (document) return document;
      else return false;
    } catch (error) {
      console.log("Appwrite Service Error: Document Update ", error);
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
      console.log("Appwrite Service Error: Document Delete ", error);
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

      if (document) return document;
      else return false;
    } catch (error) {
      console.log("Appwrite Service Error: Find Document ", error);
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

      if (documents) return documents;
      else return false;
    } catch (error) {
      console.log("Appwrite Service Error: Find All Document ", error);
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

      if (response) return response;
      else return false;
    } catch (error) {
      console.log("Appwrite Service Error: File Upload ", error);
      return false;
    }
  };

  fileDelete = async (fileId) => {
    try {
      await this.storage.deleteFile(env.appwrite_storage_id, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite Service Error: File Delete ", error);
      return false;
    }
  };

  fileView = (fileId) => {
    try {
      const link = this.storage.getFileView(env.appwrite_storage_id, fileId);

      if (link) return link;
      else return false;
    } catch (error) {
      console.log("Appwrite Service Error: File Preview ", error);
      return false;
    }
  };
}

export const Service = new DataService();
