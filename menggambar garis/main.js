function main(){
    /**
   * @type {HTMLCanvasElement} canvas
   */
  const canvas = document.getElementById('myCanvas');

  /**
   * @type {WebGLRenderingContext} gl
   */
  const gl = canvas.getContext('webgl');


    //mendefinisikan posisi titik2
    /**
     * A (-0.5, 0.5); B(-0.5, -0.5): C(0.5, -0.5)
     */
    var vertices = [
        -0.5, 0.5,  //titik A
        -0.5, -0.5, //titik B
        -0.5, -0.5, //titik B
        0.5, -0.5,   //titik C
        0.5, -0.5,   //titik C
        -0.5, 0.5  //titik A
    ];

    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    /*var vertexShaderCode = `
    attribute vec2 a_position;
    void main(){
            gl_Position = vec4(a_position, 0.0, 1.0);
            gl_PointSize = 20.0;
    }`;*/

    var vertexShaderCode=`
    attribute vec2 a_Position;
        void main(){
            gl_Position = vec4(a_Position, 0.0, 1.0);
            gl_PointSize = 20.0;
        }`;

    var vertexShaderCode = document.getElementById("vertexShaderCode").text;

    //membuat titik tsb
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderCode);
    gl.compileShader(vertexShader);

    var fragmentShaderCode = `
    void main(){
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }
    `;

    /*var fragmentShaderCode = document.getElementById("fragmentShaderCode");*/

    //membuat warna
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderCode);
    gl.compileShader(fragmentShader);

    //membuat package program agar data bisa di eksekusi/compile oleh CPU->GPU
    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    var aPosition = gl.getAttribLocation(shaderProgram, "a_Position");
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPosition);

    //mendefinisikan backgrund
    gl.clearColor(0.0, 0.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.LINES, 0, 6);

    //bisa juga pakai line loop dan line strip dan triangle strip(nambah titik D jadi persegi) dan triangle FAN
    /*gl.drawArrays(gl.LINE_LOOP, 0, 3);
      gl.drawArrays(gl.LINE_STRIP, 0, 4);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 3);
      gl.drawArrays(gl.TRIANGLE_FAN, 0, 3);*/
}