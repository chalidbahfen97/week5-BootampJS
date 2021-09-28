import { rejects } from "assert";
import formidable from "formidable";
import fs from "fs";
import path from "path";

const uploadDir = process.cwd()+"/storages/"

const uploadSingleFile = async (req) => {
  const options = {
    multiplies: true,
    keepExtensions: true,
    uploadDir: uploadDir,
    maxFileSize: 50 * 1024 * 1024,
  };

  const form = formidable(options);

  const result = new Promise((resolve, reject) => {
    form.onPart = function (part) {
      if (!part.filename || part.filename.match(/\.(jpg|jpeg|png)$/i)) {
        this.handlePart(part);
      } else {
        form._error(new Error("File type is not supported"));
      }
    };

    form.parse(req, async (error, fields, files) => {
      if (error) {
        return reject({
          status: "error",
          message: `${error}`,
        });
      }

      const uploadFile = files.uploadFile.path;
      const seq = path.sep;
      const filename = uploadFile
        .substr(uploadFile.lastIndexOf(seq), uploadFile.length)
        .replace(seq, "");

      return resolve({
        attr: {
          file: files.uploadFile,
          fields: fields,
          filename: filename,
        },
        status: {
          status: "succeed",
          message: "",
        },
      });
    });
  });
  return result;
};

export default {
  uploadSingleFile,
};
