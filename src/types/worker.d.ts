declare module "worker-loader!*" {
  // class(クラス名)extends(継承元クラス){
  // }(クラスの実証)

  class WebpackWorker extends Worker {
    constructor();
  }

  export default WebpackWorker;
}
