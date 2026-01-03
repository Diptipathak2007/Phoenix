import { Client, Databases } from "appwrite";
import dotenv from "dotenv";
dotenv.config();

const client = new Client();

const endpoint = process.env.VITE_APPWRITE_ENDPOINT;
const projectId = process.env.VITE_APPWRITE_PROJECT_ID;
const databaseId = process.env.VITE_APPWRITE_DATABASE_ID;
const collectionId = process.env.VITE_APPWRITE_COLLECTION_ID;

console.log(`Testing Appwrite connection...`);
console.log(`Endpoint: ${endpoint}`);
console.log(`Project ID: ${projectId}`);

client
    .setEndpoint(endpoint)
    .setProject(projectId);

const databases = new Databases(client);

async function testConnection() {
    try {
        console.log(`Checking 'conversations' collection (${collectionId})...`);
        try {
            await databases.listDocuments(databaseId, collectionId, []);
            console.log("Success! 'conversations' collection exists (and is public).");
        } catch (error) {
            if (error.code === 401) {
                console.log("Success! 'conversations' collection exists (but requires auth).");
            } else {
                console.error(`Error checking 'conversations': ${error.message} (Code: ${error.code})`);
            }
        }

        console.log(`Checking 'chats' collection (hardcoded)...`);
        try {
            await databases.listDocuments(databaseId, "chats", []);
            console.log("Success! 'chats' collection exists (and is public).");
        } catch (error) {
            if (error.code === 401) {
                console.log("Success! 'chats' collection exists (but requires auth).");
            } else {
                console.error(`Error checking 'chats': ${error.message} (Code: ${error.code})`);
            }
        }

    } catch (error) {
        console.error("Error:", error.message);
        console.error("Code:", error.code);
        console.error("Type:", error.type);
    }
}

testConnection();
