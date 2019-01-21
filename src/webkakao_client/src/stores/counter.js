import { observable, action } from 'mobx';

export default class CounterStore {
  @observable number = 1;

    // **** 추가됨
    constructor(root) {
      this.root = root;
    }

  @action increase = () => {
    this.number++;
  }

  @action decrease = () => {
    this.number--;
  }
}