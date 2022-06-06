import { TypeProvider, ICurrentUser } from "../../types";
import { getAuth, GoogleAuthProvider, GithubAuthProvider, Auth, signInWithPopup } from "firebase/auth";

const getProvider = (type: TypeProvider): GoogleAuthProvider | GithubAuthProvider => {
    return type === "google" ? new GoogleAuthProvider() : new GithubAuthProvider();
}

const signinWithProvider = async (auth: Auth, provider: GoogleAuthProvider | GithubAuthProvider): Promise<ICurrentUser> => {

    try {

        const response = await signInWithPopup(auth, provider);
        const currentUser: ICurrentUser = {
            avatarUrl: response.user.photoURL!,
            name: response.user.displayName!,
            email: response.user.email!,
        }

        return currentUser;
    } catch (error: any) {
        console.log(error);
        return error;
    }
}

export const loginWithFireBase = async (type: TypeProvider) => {

    const auth = getAuth();
    const provider = getProvider(type);
    return await signinWithProvider(auth, provider);
}