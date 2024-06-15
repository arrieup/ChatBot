export class Card {
    constructor(username, text) {
      this.sender = username;
      this.text = text;
      this.timestamp = new Date();
    }
  }
  