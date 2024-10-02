import { UnicomAPIUserData } from "../entities/UserData/UnicomAPIUserData";

export interface IUnicomUserDataRepository {
  getUserData(): Promise<UnicomAPIUserData>;
  updateUserData(userData: any): Promise<any>;
}
