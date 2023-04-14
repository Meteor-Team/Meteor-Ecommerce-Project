import edukaanModel from "../models/edukaanModel.js";
import fs from "fs";
export const createedukaanController = async (req, res) => {
  try {
    const { name , address, url} =req.fields;
    const { photo } = req.files;
    //alidation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !address:
        return res.status(500).send({ error: "address is Required" });
      case !url:
        return res.status(500).send({ error: "url is Required" });
     
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const edukaan = new edukaanModel({ ...req.fields });
    if (photo) {
      edukaan.photo.data = fs.readFileSync(photo.path);
      edukaan.photo.contentType = photo.type;
    }
    await edukaan.save();
    res.status(201).send({
      success: true,
      message: "edukaan Created Successfully",
      edukaan,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in crearing edukaan",
    });
  }
};


export const getedukanController = async (req, res) => {
  try {
    const edukaans = await edukaanModel
      .find({});
    res.status(200).send({
      success: true,
      counTotal: edukaans.length,
      message: "ALledukaans ",
      edukaans,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in getting edukaans",
      error: error.message,
    });
  }
};


export const getSingleEdukaanController = async (req, res) => {
  try {
    const edukaan = await edukaanModel
      .findOne({id : req.params.id})
      .select("-photo")
    res.status(200).send({
      success: true,
      message: "Single edukaan Fetched",
      edukaan,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror while getitng single edukaan",
      error,
    });
  }
};

// get photo
export const edukaanPhotoController = async (req, res) => {
  try {
    const edukaan = await edukaanModel.findById(req.params.pid).select("photo");
    if (edukaan.photo.data) {
      res.set("Content-type", edukaan.photo.contentType);
      return res.status(200).send(edukaan.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr while getting photo",
      error,
    });
  }
};
