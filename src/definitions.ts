export type CallbackID = string;

export interface ZeroConfWatchRequest {
  type: string;
  domain: string;
}

export type ZeroConfUnwatchRequest = ZeroConfWatchRequest;

export interface ZeroConfUnregisterRequest extends ZeroConfWatchRequest {
  name: string;
}

export interface ZeroConfRegisterRequest extends ZeroConfUnregisterRequest {
  port: number;
  props: { [key: string]: string };
}

export interface ZeroConfService {
  domain: string;
  type: string;
  name: string;
  port: number;
  hostname: string;
  ipv4Addresses: string[];
  ipv6Addresses: string[];
  txtRecord: { [key: string]: string };
}

export type ZeroConfWatchAction = 'added' | 'removed' | 'resolved';
export type ZeroConfWatchCallback = (event: {
  action: ZeroConfWatchAction;
  service: ZeroConfService;
}) => void;

export interface ZeroConfPlugin {
  getHostname(): Promise<{ hostname: string }>;
  register(request: ZeroConfRegisterRequest): Promise<void>;
  unregister(request: ZeroConfUnregisterRequest): Promise<void>;
  stop(): Promise<void>;
  watch(
    request: ZeroConfWatchRequest,
    callback: ZeroConfWatchCallback,
  ): Promise<CallbackID>;
  unwatch(request: ZeroConfUnwatchRequest): Promise<void>;
  close(): Promise<void>;
}
