(function () {
    'use strict';

    class Loader {
        constructor() {
            this.loadOrder = {
                images: [],
                jsons: [],
            };
            this.resources = {
                images: [],
                jsons: [],
            };
        }

        addImage(name, src) {
            this.loadOrder.images.push({ name, src });
        }

        addJSON(name, address) {
            this.loadOrder.jsons.push({ name, address });
        }

        load(callback) {
            const promises = [];

            this.loadOrder.images.forEach((imageData) => {
                const { name, src } = imageData;
                const promise = Loader.loadImage(src).then((image) => {
                    this.resources.images.push({ name, image });
                    if (this.loadOrder.images.includes(imageData)) {
                        const index = this.loadOrder.images.indexOf(imageData);
                        this.loadOrder.images.splice(index, 1);
                    }
                });
                promises.push(promise);
            });

            this.loadOrder.jsons.forEach((jsonData) => {
                const { name, address } = jsonData;
                const promise = Loader.loadJSON(address).then((json) => {
                    this.resources.jsons.push({ name, json });
                    if (this.loadOrder.jsons.includes(jsonData)) {
                        const index = this.loadOrder.jsons.indexOf(jsonData);
                        this.loadOrder.jsons.splice(index, 1);
                    }
                });
                promises.push(promise);
            });

            Promise.all(promises).then(callback);
        }

        static loadImage(src) {
            return new Promise((resolve, reject) => {
                try {
                    const image = new Image();
                    image.onload = () => resolve(image);
                    image.src = src;
                } catch (err) {
                    reject(err);
                }
            });
        }

        static loadJSON(address) {
            return new Promise((resolve, reject) => {
                fetch(address)
                    .then((res) => res.json())
                    .then((json) => resolve(json))
                    .catch((err) => reject(err));
            });
        }
    }

    window.GameEngine = window.GameEngine || {};
    window.GameEngine.Loader = Loader;
})();
