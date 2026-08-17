const express = require("express");
const cloudinary = require("../cloudinary");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    // Get images
    const result = await cloudinary.search
      .expression("asset_folder:Events/*")
      .max_results(500)
      .execute();

    const eventMap = {};

    result.resources.forEach((image) => {
      const folder = image.asset_folder;

      if (!eventMap[folder]) {
        eventMap[folder] = [];
      }

      eventMap[folder].push(image.secure_url);
    });

    const events = Object.entries(eventMap).map(([folder, links]) => {
      const folderName = folder.split("/").pop();

      return {
        _id: folder,
        title: folderName.replace(/^\d+-/, ""),
        link: links,
      };
    });

    events.sort((a, b) => {
      const numA = parseInt(a._id.match(/\d+/)?.[0] || "999");
      const numB = parseInt(b._id.match(/\d+/)?.[0] || "999");

      return numA - numB;
    });

    res.json(events);

  } catch (error) {
    console.error("Gallery error:", error);

    res.status(500).json({
      message: "Failed to fetch gallery",
    });
  }
});

module.exports = router;