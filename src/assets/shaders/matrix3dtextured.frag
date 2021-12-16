precision mediump float;

uniform sampler2D u_image;

// varying vec4 v_color;
varying vec2 v_texCoord;

void main() {
  // gl_FragColor = vec4(0.5, 0.6, 0.9, 1);
  // gl_FragColor = v_color;
  gl_FragColor = texture2D(u_image, v_texCoord);
  if (gl_FragColor.a < 0.5) {
    discard;
  }
}