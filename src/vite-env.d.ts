/// <reference types="vite/client" />

declare module 'parse' {
  namespace Parse {
    class User {
      id: string;
      static current(): User | null;
      static signUp(username: string, password: string, attributes?: any): Promise<User>;
      static logIn(username: string, password: string): Promise<User>;
      static logOut(): Promise<void>;
      static requestPasswordReset(email: string): Promise<void>;
      get(key: string): any;
      set(key: string, value: any): void;
      save(): Promise<User>;
      signUp(): Promise<User>;
      fetch(): Promise<User>;
    }

    class Object {
      constructor(className: string);
      get(key: string): any;
      set(key: string, value: any): void;
      save(): Promise<Object>;
      destroy(): Promise<Object>;
      static extend(className: string): any;
    }

    class Query {
      constructor(objectClass: any);
      equalTo(key: string, value: any): Query;
      notEqualTo(key: string, value: any): Query;
      greaterThan(key: string, value: any): Query;
      lessThan(key: string, value: any): Query;
      containedIn(key: string, values: any[]): Query;
      contains(key: string, value: string): Query;
      descending(key: string): Query;
      ascending(key: string): Query;
      limit(n: number): Query;
      skip(n: number): Query;
      find(): Promise<Object[]>;
      first(): Promise<Object | undefined>;
      count(): Promise<number>;
    }

    class File {
      constructor(name: string, data: any);
      save(): Promise<File>;
      url(): string;
    }

    namespace Cloud {
      function run(name: string, params?: any): Promise<any>;
    }

    function initialize(appId: string, jsKey: string): void;
    let serverURL: string;
  }

  const Parse: typeof Parse & {
    User: typeof Parse.User;
    Object: typeof Parse.Object;
    Query: typeof Parse.Query;
    File: typeof Parse.File;
    Cloud: typeof Parse.Cloud;
    initialize: typeof Parse.initialize;
    serverURL: string;
  };

  export default Parse;
}

interface ImportMetaEnv {
  readonly VITE_BACK4APP_APP_ID: string
  readonly VITE_BACK4APP_JS_KEY: string
  readonly VITE_BACK4APP_SERVER_URL: string
  readonly VITE_APP_NAME: string
  readonly VITE_APP_VERSION: string
  readonly VITE_APP_ENVIRONMENT: string
  readonly VITE_WHATSAPP_SUPPORT: string
  readonly VITE_EMAIL_SUPPORT: string
  readonly VITE_EMAIL_ADMIN: string
  readonly VITE_ENABLE_ANALYTICS: string
  readonly VITE_ENABLE_NOTIFICATIONS: string
  readonly VITE_ENABLE_FILE_UPLOAD: string
  readonly VITE_API_TIMEOUT: string
  readonly VITE_MAX_FILE_SIZE: string
  readonly VITE_ALLOWED_FILE_TYPES: string
  readonly VITE_FACEBOOK_PAGE: string
  readonly VITE_TELEGRAM_CHANNEL: string
  readonly VITE_WHATSAPP_GROUP: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
