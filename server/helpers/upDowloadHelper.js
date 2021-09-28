import { rejects } from "assert";
import { log } from "console";
import formidable from "formidable";
import fs from "fs";
import path from "path";

const uploadDir = process.cwd()+"/storages/"

const uploadSingleFile =  async (req) =>{

}

const uploadMultipleFile = async (req) => {
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

      let listOfFiles = [];

      if(files){
       // console.log(files);
        let fileAtt = {
          prim_id : 0, 
          prim_filename : "",
          prim_filesize : 0,
          prim_url : "",
          prim_primary : false,
        }

        const sep = path.sep;
        let uploadFile = "";
        let fileName = "";
        
        files.uploadFile.forEach((el)=>{
          uploadFile = el.path;
          fileName = uploadFile.substring(uploadFile.lastIndexOf(sep),uploadFile.length)
          .replace(sep,"")
        })

        fileAtt = {
          prim_id : 0, 
          prim_filename : fileName,
          prim_filesize : el.size,
          prim_filetype : el.type,
          prim_url : process.env.URL_IMAGE+fileName,
          prim_primary : false
        }

        listOfFiles = [...listOfFiles,fileAtt];
      }

      return resolve({
        attr: {
          files: listOfFiles,
          fields: fields
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

const showProductImage = async (req,res) =>{
  const fileName = req.params.fileName;
  const url =`${process.cwd()}/${process.env.UPLOAD_DIR}/${fileName}`
  fs.createReadStream(url)
    .on("error",() => responseNotFound(req,res))
    .pipe(res);
}

function responseNotFound(req,res){
  res.writeHead(404,{"Content-Type" : "text/plain"});
  res.end("Not Found");
}

export default {
  uploadSingleFile,
  showProductImage,
  responseNotFound,
  uploadMultipleFile
};
