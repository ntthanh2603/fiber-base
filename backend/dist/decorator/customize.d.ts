export declare const IS_PUBLIC_KEY = "isPublic";
export declare const Public: () => import("@nestjs/common").CustomDecorator<string>;
export declare const RESPONSE_MESSAGE = "response_message";
export declare const ResponseMessage: (message: string) => import("@nestjs/common").CustomDecorator<string>;
export declare const User: (...dataOrPipes: unknown[]) => ParameterDecorator;
