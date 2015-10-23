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

    shape: {
      type: "object",
      properties: {
        color: { $ref: "#/definitions/color" },
        transformation: { $ref: "#/definitions/transformation" },

        // TODO: how should we represent textures?
        texture: { type: "string" }
      }
    },

    ellipsoid: {
      allOf: [
        { $ref: "#/definitions/shape" },
        { properties: {
            center: { $ref: "#/definitions/pixelCoord" },
            a: { type: "number" },
            b: { type: "number" },
            c: { type: "number" }
          }
        }
      ]
    },

    rectangle: {
      allOf: [
        { $ref: "#/definitions/shape" },
        { properties: {
            s1: { type: "number" },
            s2: { type: "number" },
            s3: { type: "number" }
          }
        }
      ]
    },

    // not checking if valid polygon
    polygon: {
      allOf: [
        { $ref: "#/definitions/shape" },
        { properties: {
            faces: {
              type: "array",
              items: {
                p1: { $ref: "#/definitions/pixelCoord" },
                p2: { $ref: "#/definitions/pixelCoord" },
                p3: { $ref: "#/definitions/pixelCoord" }
              }
            }
          }
        }
      ]
    },

    // game-specific definitions

    start: {
        type: "object",
        properties: {
            tile: { $ref: "#/definitions/axialCoord" },
            section: { $ref: "#/definitions/section" }
        }
    }

    player: {
      type: "object",
      properties: {
        start: { $ref: "#/definitions/start" },
        shape: { $ref: "#/definitions/shape" }
      }
    },

    camera: {
        { $ref: "#/definitions/start" },
        { properties:
            height: "number"
        }
    },

    section: {
      type: "integer",
      minimum: 0,
      maximum: 7
    },

    path: {
      allOf: [
        { $ref: "#/definitions/shape" }
      ]
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
              path: { $ref: "#/definitions/path" },
              objects: {
                type: "array",
                items: { $ref: "#/definitions/shape" }
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
