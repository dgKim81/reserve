const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.tsx', // 진입 파일
  output: {
    path: path.resolve(__dirname, 'dist'), // 출력 디렉토리
    filename: 'bundle.js', // 번들 파일 이름
    clean: true, // dist 폴더 정리
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'], // 파일 확장자
  },
  module: {
    rules: [
      {
        test: /\.html$/, // HTML 파일 처리
        use: 'html-loader',
      },
      {
        test: /\.(ts|tsx)$/, // TypeScript와 TSX 파일 처리
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/, // CSS 파일 처리
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)$/, // 이미지 파일 처리
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // 템플릿 파일
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'), // 정적 파일 경로
    },
    port: 3000, // 개발 서버 포트
    open: true, // 브라우저 자동 열기
    hot: true, // HMR 활성화
  },
  mode: 'development', // 모드 설정
};