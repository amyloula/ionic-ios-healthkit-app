import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { Observable, from, BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class StorageService {
  constructor(private storage: Storage) {
    this.getAllPermissions();
  }

  private _permissions: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  public readonly permissions: Observable<
    any
  > = this._permissions.asObservable();

  getAllPermissions(): Promise<any> {
    return this.storage.forEach((value, key) => {
      let item = { key, value };
      this._permissions.next([...this._permissions.getValue(), item]);
    });
  }

  removeDuplicates(permissions: [], item) {
    if (permissions.length > 0) {
      return permissions.filter((val: any) => {
        if (val.key === item.key) {
          val.value.permissions = item.value.permissions;
          return val;
        } else return val;
      });
    } else return [item];
  }

  async updatePermision(key, value) {
    await this.storage.set(key, value);
    let item = { key, value };
    this._permissions.next([...this._permissions.getValue(), item]);
  }

  getPermission(key: string) {
    return this.storage.get(key);
  }

  async clearAll() {
    await this.storage.clear();
    this._permissions.next([]);
  }
}
