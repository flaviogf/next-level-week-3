import { Image } from "../models/Image";

export const ImageView = {
  renderMany(images: Image[]) {
    return images.map((it) => this.render(it));
  },
  render(image: Image) {
    return {
      url: `http://localhost:3333/uploads/${image.path}`,
    };
  },
};
