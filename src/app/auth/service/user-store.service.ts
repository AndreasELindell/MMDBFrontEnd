import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
  private userName$ = new BehaviorSubject<string>("");
  private role$ = new BehaviorSubject<string>("");
  private id$ = new BehaviorSubject<number>(0);

  constructor() { }

  public getRoleFromStore(){
    return this.role$.asObservable();
  }
  public getUsernameFromStore(){
    return this.userName$.asObservable();
  }
  public getUserIdFromStore(){
    return this.id$.asObservable();
  }
  public setRoleFromStore(role: string){
    this.role$.next(role);
  }
  public setUsernameFromStore(username: string){
    this.userName$.next(username);
  }
  public setUserIdFromStore(id: number){
    this.id$.next(id)
  }

}
