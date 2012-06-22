TESTS = $(shell find test -name "*test.js")

test:
	./node_modules/.bin/mocha $(TESTS) --reporter list

.PHONY: test
