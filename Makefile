TESTS = $(shell find test -name "*test.coffee")
COFFEE_FILES = $(shell find lib -name "*.coffee")

test: compile test-unit

compile:
	coffee -c $(COFFEE_FILES)

test-unit: 
	./node_modules/.bin/mocha $(TESTS) --reporter list --compilers coffee:coffee-script 

.PHONY: test-unit test compile
