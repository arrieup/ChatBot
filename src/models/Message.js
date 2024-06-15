export class Message {
    constructor(username, text, type) {
      this.sender = username;
      this.text = text;
      this.type = type;
      this.timestamp = new Date();
    }
  }
  