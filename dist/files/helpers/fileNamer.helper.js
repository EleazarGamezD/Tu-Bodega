"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileNamer = void 0;
const uuid_1 = require("uuid");
const fileNamer = (req, file, callback) => {
    const fileExtension = file.mimetype.split('/')[1];
    const fileName = `${(0, uuid_1.v4)()}.${fileExtension}`;
    callback(null, 'new name');
};
exports.fileNamer = fileNamer;
//# sourceMappingURL=fileNamer.helper.js.map