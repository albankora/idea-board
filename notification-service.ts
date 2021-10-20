export interface NotificationService {
  notify(payload: unknown): Promise<void>;
}

export class NotificationServiceConsole implements NotificationService {
  async notify(payload: unknown): Promise<void> {
    await new Promise(() => console.log(payload));
  }
}
