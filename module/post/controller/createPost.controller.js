import jwt from "jsonwebtoken";
import prisma from "../../../lib/prisma.js";
const createPostFun = async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);

    const body = req.body;

    const tokenData = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(tokenData, process.env.privateKey);
    const userId = decodedToken.id;

    const imageUrl = Array.isArray(body.images)
      ? body.images
      : body.images?.split(",") || [];

    const post = await prisma.post.create({
      data: {
        title: body.title,
        price: parseFloat(body.price),
        address: body.address,
        city: body.city,
        bedroom: parseInt(body.bedroom),
        bathroom: parseInt(body.bathroom),
        longitude: body.longitude.toString(),
        latitude: body.latitude.toString(),
        type: body.type,
        property: body.property,
        images: imageUrl,
        userId: userId,

        postDetail: {
          create: {
            desc: body.desc,
            utilities: body.utilities,
            pet: body.pet,
            income: body.income,
            size: parseFloat(body.size),
            school: parseFloat(body.school),
            bus: parseFloat(body.bus),
            restaurant: parseFloat(body.restaurant),
          },
        },
      },
      include: {
        postDetail: true,
        user: true,
      },
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default createPostFun;
