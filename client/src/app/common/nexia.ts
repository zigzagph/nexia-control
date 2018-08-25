export class Nexia {
    address: string;
    instanceId: number;
    device = 1;
}

/*

Model : PM
Mono Inputs : 4
Stereo Inputs : 6
Mono Ouputs : 6
Stero Ouputs : 0

"model": "PM", {
    "mInputs": {
        "instanceId": 1,
        "channels": {
            1: {
                "phantom": bool,
                "gain": {
                    "min": 0,
                    "max": 66
                },
                "phase": bool,
                "mute": bool,
                "level": {
                    "floor": -60,
                    "ceiling": 10
                },
                options: {
                    "delay": {
                        "instancdId": 4
                    }
                }
            },
            2: {....
                options: {
                    "delay": {
                        "instancdId": 5
                    }
                }
            },
            3: {....
                options: {
                    "delay": {
                        "instancdId": 6
                    }
                }
            },
            4: {....
                options: {
                    "delay": {
                        "instancdId": 7
                    }
                }
            }
        }
    },
    "sInputs": {
        "instanceId": 2,
        "channels": {
            1: {
                "phantom": bool,
                "gain": {
                    "min": 0,
                    "max": 66
                },
                "phase": bool,
                "mute": bool,
                "level": {
                    "floor": -60,
                    "ceiling": 10
                },
                options: {}
            },
            2: {...},
            3: {...},
            4: {...},
            5: {...},
            6: {...}
        }
    },
    "mOutputs": {
        "instanceId": 3,
        "channels": {
            1: {
                "scale": {
                    "min": 0,
                    "max": 24
                },
                "phase": bool,
                "mute": bool,
                "level": {
                    "floor": -60,
                    "ceiling": 0
                },
                options: {}
            },
            2: {},
            3: {},
            4: {},
            5: {},
            6: {}
        }
    },
    "sOutputs": {
        "instanceId": 0,
        "channels": 0
    }
}
*/
