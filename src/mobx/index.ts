import { observable, action, makeAutoObservable } from 'mobx';

class RootStore {
  constructor(){
    makeAutoObservable(this);
  }
  // 手机号码
  @observable mobile = '';
  // token
  @observable token = '';

  // 设置数据信息
  @action setUserInfo(mobile: string, token: string) {
    console.log(mobile)
    this.mobile = mobile;
    this.token = token;
  }

  // 清除数据信息
  @action clearUserInfo() {
    this.mobile = '';
    this.token = '';
  }
}

const NewStore = new RootStore();

export default NewStore;
