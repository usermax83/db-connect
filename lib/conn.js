function protocol(protocol) {
  return protocol === "http:" ? protocol : "https:";
}
function buildURL(url) {
  const scheme = `${protocol(url.protocol)}//`;
  return new URL(url.pathname, `${scheme}${url.host}`).toString();
}
export class Connection {
  constructor(config) {
    this.config = config;
    this.fetch = config.fetch || fetch;
    this.session = null;
    if (config.url) {
      const url = new URL(config.url);
      this.config.username = url.username;
      this.config.password = url.password;
      this.config.host = url.hostname;
      this.url = buildURL(url);
    } else {
      this.url = new URL(`https://${this.config.host}`).toString();
    }
  }
}
