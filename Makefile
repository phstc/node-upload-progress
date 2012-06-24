TESTS = $(shell find test -name "*test.coffee")
COFFEE_FILES = $(shell find lib -name "*.coffee")
COFFEE_EXAMPLE_FILES = $(shell find examples -name "*.coffee")

test: compile test-unit

compile-all: compile compile-examples

compile:
	coffee -c $(COFFEE_FILES)

compile-examples:
	coffee -c $(COFFEE_EXAMPLE_FILES)

progress:
	supervisor examples/progress/app.js

simple:
	supervisor examples/simple/app.js

test-unit: 
	./node_modules/.bin/mocha $(TESTS) --reporter list --compilers coffee:coffee-script 

.PHONY: test-unit test compile progress simple
