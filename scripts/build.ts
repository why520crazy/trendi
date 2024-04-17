import esbuild from 'esbuild';
import ts from 'typescript';
import fsPromises from 'node:fs/promises';
import fs from 'node:fs';
import glob from 'glob';

const entryPoints = glob.sync('./src/**/*.ts');

async function build() {
    // const parsedResult = ts.getParsedCommandLineOfConfigFile('./tsconfig.json', {}, {
    //     useCaseSensitiveFileNames: true,
    //     fileExists: ts.sys.fileExists,
    //     readFile: ts.sys.readFile,
    //     getCurrentDirectory: () => {
    //         const currentDirectory = ts.sys.getCurrentDirectory();
    //         return currentDirectory;
    //     },
    //     readDirectory: ts.sys.readDirectory,
    //     onUnRecoverableConfigFileDiagnostic: () => {}
    // });
    // const program = ts.createProgram({
    //     rootNames: parsedResult.fileNames,
    //     options: parsedResult.options,
    // });
    // console.log(parsedResult.fileNames)
    // const buildResult = await esbuild.build({
    //     tsconfig: './tsconfig.json',
    //     entryPoints: ['./test/test.ts'],
    //     outdir: './dist/test',
    //     platform: 'node',
    //     target: 'es2020',
    //     format: 'esm',
    //     plugins: [
    //         {
    //             name: 'my',
    //             setup: build => {
    //                 console.log('build-setup', build.initialOptions);
    //                 // build.onResolve({ filter: /.*/ }, async args => {
    //                 //     console.log("onResolve", args);
    //                 //     return args.resolveDir;
    //                 // });
    //                 build.onLoad({ filter: /.*/ }, async options => {
    //                     console.log(`onLoad path: ${options.path}`);
    //                     const f = program.getSourceFile(options.path);
    //                     console.log(f);
    //                     const contents = await fsPromises.readFile(options.path, { encoding: 'utf-8' });
    //                     // console.log(contents);
    //                     ts.transpile(contents, {});
    //                     return {
    //                         contents: contents,
    //                         loader: 'ts'
    //                     };
    //                 });
    //             }
    //         }
    //     ]
    // });
    // console.log(buildResult);
    // return;
    // console.log(await esbuild.transform('const a: number = 1;', { loader: 'ts' }));
    // const result = await esbuild.build({
    //     tsconfig: './tsconfig.json',
    //     entryPoints: entryPoints,
    //     outdir: './dist/esm',
    //     platform: 'node',
    //     target: 'es2020',
    //     format: 'esm',
    //     plugins: [
    //         {
    //             name: 'my',
    //             setup: build => {
    //                 console.log('build-setup', build.initialOptions);
    //                 // build.onResolve({ filter: /.*/ }, async args => {
    //                 //     console.log("onResolve", args);
    //                 //     return args.resolveDir;
    //                 // });
    //                 build.onLoad({ filter: /.*/ }, async options => {
    //                     const contents = await fsPromises.readFile(options.path);
    //                     console.log(contents);
    //                     return {
    //                         contents: contents,
    //                         loader: 'ts'
    //                     };
    //                 });
    //             }
    //         }
    //     ]
    // });

    const cjsResult = await esbuild.build({
        tsconfig: './tsconfig-cjs.json',
        entryPoints: ["./src/index.ts"],
        bundle: true,
        outfile:"./dist/cjs/index.cjs",
        platform: 'node',
        target: 'es2020',
        format: 'cjs'
    });
    console.log(`build cjs successfully!`);
}

build();
