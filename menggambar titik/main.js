function main(){
    //akses kanvas atau media untuk menggambar
    var canvas = document.getElementById("myCanvas");
    //siapkan tools utk menggambar spt bolpen, pensil, kuas
    var context = canvas.getContext("webgl");

    //mendefinisikan titik
    var vertexShaderCode = `
    void main(){
        gl_position = vec4(0.0, 0.0, 0.0, 1.0)
        gl_PointSize = 10.0;
    }`;

    //membuat titik tsb
    var vertexShader = contex.createShader(contex.VERTEX_SHADER);
    contex.shaderSource(vertexShader, vertexShaderCode);
    contex.compileShader(vertexShader);
    
    //mendefinisikan warna atau fragment
    var fragmentShaderCode = `
    void main(){
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }
    `;
    
    //membuat warna
    var fragmentShader = contex.createShader(contex.FRAGMENT_SHADER);
    contex.shaderSource(fragmentShader, fragmentShaderCode);
    contex.compileShader(fragmentShader);
    
    //membuat package program agar data bisa di eksekusi/compile oleh CPU->GPU
    var shaderProgram = contex.createProgram();
    contex.attachShader(shaderProgram, vertexShader);
    contex.attachShader(shaderProgram, fragmentShader);
    contex.linkProgram(shaderProgram);
    contex.useProgram(shaderProgram);
    
    //mendefinisikan backgrund
    contex.clearColor(0.0, 0.0, 1.0, 1.0);
    contex.clear(contex.COLOR_BUFFER_BIT);

    contex.drawArrays(contex.POINTS, 0,1);

}
