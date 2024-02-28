(function () {
    'use strict';

    class Keyboard {
        constructor() {
            this.keys = {
                arrowUp: false,
                arrowDown: false,
                arrowLeft: false,
                arrowRight: false,
            };
            this.addEventListeners();
        }

        addEventListeners() {
            const registeredEvents = ['keydown', 'keyup'];
            registeredEvents.forEach((registeredEvent) => {
                document.body.addEventListener(registeredEvent, (e) => {
                    const keyCode =
                        e.code.charAt(0).toLowerCase() + e.code.slice(1);
                    if (keyCode in this.keys) {
                        this.keys[keyCode] =
                            registeredEvent === registeredEvents[1]
                                ? false
                                : true;
                    }
                });
            });
        }
    }

    window.GameEngine = window.GameEngine || {};
    window.GameEngine.Keyboard = Keyboard;
})();
