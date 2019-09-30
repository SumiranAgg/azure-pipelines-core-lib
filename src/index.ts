var tl, core, io, ex, ioutil;

var libType = process.env['CORE_LIB_TYPE'];

switch(libType) {
    case "Task":
        tl = require("azure-pipelines-task-lib");
        break;
    case "Action":
        core = require("@actions/core");
        io = require("@actions/io");
        ex = require("@actions/exec");
        ioutil = require("@actions/io/io-util");
        break;
    default:
        throw new Error('Wring lib type set in CORE_LIB_TYPE. Valid values are "Task" and "Action".');
}

export function loc(key: string, message:string = "", args: any[]): string {
    if(libType == "Task") {
        return tl.loc(key, args);
    }
    else {
        console.log(message);
    }
}

export function setSecret(val: string): void {
    if(libType == "Task") {
        tl.setSecret(val);
    }
    else{
        core.exportSecret(val);
    }
}

export function getInput(name: string, options?: any): string | undefined {
    if(libType == "Task") {
        return tl.getInput(name, (!!options && !!options.required) ? options.required : false);
    }
    else{
        return core.getInput(name, options);
    }
}

export function debug(message: string): void {
    if(libType == "Task") {
        return tl.debug(message);
    }
    else{
        return core.debug(message);
    }
}

export function error(message: string): void {
    if(libType == "Task") {
        return tl.error(message);
    }
    else{
        return core.error(message);
    }
}

export function warning(message: string): void {
    if(libType == "Task") {
        return tl.warning(message);
    }
    else{
        return core.warning(message);
    }
}

export function info(message: string): void {
    if(libType == "Task") {
        console.log('[Information]' + message);
    }
    else{
        core.info(message);
    }
}

export function getVariable(name: string): string | undefined {
    if(libType == "Task") {
        return tl.getVariable(name);
    }
    else{
        return process.env[name];
    }
}

export function rmRf(path: string): void {
    if(libType == "Task") {
        return tl.rmRf(path);
    }
    else{
        return io.rmRf(path);
    }
}

export function exec(tool: string, args: any, options?: any): Promise<number> {
    if(libType == "Task") {
        return tl.exec(tool, args, options);
    }
    else{
        return ex.exec(tool, args, options);
    }
}

export async function exist(path: string): Promise<boolean> {
    if(libType == "Task") {
        return tl.exist(path);
    }
    else{
        return await ioutil.exists(path);
    }
}


