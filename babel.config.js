const plugins = [
  '@babel/plugin-transform-runtime',
];

if (process.env.NODE_ENV === 'development') {
  plugins.push('react-refresh/babel');
}

module.exports = {
  presets: ['@babel/typescript', '@babel/preset-react', '@babel/preset-env'],
  plugins,
};
