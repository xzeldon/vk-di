import jsonPlugin from '@rollup/plugin-json';
import run from '@rollup/plugin-run';
import esbuild from 'rollup-plugin-esbuild';

import { builtinModules } from 'module';
import { join as pathJoin } from 'path';

const MODULES = [
    'core',
    'simple-bot'
];

const core_modules = builtinModules.filter(name => (
    !/(^_|\/)/.test(name)
));

const dev = process.env.ROLLUP_WATCH === 'true';

const get_module_path = path => (
    pathJoin(__dirname, 'packages', path)
);

export default async () => (
    Promise.all(MODULES.map(get_module_path).map(async mod_path => {
        const mod_package = await import(pathJoin(mod_path, 'package.json'));
        const src = pathJoin(mod_path, 'src');
        const dist = pathJoin(mod_path, 'dist');

        return {
            input: pathJoin(src, 'index.ts'),
            output: dist,
            plugins: [
                jsonPlugin(),
                esbuild({ experimentalBundling: true }),
                dev && run()
            ],
            external: [
                ...Object.keys(mod_package.dependencies || {}),
                ...Object.keys(mod_package.peerDependencies || {}),
                ...MODULES.map(moduleName => `@vk-di/${moduleName}`),
                ...core_modules
            ],
            output: [{
                file: pathJoin(mod_path, `${mod_package.main}`),
                format: 'cjs',
                exports: 'named'
            }]
        };
    }))
);
