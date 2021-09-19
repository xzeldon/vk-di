import { ILogger } from "..";
import { cli_colors, yellow } from "./cli-colors";

export type LOG_LEVEL = 'log' | 'error' | 'warn' | 'debug' | 'verbose';

export class Logger implements ILogger {
    private static log_levels: LOG_LEVEL[] = [
        'log',
        'error',
        'warn',
        'debug',
        'verbose',
    ];

    private static lastTimestamp?: number;
    protected static instance?: typeof Logger | ILogger = Logger;

    constructor(
        protected context?: string,
        private readonly isTimestampEnabled = false,
    ) { }

    log(message: any, context?: string) {
        this.call_func('log', message, context);
    }

    error(message: any, trace = '', context?: string) {
        const instance = this.get_instance();

        if (!this.is_log_level_enabled('error')) return;
        instance && instance.error.call(instance, message, trace, context || this.context);
    }

    warn(message: any, context?: string) {
        this.call_func('warn', message, context);
    }

    debug(message: any, context?: string) {
        this.call_func('debug', message, context);
    }

    verbose(message: any, context?: string) {
        this.call_func('verbose', message, context);
    }

    set_context(context: string) {
        this.context = context;
    }

    get_timestamp() {
        return Logger.get_timestamp();
    }

    static get_timestamp() {
        const locale_string_config = {
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            day: '2-digit',
            month: '2-digit',
            hourCycle: 'h23'
        } as const;

        return new Date(Date.now()).toLocaleString(undefined, locale_string_config);
    }

    static override_logger(logger: ILogger | LOG_LEVEL[] | boolean) {
        if (Array.isArray(logger)) {
            this.log_levels = logger;
            return;
        }

        this.instance = logger !== null && typeof logger === 'object' ? (logger as ILogger) : undefined;
    }

    static log(message: any, context = '', is_time_diff_enabled = true) {
        this.print_message(message, cli_colors.green, context, is_time_diff_enabled);
    }

    static error(message: any, trace = '', context = '', is_time_diff_enabled = true) {
        this.print_message(message, cli_colors.red, context, is_time_diff_enabled, 'stderr');
        this.print_stacktrace(trace);
    }

    static warn(message: any, context = '', is_time_diff_enabled = true) {
        this.print_message(message, cli_colors.yellow, context, is_time_diff_enabled);
    }

    static debug(message: any, context = '', is_time_diff_enabled = true) {
        this.print_message(message, cli_colors.magentaBright, context, is_time_diff_enabled);
    }

    static verbose(message: any, context = '', is_time_diff_enabled = true) {
        this.print_message(message, cli_colors.cyanBright, context, is_time_diff_enabled);
    }

    private call_func(name: 'log' | 'warn' | 'debug' | 'verbose', message: any, context?: string,) {
        if (!this.is_log_level_enabled(name)) {
            return;
        }

        const instance = this.get_instance();
        const func = instance && (instance as typeof Logger)[name];

        func && func.call(instance, message, context || this.context, this.isTimestampEnabled);
    }

    private is_log_level_enabled(level: LOG_LEVEL): boolean {
        return Logger.log_levels.includes(level);
    }

    protected get_instance(): typeof Logger | ILogger {
        const { instance } = Logger;
        return instance === this ? Logger : instance;
    }

    private static print_message(
        message: any,
        color: (message: string) => string,
        context = '',
        is_time_diff_enabled?: boolean,
        writeStreamType?: 'stdout' | 'stderr',
    ) {
        const output = message !== null && typeof message === 'object'
            ? `${color('Object:')}\n${JSON.stringify(message, null, 2)}\n`
            : color(message);

        const pid_message = color(`[VK-DI] ${process.pid}   - `);
        const context_message = context ? yellow(`[${context}] `) : '';
        const timestamp_diff = this.update_and_get_timestamp_diff(is_time_diff_enabled);
        const instance = (this.instance as typeof Logger) ?? Logger;
        const computed_message = `${pid_message}${instance.get_timestamp()}   ${context_message}${output}${timestamp_diff}\n`;

        process[writeStreamType ?? 'stdout'].write(computed_message);
    }

    private static update_and_get_timestamp_diff(is_time_diff_enabled?: boolean): string {
        const include_timestamp = Logger.lastTimestamp && is_time_diff_enabled;
        return include_timestamp ? yellow(` +${Date.now() - Logger.lastTimestamp}ms`) : '';
    }

    private static print_stacktrace(trace: string) {
        if (!trace) return;
        process.stderr.write(`${trace}\n`);
    }
}
