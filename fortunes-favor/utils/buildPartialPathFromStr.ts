export class partialPath {
  pathname!: string;
  hash?: string;
  constructor(pathname: string, hash?: string) {
    this.pathname = pathname[0] === "/" ? pathname : "/" + pathname;
    this.hash = hash;
  }
  isEqual(other: partialPath) {
    return this.pathname === other.pathname && this.hash === other.hash;
  }
  toString() {
    return this.pathname + (this.hash ? "#" + this.hash : "");
  }
}

const buildPartialPathFromStr = (str: string) => {
  const [pathname, hash] = str.split("#");
  return new partialPath(pathname, hash);
};

export default buildPartialPathFromStr;
