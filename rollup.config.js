import jsonPlugin from '@rollup/plugin-json';
import typescriptPlugin from 'rollup-plugin-typescript2';
import run from '@rollup/plugin-run';

import { tmpdir } from 'os';
import { builtinModules } from 'module';
import { join as pathJoin } from 'path';

const MODULES = [
    'core',
    'simple-bot'
];

const core_modules = builtinModules.filter(name => (
    !/(^_|\/)/.test(name)
));

const cache_root = pathJoin(tmpdir(), '.rpt2_cache');

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
            plugins: [
                jsonPlugin(),
                typescriptPlugin({
                    cache_root,
                    useTsconfigDeclarationDir: false,
                    tsconfigOverride: {
                        outDir: dist,
                        rootDir: src,
                        include: [src]
                    }
                }),
                dev && run()
            ],
            external: [
                ...Object.keys(mod_package.dependencies || {}),
                ...Object.keys(mod_package.peerDependencies || {}),
                ...MODULES.map(moduleName => `@vk-io/${moduleName}`),
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
