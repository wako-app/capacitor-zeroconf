import type { PluginListenerHandle } from '@capacitor/core';
export declare type CallbackID = string;
export interface ZeroConfWatchRequest {
    type: string;
    domain: string;
}
export declare type ZeroConfUnwatchRequest = ZeroConfWatchRequest;
export interface ZeroConfUnregisterRequest extends ZeroConfWatchRequest {
    name: string;
}
export interface ZeroConfRegisterRequest extends ZeroConfUnregisterRequest {
    port: number;
    props: {
        [key: string]: string;
    };
}
export interface ZeroConfService {
    domain: string;
    type: string;
    name: string;
    port: number;
    hostname: string;
    ipv4Addresses: string[];
    ipv6Addresses: string[];
    txtRecord: {
        [key: string]: string;
    };
}
export declare type ZeroConfWatchAction = 'added' | 'removed' | 'resolved';
export declare type ZeroConfWatchResult = {
    action: ZeroConfWatchAction;
    service: ZeroConfService;
};
export declare type ZeroConfWatchCallback = (event: ZeroConfWatchResult) => void;
export interface ZeroConfPlugin {
    addListener(eventName: 'discover', listenerFunc: (result: ZeroConfWatchResult) => void): PluginListenerHandle;
    getHostname(): Promise<{
        hostname: string;
    }>;
    register(request: ZeroConfRegisterRequest): Promise<void>;
    unregister(request: ZeroConfUnregisterRequest): Promise<void>;
    stop(): Promise<void>;
    watch(request: ZeroConfWatchRequest, callback?: ZeroConfWatchCallback): Promise<CallbackID>;
    unwatch(request: ZeroConfUnwatchRequest): Promise<void>;
    close(): Promise<void>;
}
