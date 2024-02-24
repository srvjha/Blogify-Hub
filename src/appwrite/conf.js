import config from "../config/config.js";
import {Client,ID,Storage,Databases,Query} from "appwrite"

export class Service{
    client  = new Client();
    databases;
    bucket;

    constructor() {
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectID);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client)
        
    }
    async createPost({title,slug,featuredImg,status,userId,content,userName,likes=0}) {
        try {
             return await this.databases.createDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                slug,
                {
                    title,
                    featuredImg,
                    status,
                    userId,
                    content,
                    userName,
                    likes
                }
             )
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
        }
    }

    async updatePost(slug,{title,content,featuredImg,status}) {
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                slug,
                {
                    title,
                    content,
                    featuredImg,
                    status,
                    
                }

            )
        } catch (error) {
            console.log("Appwrite serive :: updatePost :: error", error);
        }
    }

    async deletePost(slug){
        try {
             await this.databases.deleteDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                slug,
               
            )
            return true
        } catch (error) {
            console.log("Error ho gya bhai",error)
            return false;
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                slug
            )
        } catch (error) {
            console.log("Error ho gya bhai",error)
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status","active")]){
     try {
        return await this.databases.listDocuments(
            config.appwriteDatabaseID,
            config.appwriteCollectionID,
            queries,

        )
     } catch (error) {
        console.log("Appwrite serive :: getPosts :: error", error)
        return false;
     }
    }

    // Implementing a like feature
    async updateLikesCount(slug,likesCount){
        try {
             await this.databases.updateDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                slug,
                {
                    likes:likesCount
                }
             )
        } catch (error) {
            console.log("Appwrite error for like implementation: ",error);
            throw error;
        }
    }
    

    // file upload services
        async uploadFile(file){
         try {
            return await this.bucket.createFile(
                config.appwriteBucketID,
                ID.unique(),
                file
            )
         } catch (error) {
            console.log("Error ho gya bhai",error)
            return false;
         }
        }
        
        async deleteFile(fileId){
            try {
                 await this.bucket.deleteFile(
                    config.appwriteBucketID,
                    fileId
                )
                return true
              } catch (error) {
                console.log("Error ho gya Bhai")
                return false;
            }
        }

        getFilePreview(fileId){
            return this.bucket.getFilePreview(
                config.appwriteBucketID,
                fileId
            )
        }
        
}


const service  = new Service()


export default service