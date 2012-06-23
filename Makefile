TESTS = $(shell find test -name "*test.coffee")

test:
	./node_modules/.bin/mocha $(TESTS) --reporter list --compilers coffee:coffee-script 

.PHONY: test
