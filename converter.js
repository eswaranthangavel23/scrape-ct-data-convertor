var fs = require("fs");
var obj;

const convertor = async () => {
  let attr = [
    "arm",
    "armColor",
    "armpad",
    "arms",
    "back",
    "backSupport",
    "backSuspension",
    "base",
    "basecolorbasefinishbaseFrame",
    "basetype",
    "cableTrough",
    "caster",
    "casterglide",
    "color",
    "colorconfiguration",
    "cordCable",
    "cordlength",
    "cutout",
    "deskTopFinish",
    "detail",
    "fabric",
    "fileDrawer",
    "finish",
    "frame",
    "framebase",
    "frameBaseAndSuspension",
    "frameColor",
    "frameCord",
    "frameFinish",
    "grommets",
    "handle",
    "hardware",
    "headboard",
    "height",
    "heightAdjustment",
    "heightRange",
    "kitType",
    "leg",
    "legColor",
    "legFinish",
    "legs",
    "legstyle",
    "material",
    "orientation",
    "panels",
    "powerAccess",
    "powerAdjustment",
    "pulls",
    "seat",
    "seatDepth",
    "seatFabric",
    "seatmaterial",
    "seatStyle",
    "shape",
    "shell",
    "shellMaterial",
    "size",
    "softfirm",
    "storage",
    "style",
    "tilt",
    "top",
    "topFinish",
    "upholstery",
    "woodfinish",
  ];
  fs.readFile("./csvjson.json", "utf8", function (err, data) {
    if (err) throw err;
    obj = JSON.parse(data);
    let type = "";
    let resultJson = [];
    for (let o of obj) {
      if (o.productType != "") type = o.productType;

      let result = {
        productType: o.productType,
        variantId: o.variantId,
        sku: o.sku,
        prices: o.prices,
        tax: o.tax,
        categories: o.categories,
        images: o.images,
        "name.en": o["name.en"],
        "description.en": o["description.en"],
        "slug.en": o["slug.en"],
        "metaDescription.en": o["metaDescription.en"],
        "metaKeywords.en": o["metaKeywords.en"],

        "name.de": o["name.de"],
        "description.de": o["description.de"],
        "slug.de": o["slug.de"],
        "metaDescription.de": o["metaDescription.de"],
        "metaKeywords.de": o["metaKeywords.de"],
        "metaTitle.de": o["metaTitle.de"],

        "name.it": o["name.it"],
        "description.it": o["description.it"],
        "slug.it": o["slug.it"],
        "metaDescription.it": o["metaDescription.it"],
        "metaKeywords.it": o["metaKeywords.it"],
        "metaTitle.it": o["metaTitle.it"],
        creationDate: "",
        baseId: o.baseId,
        "details.it": "",
        isOnStock: "",
        isLook: "",
        lookProducts: "",
        seasonNew: "",
      };
      for (let att of attr) {
        result[type + "_" + att] = o[att];
      }
      resultJson.push(result);
    }
    let resultJsondata = JSON.stringify(resultJson);
    fs.writeFileSync("resultJson.json", resultJsondata);
  });
};
//convertor();

const facts = () => {
  let attr = [
    "arm",
    "armColor",
    "armpad",
    "arms",
    "back",
    "backSupport",
    "backSuspension",
    "base",
    "basecolorbasefinishbaseFrame",
    "basetype",
    "cableTrough",
    "caster",
    "casterglide",
    "color",
    "colorconfiguration",
    "cordCable",
    "cordlength",
    "cutout",
    "deskTopFinish",
    "detail",
    "fabric",
    "fileDrawer",
    "finish",
    "frame",
    "framebase",
    "frameBaseAndSuspension",
    "frameColor",
    "frameCord",
    "frameFinish",
    "grommets",
    "handle",
    "hardware",
    "headboard",
    "height",
    "heightAdjustment",
    "heightRange",
    "kitType",
    "leg",
    "legColor",
    "legFinish",
    "legs",
    "legstyle",
    "material",
    "orientation",
    "panels",
    "powerAccess",
    "powerAdjustment",
    "pulls",
    "seat",
    "seatDepth",
    "seatFabric",
    "seatmaterial",
    "seatStyle",
    "shape",
    "shell",
    "shellMaterial",
    "size",
    "softfirm",
    "storage",
    "style",
    "tilt",
    "top",
    "topFinish",
    "upholstery",
    "woodfinish",
  ];
  let types = [
    "Table",
    "chair",
    "desk",
    // "storage",
    // "light",
    // "stool",
    // "sofa",
    // "bed",
    // "bundle",
    // "gaming",
  ];

  // {
  //   facet: "variants.attributes.arm.key",
  //   type: "string",
  //   option: "",
  //   name: "arm"
  // },

  let results = [];
  let finalattr = [];
  for (let type of types) {
    for (let att of attr) {
      let res = {
        facet: "variants.attributes." + type + "_" + att + ".key",
        type: "string",
        option: "",
        name: type + "_" + att,
      };
      results.push(res);
      finalattr.push(type + "_" + att);
    }
  }
  //console.log()
  let resultJsondata = JSON.parse(results);
  fs.writeFileSync("facetsJson.txt", results);

  // let attrJsondata = JSON.stringify(finalattr);
  // fs.writeFileSync("finalattr.json", attrJsondata);
};
facts();
