cmake_minimum_required(VERSION 3.11)
project (node-raylib)

if ( CMAKE_COMPILER_IS_GNUCC )
    set(CMAKE_C_FLAGS "-fPIC ${CMAKE_C_FLAGS} -Wno-unused-result")
    set(CMAKE_CXX_FLAGS "-Wall -Wextra")
endif()
if ( MSVC )
    set(CMAKE_CXX_FLAGS  "${CMAKE_CXX_FLAGS} /w")
endif()

if(NOT CMAKE_BUILD_TYPE)
  set(CMAKE_BUILD_TYPE Release)
endif()

set(CMAKE_CXX_FLAGS_DEBUG "-g")
set(CMAKE_CXX_FLAGS_RELEASE "-O3")

# TODO: Move this to cmake/FindRaylib.cmake?
find_package(raylib 2.5.0 QUIET)
if (NOT raylib_FOUND)
  include(FetchContent)
  FetchContent_Declare(
    raylib
    GIT_REPOSITORY https://github.com/raysan5/raylib.git
    GIT_TAG 6c44c9d73049501a6ba6fdccd9bed9b1dd81793d
  )
  FetchContent_GetProperties(raylib)
  if (NOT raylib_POPULATED) # Have we downloaded raylib yet?
    set(FETCHCONTENT_QUIET NO)
    FetchContent_Populate(raylib)
    set(BUILD_EXAMPLES OFF CACHE BOOL "" FORCE) # don't build the supplied examples
    set(BUILD_GAMES    OFF CACHE BOOL "" FORCE) # or games
    add_subdirectory(${raylib_SOURCE_DIR} ${raylib_BINARY_DIR})
  endif()
endif()

# Add all the include directories.
include_directories(${PROJECT_NAME}
  "${CMAKE_JS_INC}"
  "${CMAKE_SOURCE_DIR}/node_modules/node-addon-api"
  "${CMAKE_CURRENT_SOURCE_DIR}/node_modules/node-addon-api"
  "${CMAKE_SOURCE_DIR}/node_modules/node-addon-api/src"
  "${CMAKE_CURRENT_SOURCE_DIR}/node_modules/node-addon-api/src"
  "${CMAKE_CURRENT_SOURCE_DIR}/../node-addon-api"
  "${CMAKE_CURRENT_SOURCE_DIR}/../node-addon-api/src"
)

# This is hardcoded so that updates force a re-compile.
add_library(${PROJECT_NAME} SHARED
  src/lib/AddFunction.h
  src/lib/CleanUp.h
  src/lib/GetArgFromParam.h
  src/lib/ToObject.h
  src/lib/ToValue.h
  src/lib/ValidArgs.h
  src/addon.cc
  src/audio.h
  src/camera.h
  src/color.h
  src/core.h
  src/cursor.h
  src/drawing.h
  src/files.h
  src/gestures.h
  src/misc.h
  src/rlgl.h
  src/shapes.h
  src/text.h
  src/textures.h
  src/timing.h
  src/window.h
)

## Suffix the node module with .node.
set_target_properties(${PROJECT_NAME} PROPERTIES
  PREFIX ""
  SUFFIX ".node"
)

target_compile_features(${PROJECT_NAME} PUBLIC cxx_std_11)

target_include_directories(${PROJECT_NAME} PUBLIC
  "${CMAKE_JS_INC}"
  "${CMAKE_SOURCE_DIR}/node_modules/node-addon-api"
  "${CMAKE_CURRENT_SOURCE_DIR}/node_modules/node-addon-api"
  "${CMAKE_SOURCE_DIR}/node_modules/node-addon-api/src"
  "${CMAKE_CURRENT_SOURCE_DIR}/node_modules/node-addon-api/src"
  "${CMAKE_CURRENT_SOURCE_DIR}/../node-addon-api"
  "${CMAKE_CURRENT_SOURCE_DIR}/../node-addon-api/src"
)

# Link raylib.
target_link_libraries(${PROJECT_NAME}
  ${CMAKE_JS_LIB}
  raylib
)
