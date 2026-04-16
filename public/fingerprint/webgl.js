const getWebGLDetails = async () => {
    const lines = [];

    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

    if (!gl) {
        alert('WebGL not supported in this browser, please enable WebGL.');
        return 'WebGL not supported';
    }

    const isWebGL2 = gl instanceof WebGL2RenderingContext;

    lines.push(`WebGL Version: ${isWebGL2 ? '2.0' : '1.0'}`);
    lines.push(`GL Version String: ${gl.getParameter(gl.VERSION)}`);
    lines.push(`GLSL Version: ${gl.getParameter(gl.SHADING_LANGUAGE_VERSION)}`);
    lines.push(`Vendor: ${gl.getParameter(gl.VENDOR)}`);
    lines.push(`Renderer: ${gl.getParameter(gl.RENDERER)}`);

    lines.push(`Max Texture Size: ${gl.getParameter(gl.MAX_TEXTURE_SIZE)}`);
    lines.push(`Max Cube Map Texture Size: ${gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE)}`);
    lines.push(`Max Renderbuffer Size: ${gl.getParameter(gl.MAX_RENDERBUFFER_SIZE)}`);
    lines.push(`Max Viewport Dims: ${gl.getParameter(gl.MAX_VIEWPORT_DIMS)}`);
    lines.push(`Max Texture Image Units: ${gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS)}`);
    lines.push(`Max Combined Texture Image Units: ${gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS)}`);
    lines.push(`Max Vertex Texture Image Units: ${gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS)}`);
    lines.push(`Max Vertex Attribs: ${gl.getParameter(gl.MAX_VERTEX_ATTRIBS)}`);
    lines.push(`Max Vertex Uniform Vectors: ${gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS)}`);
    lines.push(`Max Fragment Uniform Vectors: ${gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS)}`);
    lines.push(`Max Varying Vectors: ${gl.getParameter(gl.MAX_VARYING_VECTORS)}`);
    lines.push(`Max Anisotropy: ${gl.getExtension('EXT_texture_filter_anisotropic') ? gl.getParameter(gl.getExtension('EXT_texture_filter_anisotropic').MAX_TEXTURE_MAX_ANISOTROPY_EXT) : 'N/A'}`);
    lines.push(`Aliased Line Width Range: ${gl.getParameter(gl.ALIASED_LINE_WIDTH_RANGE)}`);
    lines.push(`Aliased Point Size Range: ${gl.getParameter(gl.ALIASED_POINT_SIZE_RANGE)}`);

    lines.push(`Red Bits: ${gl.getParameter(gl.RED_BITS)}`);
    lines.push(`Green Bits: ${gl.getParameter(gl.GREEN_BITS)}`);
    lines.push(`Blue Bits: ${gl.getParameter(gl.BLUE_BITS)}`);
    lines.push(`Alpha Bits: ${gl.getParameter(gl.ALPHA_BITS)}`);
    lines.push(`Depth Bits: ${gl.getParameter(gl.DEPTH_BITS)}`);
    lines.push(`Stencil Bits: ${gl.getParameter(gl.STENCIL_BITS)}`);
    lines.push(`Subpixel Bits: ${gl.getParameter(gl.SUBPIXEL_BITS)}`);

    lines.push(`Antialias: ${gl.getContextAttributes()?.antialias}`);
    lines.push(`Alpha Channel: ${gl.getContextAttributes()?.alpha}`);
    lines.push(`Depth Buffer: ${gl.getContextAttributes()?.depth}`);
    lines.push(`Stencil Buffer: ${gl.getContextAttributes()?.stencil}`);
    lines.push(`Premultiplied Alpha: ${gl.getContextAttributes()?.premultipliedAlpha}`);
    lines.push(`Preserve Drawing Buffer: ${gl.getContextAttributes()?.preserveDrawingBuffer}`);
    lines.push(`Power Preference: ${gl.getContextAttributes()?.powerPreference}`);
    lines.push(`Fail If Major Performance Caveat: ${gl.getContextAttributes()?.failIfMajorPerformanceCaveat}`);
    lines.push(`Desynchronized: ${gl.getContextAttributes()?.desynchronized}`);

    if (isWebGL2) {
        lines.push(`Max 3D Texture Size: ${gl.getParameter(gl.MAX_3D_TEXTURE_SIZE)}`);
        lines.push(`Max Array Texture Layers: ${gl.getParameter(gl.MAX_ARRAY_TEXTURE_LAYERS)}`);
        lines.push(`Max Color Attachments: ${gl.getParameter(gl.MAX_COLOR_ATTACHMENTS)}`);
        lines.push(`Max Draw Buffers: ${gl.getParameter(gl.MAX_DRAW_BUFFERS)}`);
        lines.push(`Max Samples: ${gl.getParameter(gl.MAX_SAMPLES)}`);
        lines.push(`Max Uniform Buffer Bindings: ${gl.getParameter(gl.MAX_UNIFORM_BUFFER_BINDINGS)}`);
        lines.push(`Max Uniform Block Size: ${gl.getParameter(gl.MAX_UNIFORM_BLOCK_SIZE)}`);
        lines.push(`Max Vertex Uniform Blocks: ${gl.getParameter(gl.MAX_VERTEX_UNIFORM_BLOCKS)}`);
        lines.push(`Max Fragment Uniform Blocks: ${gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_BLOCKS)}`);
        lines.push(`Max Combined Uniform Blocks: ${gl.getParameter(gl.MAX_COMBINED_UNIFORM_BLOCKS)}`);
        lines.push(`Max Transform Feedback Separate Attribs: ${gl.getParameter(gl.MAX_TRANSFORM_FEEDBACK_SEPARATE_ATTRIBS)}`);
        lines.push(`Max Transform Feedback Interleaved Components: ${gl.getParameter(gl.MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS)}`);
        lines.push(`Max Element Index: ${gl.getParameter(gl.MAX_ELEMENT_INDEX)}`);
        lines.push(`Max Elements Vertices: ${gl.getParameter(gl.MAX_ELEMENTS_VERTICES)}`);
        lines.push(`Max Elements Indices: ${gl.getParameter(gl.MAX_ELEMENTS_INDICES)}`);
        lines.push(`Max Fragment Input Components: ${gl.getParameter(gl.MAX_FRAGMENT_INPUT_COMPONENTS)}`);
        lines.push(`Max Vertex Output Components: ${gl.getParameter(gl.MAX_VERTEX_OUTPUT_COMPONENTS)}`);
        lines.push(`Max Server Wait Timeout: ${gl.getParameter(gl.MAX_SERVER_WAIT_TIMEOUT)}`);
        lines.push(`Min Program Texel Offset: ${gl.getParameter(gl.MIN_PROGRAM_TEXEL_OFFSET)}`);
        lines.push(`Max Program Texel Offset: ${gl.getParameter(gl.MAX_PROGRAM_TEXEL_OFFSET)}`);
    }

    const extensions = gl.getSupportedExtensions() || [];
    lines.push(`Supported Extensions (${extensions.length}): ${extensions.join(', ')}`);

    let precision = '';
    const shaderTypes = ['VERTEX_SHADER', 'FRAGMENT_SHADER'];
    const precisionTypes = ['LOW_FLOAT', 'MEDIUM_FLOAT', 'HIGH_FLOAT', 'LOW_INT', 'MEDIUM_INT', 'HIGH_INT'];
    for (const shader of shaderTypes) {
        for (const prec of precisionTypes) {
            const p = gl.getShaderPrecisionFormat(gl[shader], gl[prec]);
            precision += `${shader} ${prec}: range[${p?.rangeMin},${p?.rangeMax}] precision=${p?.precision} | `;
        }
    }
    lines.push(`Shader Precision: ${precision}`);

    let webglHash = '';
    try {
        const w = canvas.width = 256, h = canvas.height = 256;
        const prog = gl.createProgram();
        const vs = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vs, `void main(){gl_Position=vec4(0,0,0,1);gl_PointSize=1.0;}`);
        gl.compileShader(vs);
        const fs = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fs, `void main(){gl_FragColor=vec4(0.3,0.6,0.9,1.0);}`);
        gl.compileShader(fs);
        gl.attachShader(prog, vs);
        gl.attachShader(prog, fs);
        gl.linkProgram(prog);
        gl.useProgram(prog);
        gl.drawArrays(gl.POINTS, 0, 1);
        const pixels = new Uint8Array(w * h * 4);
        gl.readPixels(0, 0, w, h, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
        webglHash = btoa(String.fromCharCode(...pixels.slice(0, 64)));
    } catch(e) {}
    lines.push(`WebGL Render Hash: ${webglHash}`);

    const result = lines.join('\n');
    console.log(result);
    return result;
};

getWebGLDetails();