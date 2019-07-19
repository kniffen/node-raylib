/**
 * node-raylib
 *
 * https://github.com/robloach/node-raylib
 */

// const enums = require('./src/enums')

// Inject the enums.
// for (var enumName in enums) {
//   raylib[enumName] = enums[enumName]
// }

import r from "./src/bindings/raylib"

import * as colors from "./src/types/colors"
import * as core from "./src/core"
import * as shapes from "./src/shapes"
import * as textures from "./src/textures"
import * as text from "./src/text"
import * as models from "./src/models"
import * as shaders from "./src/shaders"
import * as audio from "./src/audio"

const PI = 3.14159265358979323846

const raylib = {
  PI,
  MAX_TOUCH_POINTS: 10,
  MAX_SHADER_LOCATIONS: 32,
  MAX_MATERIAL_MAPS: 12,
  DEG2RAD: (PI / 180.0),
  RAD2DEG: (180.0 / PI),

  ...colors,
  ...core,
  ...shapes,
  ...textures,
  ...text,
  ...models,
  ...shaders,
  ...audio,
}

// raylib.Rectangle = function (x = 0, y = 0, width = 0, height = 0) {
//   return {
//     x: x,
//     y: y,
//     width: width,
//     height: height
//   }
// }
// raylib.Camera2D = function (offset, target, rotation, zoom) {
//   return {
//     offset: offset,
//     target: target,
//     rotation: rotation,
//     zoom: zoom
//   }
// }
// raylib.Camera = raylib.Camera3D = function (position, target, up, fovy, type) {
//   return {
//     position: position,
//     target: target,
//     up: up,
//     fovy: fovy,
//     type: type
//   }
// }

// raylib.Ray = function (position, direction) {
//   return {
//     position: position,
//     direction: direction
//   }
// }

// raylib.RayHitInfo = function (hit, distance, position, normal) {
//   return {
//     hit: hit,
//     distance,
//     position: position,
//     normal: normal
//   }
// }

// raylib.Shader = function (id, locs) {
//   return {
//     id: id,
//     locs: locs
//   }
// }

export default raylib
export { r }