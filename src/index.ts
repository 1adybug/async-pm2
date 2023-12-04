import { connect, start, stop, restart, reload, delete as del, killDaemon, describe, list, dump, flush, reloadLogs, sendDataToProcessId, launchBus, sendSignalToProcessName, startup } from "pm2"
import type { StartOptions, ProcessDescription, Proc } from "pm2/types"
const pm2 = require("pm2")

export function connectAsync(noDaemonMode?: boolean): Promise<void> {
    return new Promise((resolve, reject) => {
        if (noDaemonMode === undefined) {
            connect.bind(pm2)(err => {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            })
            return
        }
        connect.bind(pm2)(noDaemonMode, err => {
            if (err) {
                reject(err)
            } else {
                resolve()
            }
        })
    })
}

export function startAsync(options: StartOptions): Promise<Proc>
export function startAsync(jsonConfigFile: string): Promise<Proc>
export function startAsync(script: string): Promise<Proc>
export function startAsync(script: string, options: StartOptions): Promise<Proc>
export function startAsync(script: string, jsonConfigFile: string): Promise<Proc>
export function startAsync(optionsOrJsonConfigFileOrScript: StartOptions | string, optionsOrJsonConfigFile?: StartOptions | string): Promise<Proc> {
    return new Promise((resolve, reject) => {
        if (typeof optionsOrJsonConfigFileOrScript === "string") {
            if (typeof optionsOrJsonConfigFile === "string") {
                start.bind(pm2)(optionsOrJsonConfigFileOrScript, optionsOrJsonConfigFile, (err, proc) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(proc)
                    }
                })
                return
            }
            if (optionsOrJsonConfigFile === undefined) {
                start.bind(pm2)(optionsOrJsonConfigFileOrScript, (err, proc) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(proc)
                    }
                })
                return
            }
            start.bind(pm2)(optionsOrJsonConfigFileOrScript, optionsOrJsonConfigFile, (err, proc) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(proc)
                }
            })
            return
        }
        start.bind(pm2)(optionsOrJsonConfigFileOrScript, (err, proc) => {
            if (err) {
                reject(err)
            } else {
                resolve(proc)
            }
        })
    })
}

export function stopAsync(process: string | number): Promise<Proc> {
    return new Promise((resolve, reject) => {
        stop.bind(pm2)(process, (err, proc) => {
            if (err) {
                reject(err)
            } else {
                resolve(proc)
            }
        })
    })
}

export function restartAsync(process: string | number): Promise<Proc> {
    return new Promise((resolve, reject) => {
        restart.bind(pm2)(process, (err, proc) => {
            if (err) {
                reject(err)
            } else {
                resolve(proc)
            }
        })
    })
}

export interface ReloadOptions {
    /**
     * (Default: false) If true is passed in, pm2 will reload it’s environment from process.env
     * before reloading your process.
     */
    updateEnv?: boolean
}

export function reloadAsync(process: string | number, options: ReloadOptions): Promise<Proc> {
    return new Promise((resolve, reject) => {
        if (options) {
            reload.bind(pm2)(process, options, (err, proc) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(proc)
                }
            })
            return
        }
        reload.bind(pm2)(process, (err, proc) => {
            if (err) {
                reject(err)
            } else {
                resolve(proc)
            }
        })
    })
}

export function deleteAsync(process: string | number): Promise<Proc> {
    return new Promise((resolve, reject) => {
        del.bind(pm2)(process, (err, proc) => {
            if (err) {
                reject(err)
            } else {
                resolve(proc)
            }
        })
    })
}

export function killDaemonAsync(): Promise<ProcessDescription> {
    return new Promise((resolve, reject) => {
        killDaemon.bind(pm2)((err, processDescription) => {
            if (err) {
                reject(err)
            } else {
                resolve(processDescription)
            }
        })
    })
}

export function describeAsync(process: string | number): Promise<ProcessDescription[]> {
    return new Promise((resolve, reject) => {
        describe.bind(pm2)(process, (err, processDescriptionList) => {
            if (err) {
                reject(err)
            } else {
                resolve(processDescriptionList)
            }
        })
    })
}

export function listAsync(): Promise<ProcessDescription[]> {
    return new Promise((resolve, reject) => {
        list.bind(pm2)((err, processDescriptionList) => {
            if (err) {
                reject(err)
            } else {
                resolve(processDescriptionList)
            }
        })
    })
}

export function sendDataToProcessIdAsync(proc_id: number, packet: object): Promise<any> {
    return new Promise((resolve, reject) => {
        sendDataToProcessId.bind(pm2)(proc_id, packet, (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}

export function launchBusAsync(): Promise<any> {
    return new Promise((resolve, reject) => {
        launchBus.bind(pm2)((err, bus) => {
            if (err) {
                reject(err)
            } else {
                resolve(bus)
            }
        })
    })
}

export function sendSignalToProcessNameAsync(signal: string | number, process: number | string): Promise<any> {
    return new Promise((resolve, reject) => {
        sendSignalToProcessName.bind(pm2)(signal, process, (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}

/**
 * Writes the process list to a json file at the path in the DUMP_FILE_PATH environment variable
 * (“~/.pm2/dump.pm2” by default).
 */
export function dumpAsync(): Promise<any> {
    return new Promise((resolve, reject) => {
        dump.bind(pm2)((err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}

/**
 * Flushes the logs.
 * @param process - Can either be the name as given in the pm2.start options,
 * a process id, or the string “all” to indicate that all scripts should be restarted.
 */
export function flushAsync(process: number | string): Promise<any> {
    return new Promise((resolve, reject) => {
        flush.bind(pm2)(process, (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}

export function reloadLogsAsync(): Promise<any> {
    return new Promise((resolve, reject) => {
        reloadLogs.bind(pm2)((err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}

export type Platform = "ubuntu" | "centos" | "redhat" | "gentoo" | "systemd" | "darwin" | "amazon"

export function startupAsync(platform: Platform): Promise<any> {
    return new Promise((resolve, reject) => {
        startup.bind(pm2)(platform, (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}
