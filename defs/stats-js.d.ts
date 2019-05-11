declare module "stats-js" {
  export default class Stats {
    dom: HTMLDivElement;
    begin: () => void;
    end: () => void;
    showPanel: (type: number) => void;
  }
}
