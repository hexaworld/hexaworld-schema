var hexaworld = {

  $schema: "http://json-schema.org/schema#",
  id: "https://github.com/hexaworld/hexaworld-schema/schema.js",

  definitions: {

    // basic definitions

    pixelCoord: {
      type: "array",
      minItems: 2,
      maxItems: 3,
      items: { type: "number"}
    },

    axialCoord: {
      type: "array",
      minItems: 2,
      maxItems: 2,
      items: { type: "integer" }
    },

    color: {
      oneOf: [
        { type: "object",
          properties: {
            hue: {
              type: "number",
              minimum: 0,
              maximum: 360
            },
            saturation: {
              type: "number",
              minimum: 0,
              maximum: 100
            },
            value: {
              type: "number",
              minimum: 0,
              maximum: 100
            }
          }
        },
        { type: "object",
          properties: {
            r: {
              type: "number",
              minimum: 0,
              maximum: 255
            },
            g: {
              type: "number",
              minimum: 0,
              maximum: 255
            },
            b: {
              type: "number",
              minimum: 0,
              maximum: 255
            }
          }
        }
      ]
    },

    //  geometric definitions

    scaleFactor: {
      type: "number",
      minimum: 0,
      maximum: 1
    },

    rotationDegrees: {
      type: "number",
      minimum: -180,
      maximum: 180
    },

    transformation: {
      scale: {
        type: "object",
        properties: {
          x: { $ref: "#/definitions/scaleFactor" },
          y: { $ref: "#/definitions/scaleFactor" },
          z: { $ref: "#/definitions/scaleFactor" },
        }
      },
      rotation: {
        type: "object",
        properties: {
          x: { $ref: "#/definitions/rotationDegrees" },
          y: { $ref: "#/definitions/rotationDegrees" },
          z: { $ref: "#/definitions/rotationDegrees" },
        }
      }
    },

    item: {
      type: "object",
      properties: {
        name: { $ref: "string" },
        color: { $ref: "#/definitions/color" },
        transformation: { $ref: "#/definitions/transformation" },
      },
      required: ["name"]
    },

    // game-specific definitions

    start: {
        type: "object",
        properties: {
            tile: { $ref: "#/definitions/axialCoord" },
            section: { $ref: "#/definitions/section" }
        },
        required: ["tile", "section"]
    },

    player: {
      type: "object",
      properties: {
        start: { $ref: "#/definitions/start" }
      },
      required: ["start"]
    },

    camera: {
      allOf: [
        { $ref: "#/definitions/start" },
        { properties: {
            height: "number"
          },
          required: ["height"]
        }
      ]
    },

    section: {
      type: "integer",
      minimum: 0,
      maximum: 7
    },

    tile: {
      type: "object",
      properties: {
        position: { $ref: "#/definitions/axialCoord" },
        sections: {
          type: "array",
          // no two sections can have the same position
          uniqueItems: true,
          items: {
            type: "object",
            properties: {
              position: { $ref: "#/definitions/section" },
              path: { type: "boolean" },
              items: {
                type: "array",
                items: { $ref: "#/definitions/item" }
              }
            },
            required: ["position"]
          }
        }
      },
      required: ["position"]
    },
  },

  allOf: [

    // an optional array of tiles
    { type: "array",
      items: {
        $ref: "#/definitions/tile"
      }
    },

    // a starting position for the player
    { $ref: "#/definitions/player" },

    // a starting position for the camera
    { $ref: "#/definitions/camera" }
    // additional metadata?

  ]
}

module.exports = hexaworld
