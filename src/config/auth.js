import { account } from './appwriteConfig';

const SignupAuth = async (userid, email, password, name) => {
  try {
    await account.create(userid, email, password, name);
    return { success: true };  // Return success object
  } catch (error) {
    console.error("Error in signup", error);
    return { error: error.message || "An error occurred during signup." };  // Return error object with message
  }
};

const LoginAuth = async (email, password) => {
  try {
    const user = await account.createEmailPasswordSession(email, password);
    return { success: true, user };  // Return user data on success
  } catch (error) {
    console.error("Error in login", error);
    return { error: error.message || "Invalid email or password" };  // Return error object with message
  }
};

const LogoutAuth = async () => {
  try {
    await account.deleteSession("current");
    return { success: true };  // Return success message
  } catch (error) {
    console.error("Error in logout", error);
    return { error: error.message || "An error occurred during logout." };  // Return error object with message
  }
};

const GetLoginStatusAuth = async () => {
  try {
    const status = await account.get();
    return { success: true, status };  // Return status object
  } catch (error) {
    console.error("Error getting account status", error);
    return { error: error.message || "Unable to fetch account status." };  // Return error object with message
  }
};

export { LoginAuth, SignupAuth, LogoutAuth, GetLoginStatusAuth };
