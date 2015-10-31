var hexaworld = {

  $schema: 'http://json-schema.org/schema#',
  id: 'https://github.com/hexaworld/hexaworld-schema/schema.js',

  definitions: {

    // basic definitions

    pixel: {
      type: 'array',
      minItems: 2,
      maxItems: 3,
      items: { type: 'number'}
    },

    axial: {
      type: 'array',
      minItems: 2,
      maxItems: 2,
      items: { type: 'integer' }
    },

    color: {
      oneOf: [
        { type: 'object',
          properties: {
            hue: {
              type: 'number',
              minimum: 0,
              maximum: 360
            },
            saturation: {
              type: 'number',
              minimum: 0,
              maximum: 100
            },
            value: {
              type: 'number',
              minimum: 0,
              maximum: 100
            }
          }
        },
        { type: 'object',
          properties: {
            r: {
              type: 'number',
              minimum: 0,
              maximum: 255
            },
            g: {
              type: 'number',
              minimum: 0,
              maximum: 255
            },
            b: {
              type: 'number',
              minimum: 0,
              maximum: 255
            }
          }
        }
      ]
    },

    //  geometric definitions

    scaleFactor: {
      type: 'number',
      // TODO: do we want to limit the range of allowable scale factors?
      minimum: 0,
      maximum: 1
    },

    rotationDegrees: {
      type: 'number',
      minimum: 0,
      maximum: 360
    },

    transformation: {
      position: {
        type: 'object',
        properties: {
          x: { type: 'number' },
          y: { type: 'number' },
          z: { type: 'number' }
        }
      },
      scale: {
        type: 'object',
        properties: {
          x: { $ref: '#/definitions/scaleFactor' },
          y: { $ref: '#/definitions/scaleFactor' },
          z: { $ref: '#/definitions/scaleFactor' },
        }
      },
      rotation: {
        type: 'object',
        properties: {
          x: { $ref: '#/definitions/rotationDegrees' },
          y: { $ref: '#/definitions/rotationDegrees' },
          z: { $ref: '#/definitions/rotationDegrees' },
        }
      }
    },

    object: {
      type: 'object',
      properties: {
        name: { $ref: 'string' },
        color: { $ref: '#/definitions/color' },
        transformation: { $ref: '#/definitions/transformation' },
      },
      required: ['name']
    },

    path: {
      type: 'object',
      properties: {
        rotation: {
          type: 'integer',
          multipleOf: 60
        }
      }
    },

    // game-specific definitions

    tile: {
      type: 'object',
      properties: {
        position: { $ref: '#/definitions/axial' },
        objects: {
          type: 'array',
          items: {
            'oneOf': [
              { $ref: '#/definitions/path' },
              { $ref: '#/definitions/object' }
            ]
          }
        }
      },
      required: ['position']
    },
  },

  type: 'object',
  properties: {
    world:
      { type: 'array',
        items: { $ref: '#/definitions/tile' }
      },
    player: { $ref: '#/definitions/player' },
    camera: { $ref: '#/definitions/camera' }
    // additional metadata?
  },
  required: ['world', 'player', 'camera']
}

module.exports = hexaworld
