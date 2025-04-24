import { Cloudinary } from "@cloudinary/url-gen";
import { upload } from "cloudinary-react-native";
import {
  UploadApiOptions,
  UploadApiResponse,
} from "cloudinary-react-native/lib/typescript/src/api/upload/model/params/upload-params";

export const cld = new Cloudinary({
  cloud: {
    cloudName: process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME,
  },
});

export const uploadImage = async (file: string) => {
  // cloudinary  upload_preset = Preset Name,
  // setting > upload > Preset Name(need to create a unsign preset)
  const options: UploadApiOptions = {
    upload_preset: "Default",
    unsigned: true,
    resource_type: "auto",
  };
  return new Promise<UploadApiResponse>(async (resolve, reject) => {
    await upload(cld, {
      file,
      options: options,
      callback: (error, response) => {
        if (error || !response) {
          reject(error);
        } else {
          resolve(response);
        }
      },
    });
  });
};
