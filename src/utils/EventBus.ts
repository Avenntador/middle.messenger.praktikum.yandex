class EventBus {
  private readonly listeners: Record<string, CallableFunction[]> = {};

  on(event: string, callback: CallableFunction) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event]?.push(callback);
  }

  off(event: string, callback: CallableFunction) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event]!.filter((listener) => listener !== callback);
  }

  emit(event: string, ...args: unknown[]) {
    if (!this.listeners[event]) {
      return;
    }

    this.listeners[event]!.forEach((listener) => {
      listener(...args);
    });
  }
}

export default EventBus;
