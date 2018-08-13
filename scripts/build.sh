npm run build
rm -r docs/main.*
rm docs/index.html
cp build/index.html docs/
cp -r build/static/js/main.* docs/
cp -r build/static/css/main.* docs/
rm -r build