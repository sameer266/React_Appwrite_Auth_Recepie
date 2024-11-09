import { databases, storage } from "./appwriteConfig";
import conf from "./conf";
import { ID } from "./appwriteConfig";
import { Query } from "appwrite";



// --------Fetch all post of all Users-----------
export const FetchAllPosts = async () => {
  try {
    const response = await databases.listDocuments(
      conf.appwriteDatabaseId,
      conf.appwriteCollectionID
    );
    return response.documents;
  } catch (error) {
    console.error("Error fetching all posts:", error);
    return [];
  }
};



// ------- CreatePost to match the intended structure-----
export const CreatePost = async (title, imageFile,content,userId) => {
    try {
    
        console.log(content);

        // Ensure imageFile exists before attempting to upload
        if (imageFile) {
            const imageId = await UploadImage(imageFile);

            const response = await databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionID,
                ID.unique(),
                {
                    title: title,
                    content: content,
                    featureImage: imageId,  // Assign image ID to featureImage
                    status: 'published',
                    userId:userId
                }
            );

            console.log("Document created successfully", response);
            return true;
        } else {
            console.error("No image file provided.");
            return false;
        }
    } catch (error) {
        console.error("Error in creating post:", error.message || error);
        return false;
    }
};

// --------------Update Post-------------
export const UpdatePost = async (postId, oldDataImageId,newData) => {
    try {
  
        let newImageId=String(oldDataImageId)
        // Check if there is a new image file to upload
        if (newData.image) {
          newImageId = await UpdateImage(oldDataImageId, newData.image);
        }

        const response = await databases.updateDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionID,
            postId,
            {
                title: newData.title,
                content: newData.content,
                featureImage: newImageId,  // Use the updated image ID
                status: newData.status,
              
            }
        );

        console.log("Post updated successfully:", response);
        return true;
    } catch (error) {
        console.error("Error in updating post:", error.message || error);
        return false;
    }
};

// --------------Delete Post ----------------
export const DeletePost = async (postId, imageId) => {
    try {
        // If an imageId is provided, delete the image first
        if (imageId) {
            await DeleteImage(imageId);
        }

        await databases.deleteDocument(conf.appwriteDatabaseId, conf.appwriteCollectionID, postId);
        console.log("Document deleted successfully.");
        return true;
    } catch (error) {
        console.error("Error in deleting post:", error.message || error);
        return false;
    }
};

// ------------Get data of only One User all Content --------
// Assuming GetImage is a function to fetch the image URL
export const FetchOneContent = async (userId) => {
    try {
      const response = await databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionID,
        [Query.equal('userId', userId)] // Query for userId
      );
  
      // Check if there are documents
      if (response.documents && response.documents.length > 0) {
        // Use Promise.all to process all documents asynchronously
        const documentsWithImages = await Promise.all(
          response.documents.map(async (document) => {
            // Check if document has a featureImage
            if (document.featureImage) {
              const imageUrl = await GetImage(document.featureImage); // Fetch the image URL
              document.featureImage = imageUrl; // Assign the image URL to the document
            }
            return document; // Return the document after processing
          })
        );
  
        return documentsWithImages; // Return all documents with images
      } else {
        return null; // No documents found
      }
  
    } catch (error) {
      console.error('Error fetching content:', error);
      throw error; // Re-throw the error for higher-level handling
    }
  };
  
  
// ----------Get one user One post bt Post id-----------
export const FetchPostById = async (postId) => {
    try {
      const response = await databases.getDocument(conf.appwriteDatabaseId, conf.appwriteCollectionID, postId);
      return response;
    } catch (error) {
      console.error("Error fetching post:", error);
      throw error;
    }
  };


// ---------------Upload Image File-----------
export const UploadImage = async (file) => {
    try {
        const response = await storage.createFile(conf.appwriteBucketID, ID.unique(), file);
        console.log("Image uploaded successfully:", response);  // Debugging log
        return response.$id;  // Return the image ID
    } catch (error) {
        console.log("Error in Uploading file", error);
        return null;  // Return null if upload fails
    }
};


// ---------------Get Image------------
export const GetImage = async (imageId) => {
    try {
      const imageUrl = await storage.getFilePreview(conf.appwriteBucketID, imageId);  // Correct method call and argument order
      return imageUrl;  // Return the image URL (href) from the file preview response
    } catch (error) {
      console.error("Error in getting image:", error.message || error);
      return null;  // Return null in case of an error
    }
  };
  

// --------Delete Image File----------
export const DeleteImage = async (imageId) => {
    try {
        await storage.deleteFile(conf.appwriteBucketID, imageId);
        console.log("Image deleted successfully.");
    } catch (error) {
        console.error("Error deleting image:", error.message || error);
    }
};

// ----------Update Image---------
export const UpdateImage = async (oldImageId, newImageFile) => {
    try {
        // Step 1: Delete the old image
        await DeleteImage(oldImageId);

        // Step 2: Upload the new image
        const response = await storage.createFile(conf.appwriteBucketID, ID.unique(), newImageFile);
        return response.$id;  // Return the new image ID
    } catch (error) {
        console.error("Error updating the image file:", error.message || error);
        return null;
    }
};
