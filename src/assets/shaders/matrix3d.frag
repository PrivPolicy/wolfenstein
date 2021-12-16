precision mediump float;

varying vec4 v_color;

void main() {
  // gl_FragColor = vec4(0.5, 0.6, 0.9, 1);
  gl_FragColor = v_color;
}