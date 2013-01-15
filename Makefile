
build: components zip.js
	@component build --dev

components: component.json
	@component install --dev

zip.js:
	echo "(function () {\n" > zip.js
	cat WebContent/zip.js >> zip.js
	echo "}).call(module.exports)\n" >> zip.js

clean:
	rm -fr build components zip.js

.PHONY: clean
