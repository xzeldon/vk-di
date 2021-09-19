type color_text_func = (text: string) => string;

const is_color_allowed = () => !process.env.NO_COLOR;
const color_if_allowed = (color_func: color_text_func) => (text: string) => is_color_allowed() ? color_func(text) : text;

export const cli_colors = {
    green: color_if_allowed((text: string) => `\x1B[32m${text}\x1B[39m`),
    yellow: color_if_allowed((text: string) => `\x1B[33m${text}\x1B[39m`),
    red: color_if_allowed((text: string) => `\x1B[31m${text}\x1B[39m`),
    magenta_bright: color_if_allowed((text: string) => `\x1B[95m${text}\x1B[39m`),
    cyan_bright: color_if_allowed((text: string) => `\x1B[96m${text}\x1B[39m`),
};

export const yellow = color_if_allowed((text: string) => `\x1B[38;5;3m${text}\x1B[39m`);