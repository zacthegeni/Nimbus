export {}; // ensure module

declare global {
  interface Window {
    api: {
      notes: {
        list: () => Promise<any[]>;
        create: (n: any) => Promise<void>;
        update: (n: any) => Promise<void>;
        delete: (id: string) => Promise<void>;
      };
      openExternal: (url: string) => Promise<void>;
    };
  }
}
