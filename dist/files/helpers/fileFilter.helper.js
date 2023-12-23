"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileFilter = void 0;
const fileFilter = (req, file, callback) => {
    if (!file)
        return callback(new Error('file is empty'), false);
    const fileExtension = file.mimetype.split('/')[1];
    const validExtension = ['jpg', 'png', 'jpeg', 'gif'];
    if (validExtension.includes(fileExtension)) {
        return callback(null, true);
    }
    callback(null, false);
};
exports.fileFilter = fileFilter;
//# sourceMappingURL=fileFilter.helper.js.map