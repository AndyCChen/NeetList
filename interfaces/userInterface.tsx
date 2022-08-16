import { UserCredential } from "firebase/auth";

export interface UserInterface {
   uid: string,
   email: string | null,
}

export interface UserAuthContextInterface {
   user: UserInterface | null,
   isloading: boolean,
   signUp: (email: string, password: string) => Promise<UserCredential>,
   signIn: (email: string, password: string) => Promise<UserCredential>,
   logout: () => Promise<void>,
}