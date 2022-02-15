export default interface Http {
  on(method: string, url: string, fn: any): Promise<void>;
  listen(): Promise<void>;
}
