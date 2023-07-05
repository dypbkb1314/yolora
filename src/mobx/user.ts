// mobx/userStore.ts
import { observable, action } from 'mobx';

class UserStore {
  // 用户信息对象
  @observable user = {};

  // 设置用户信息
  @action setUser(user: object) {
    this.user = user;
  }

  // 清除用户信息
  @action clearUser() {
    this.user = {};
  }
}

const NewUserStore = new UserStore();

export default NewUserStore;
