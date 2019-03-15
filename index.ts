
const main = async () => {
    const canvas = document.querySelector<HTMLCanvasElement>('#glCanvas');
    if(!canvas) return;
    const gl = canvas.getContext('webgl');
    if(!gl) return;
    gl.clearColor(0.0,0.0,0.0,1.0);
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.vertexAttrib1f(2, 20);
}