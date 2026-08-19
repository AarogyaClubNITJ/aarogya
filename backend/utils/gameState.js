class GameState {
  constructor() {
    this.validQRTokens = new Map(); // token -> timestamp
    this.activeSessions = new Map(); // token -> session details
  }

  // Adds a new token and cleans up tokens older than 60 seconds
  addQRToken(token) {
    const now = Date.now();
    this.validQRTokens.set(token, now);

    // Cleanup old tokens (older than 300 seconds)
    for (const [key, timestamp] of this.validQRTokens.entries()) {
      if (now - timestamp > 300000) {
        this.validQRTokens.delete(key);
      }
    }
  }

  // Gets the most recently generated token (for initial display)
  getCurrentQRToken() {
    let latestToken = null;
    let latestTime = 0;
    for (const [key, timestamp] of this.validQRTokens.entries()) {
      if (timestamp > latestTime) {
        latestTime = timestamp;
        latestToken = key;
      }
    }
    return latestToken;
  }

  // Checks if a token is valid (exists and is less than 300s old)
  isValidQRToken(token) {
    if (!this.validQRTokens.has(token)) return false;
    const timestamp = this.validQRTokens.get(token);
    return (Date.now() - timestamp <= 300000);
  }

  // Consumes a token so it cannot be used again
  consumeQRToken(token) {
    this.validQRTokens.delete(token);
  }

  createSession(token, sessionData) {
    this.activeSessions.set(token, sessionData);
  }

  getSession(token) {
    return this.activeSessions.get(token);
  }

  removeSession(token) {
    this.activeSessions.delete(token);
  }

  hasSession(token) {
    return this.activeSessions.has(token);
  }
}

module.exports = new GameState();
