import { Client, Account, Databases, Storage } from 'appwrite';
import conf from './conf';

// Create a new Appwrite Client instance
const client = new Client()
  .setEndpoint(conf.appwriteUrl)  // Endpoint URL
  .setProject(conf.appwriteProjectId);  // Project ID

// Create an Account instance for authentication-related tasks
export const account = new Account(client);

// Create a Databases instance for database-related tasks
export const databases = new Databases(client);

// Create a Storage instance for file-related tasks
export const storage = new Storage(client);

// Export other necessary instances
export default client;
export {ID} from 'appwrite'
