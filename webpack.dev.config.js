// подключаем дополнительный плагин path
const path = require('path');

// описание настроек
module.exports = {
    // точка входа
    entry: './src/index.js',
    // точка выхода - вебпак соберт файл на основании файла из точки входа
    output: {
        // как назовём наш файл
        filename: 'dev-bundle.js',
        // та папка куда хотим положить bundle.js
        // node.js чтобы правильно нашёл путь до папки, нужен плагин path
        // __dirname - глобальная переменная, которая позволяет найти глобально нашу папку, неважно де она находится
        path: path.resolve(__dirname, './dist'),
    },
    mode: 'development',
    // настройка dev server
    devServer: {
        open: true, //откртый ip адре
        port: 8080,
        hot: false, //перезагрузка была на горячую
        writeToDisk: true, // файл не будет создаваться на диске, если поставить false
    },
    // модуль для babel загрузчика
    module: {
        // набор правил
        rules: [
            {
                // берём все js файлы
                test: /\.js$/,
                // что будем использовать
                use: {
                    // babel
                    loader: 'babel-loader',
                    // пресет, который включает в себя все вышедшие на сегодня ES
                    options: {
                        // можно прописывать несколько пресетов, если надо
                        presets: ['@babel/env']
                    },
                },
                // исключаем папку
                exclude: /node_modules/,
            }
        ]
    }
};
