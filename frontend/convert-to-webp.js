import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const directory = './public/test'; // Change this to your images directory

fs.readdir(directory, (err, files) => {
  if (err) {
    console.error("Could not list the directory.", err);
    process.exit(1);
  }

  files.forEach((file) => {
    const filePath = path.join(directory, file);
    const parsedPath = path.parse(filePath);

    // Only proceed if the file is an image
    if (parsedPath.ext === '.jpg' || parsedPath.ext === '.jpeg' || parsedPath.ext === '.png') {
      const outputPath = path.join(parsedPath.dir, `${parsedPath.name}.webp`);
      // console.log(outputPath);
      // TODO : Resize the images to 4:3
      sharp(filePath)
        .webp({ quality: 80 }) 
        .extend({
          top: 0,
          bottom: 160,
          // left: 100,
          // right: 100,
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        // .rotate(180)
        .resize(1744, 1308, {
          // kernel: sharp.kernel.nearest,
          // fit: 'contain',
        })
        // .extract({ left: 200, top: 0, width: 1200, height: 933 })
        // .toBuffer()
        // .then((data) => {
        //     return sharp(data)
        //         .rotate(-180) // Reset the rotation
        //         .webp({ quality: 80 }) 
        //         .extend({
        //             top: 0,
        //             bottom: 0,
        //             background: { r: 0, g: 0, b: 0, alpha: 0 }
        //         })
        //         .toFile(outputPath);
        // })
        // .then(() => {
        //     console.log(`Successfully converted ${file} to WebP`);
        // })
        // .catch((err) => {
        //     console.error(`Error converting ${file}`, err);
        // });
        .toFile(outputPath, (err) => {
          if (err) {
            console.error(`Error converting ${file}`, err);
          } else {
            console.log(`Successfully converted ${file} to WebP`);
          }
        })
    }
  });
});
