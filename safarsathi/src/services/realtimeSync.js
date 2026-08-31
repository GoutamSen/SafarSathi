/* ====================================================================
   SAFARSAATHI REAL-TIME MULTI-TAB SYNC ENGINE (BroadcastChannel API)
==================================================================== */
const CHANNEL_NAME = 'safarsathi_realtime_channel';

class RealtimeSyncEngine {
  constructor() {
    this.listeners = [];
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      this.channel = new BroadcastChannel(CHANNEL_NAME);
      this.channel.onmessage = (event) => {
        this.notifyListeners(event.data);
      };
    } else if (typeof window !== 'undefined') {
      window.addEventListener('storage', (event) => {
        if (event.key === CHANNEL_NAME && event.newValue) {
          try {
            const data = JSON.parse(event.newValue);
            this.notifyListeners(data);
          } catch (e) {
            console.error('Storage sync parse error:', e);
          }
        }
      });
    }
  }

  broadcast(type, payload = {}) {
    const message = { type, payload, timestamp: Date.now() };
    if (this.channel) {
      this.channel.postMessage(message);
    }
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(CHANNEL_NAME, JSON.stringify(message));
    }
  }

  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter((cb) => cb !== callback);
    };
  }

  notifyListeners(data) {
    this.listeners.forEach((callback) => {
      try {
        callback(data);
      } catch (err) {
        console.error('Listener callback error:', err);
      }
    });
  }
}

export const realtimeSync = new RealtimeSyncEngine();
