install:
	npm ci

publish:
	npm publish --dry-run

lint:
	npx eslint .

test:
	npm jest

test-coverage:
	npm test -- --coverage --coverageProvider=v8