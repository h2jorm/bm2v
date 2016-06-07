ExampleDir = example

clean:
	rm -rf build
	rm -rf dist

site: clean
	npm run build && \
	node ./scripts/buildSite.js
