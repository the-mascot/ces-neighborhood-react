const TerserPlugin = require("terser-webpack-plugin");

module.exports = function override(config, env) {
    /*svgr 설정*/
    config.module.rules.push({
        test: /\.svg$/i, // .svg 확장자를 가진 파일을 대상으로
        issuer: /\.[jt]sx?$/, // .js, .jsx, .ts, .tsx 파일 내에서 import된 경우에만
        use: ['@svgr/webpack']
    });

    /*코드압축, 난독화, 콘솔로그 제거 플로그인*/
    if (env === 'production') {
        config.optimization = {
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    parallel: true,
                    terserOptions: {
                        format: {
                            comments: false // 빌드시 주석 제거
                        },
                        compress: {
                            drop_console: true // 콘솔 로그 제거
                        }
                    }
                })
            ]
        }
    }
    return config;
}
