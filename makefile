STATIC_DIR 	= represent/web/static

SCSS_SOURCE 	= $(STATIC_DIR)/scss/main.scss
JS_SOURCE 		= $(STATIC_DIR)/javascript/main.js

JS_TARGET 		= $(STATIC_DIR)/bundle.js
SCSS_TARGET 	= $(STATIC_DIR)/bundle.css

ENTRY_POINT	= index.js

all: serve

install:
	npm install
	bourbon install --path $(STATIC_DIR)/scss
	neat install
	mv neat $(STATIC_DIR)/scss

build:
	browserify $(JS_SOURCE) -o $(JS_TARGET)
	sass $(SCSS_SOURCE):$(SCSS_TARGET)

serve:
	sass --watch $(SCSS_SOURCE):$(SCSS_TARGET) &
	watchify $(JS_SOURCE) -o $(JS_TARGET) &
	livereload $(STATIC_DIR) &

kill: stop

stop:
	kill -9 $$(ps aux | grep -v grep | grep "livereload" | awk '{print $$2}')
	kill -9 $$(ps aux | grep -v grep | grep "watchify" | awk '{print $$2}')
	kill -9 $$(ps aux | grep -v grep | grep "sass" | awk '{print $$2}')

clean:
	rm -f $(STATIC_DIR)/bundle.js $(STATIC_DIR)/bundle.css *.css.map
