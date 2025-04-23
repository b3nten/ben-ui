import { build } from "esbuild";
import ts from "typescript"

const OUTPUT_DIR = '.build';

await build({
    external: ["radix-ui", "react"],
    entryPoints: ["./src/mod.ts", "./src/styles.css"],
    bundle: true,
    jsx: "automatic",
    loader: {
        ".tsx": "tsx",
    },
    outdir: OUTPUT_DIR,
    format: "esm",
    target: "ES2022"
})

// Read tsconfig.json
const configPath = ts.findConfigFile("./", ts.sys.fileExists, "tsconfig.json");
const configFile = ts.readConfigFile(configPath, ts.sys.readFile);
const compilerOptions = ts.parseJsonConfigFileContent(
    configFile.config,
    ts.sys,
    "./",
    {
        outDir: OUTPUT_DIR,
        noEmit: false,
        declaration: true,
        emitDeclarationOnly: true,
    }
).options;

// Compile
const program = ts.createProgram(["./src/mod.ts"], compilerOptions);
const emitResult = program.emit();

// Report errors
const diagnostics = ts.getPreEmitDiagnostics(program).concat(emitResult.diagnostics);
diagnostics.forEach(diagnostic => {
    console.log(ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"));
});