var fs = require("fs");
let types = ["desk", "chair", "table", "sofa", "light", "storage"];
const convertor = async () => {
  let resultJson = [];
  let attributes = [];
  fs.readFile("./inputcsv.json", "utf8", function (err, data) {
    if (err) throw err;
    let rawdatas = JSON.parse(data);
    let count = 1;
    for (let data of rawdatas) {
      let outData = {
        productType: data["product-type"],
        variantId: data["varient-id"],
        sku: 100000 + count,
        prices: data.price,
        tax: "standard",
        categories: data.categories,
        images: data.image,
        "name.en": data.name,
        "description.en": data.description,
        "slug.en":
          data.name
            .replace(/[^a-zA-Z ]/g, "")
            .replace(/\s/g, "-")
            .toLowerCase()
            .replace("--", "-") +
          "-" +
          (100000 + count),
        "metaDescription.en": "",
        "metaKeywords.en": "",
        "name.de": data.name,
        "description.de": data.description,
        "slug.de":
          data.name
            .replace(/[^a-zA-Z ]/g, "")
            .replace(/\s/g, "-")
            .toLowerCase()
            .replace("--", "-") +
          "-" +
          (100000 + count),
        "metaDescription.de": "",
        "metaKeywords.de": "",
        "metaTitle.de": "",
        "name.it": data.name,
        "description.it": data.description,
        "slug.it":
          data.name
            .replace(/[^a-zA-Z ]/g, "")
            .replace(/\s/g, "-")
            .toLowerCase()
            .replace("--", "-") +
          "-" +
          (100000 + count),
        "metaDescription.it": "",
        "metaKeywords.it": "",
        "metaTitle.it": "",
        creationDate: "",
        baseId: count,
      };
      for (const [key, value] of Object.entries(data)) {
        if (types.includes(key.split("_")[0])) {
          if (!attributes.includes(key)) {
            console.log(key, types);
            attributes.push(key);
          }
          outData[key] = value;
        }
      }
      resultJson.push(outData);
      count++;
    }
    let resultJsondata = JSON.stringify(resultJson);
    fs.writeFileSync("resultJson.json", resultJsondata);

    let resultattr = JSON.stringify(attributes);
    fs.writeFileSync("resultattr.json", resultattr);

    getProducttypes(resultJson);
  });
};
const getProducttypes = (resultJson) => {
  let producttypes = [];

  fs.readFile("./resultattr.json", "utf8", function (err, data) {
    if (err) throw err;
    let attrs = JSON.parse(data);
    //console.log(resultJson.length, "length");
    for (let attr of attrs) {
      let attrValues = [];
      let attr_values = [];
      for (let product of resultJson) {
        for (const [key, value] of Object.entries(product)) {
          if (attr == key) {
            if (value != "") {
              if (!attr_values.includes(value)) {
                attr_values.push(value);
                attrValues.push({
                  key: value,
                  label: value,
                });
              }
            }
          }
        }
      }
      let at = types;
      let attrName = "";
      for (let a of at) {
        if (attr.split("_")[0] == a) attrName = attr.replace(a + "_", "");
      }
      let result = {
        name: attr,
        label: {
          en: attrName,
          it: attrName,
          de: attrName,
        },
        isRequired: false,
        type: {
          name: "enum",
          values: attrValues.sort((a, b) => (a.key > b.key ? 1 : -1)),
        },
        attributeConstraint: "None",
        isSearchable: true,
        inputHint: "SingleLine",
        displayGroup: "Other",
      };
      producttypes.push(result);
    }
    let final_types = [];
    for (let type of types) {
      let attributes = [];
      for (let type_attr of producttypes) {
        if (type_attr.name.includes(type)) {
          attributes.push(type_attr);
        }
      }
      console.log(attributes.length);
      final_types.push({
        name: type,
        key: type,
        description: "Hermanmiller product for " + type + " product",
        attributes: attributes,
      });
    }
    let producttypesdata = JSON.stringify(final_types);
    fs.writeFileSync("producttypes.json", producttypesdata);

    facts();
  });
};
const facts = () => {
  let results = [];
  fs.readFile("./resultattr.json", "utf8", function (err, data) {
    if (err) throw err;
    let rawdatas = JSON.parse(data);
    for (let attr of rawdatas) {
      let res = {
        facet: "variants.attributes." + attr + ".key",
        type: "string",
        option: "",
        name: attr,
      };
      results.push(res);
    }
    let resultsdata = JSON.stringify(results);
    fs.writeFileSync("facts.json", resultsdata);
  });
};
convertor();
