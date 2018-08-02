include .githooks/.app-settings

# all: init test docs package setup
.PHONY: init
init:
	@if [ ! -n "$(PROJECT_TYPE)" ]; then \
		echo "ERROR: Please set the PROJECT_TYPE variable in the .githooks/.app-settings file"; \
		exit 1; \
	fi;
	@echo "init $(PROJECT_TYPE)";
	@make -f .githooks/Makefile setup-githooks;
# test:
#     # Run unit tests, code coverage, and linters
# docs:
#     # Generate your API documentation (you do have some, don't you?)
# package:
#     # Build a release tarball or jar or executable
# dev:
#     # Start up a development server or process e.g. `vagrant up` or `node server.js`
#     # Bonus: open that page in the user's browser automatically
# install:
#     # If your project builds an executable, place it in the `$PATH`.
#     # E.g. copy or symlink it into `/usr/local/bin`
# .PHONY: test docs

# ---setup-githooks---
# - Adds executable permissions to .githooks folder
# - Makes git look at .githooks/languages/{PROJECT_TYPE} folder instead of default folder
# --------------------
GITHOOKS_DIR=.githooks
GITHOOKS_REMOTE_REPO=git@github.com:fullstacklabs/githooks.git
LANGUAGE_PATH=$(GITHOOKS_DIR)/languages/$(PROJECT_TYPE)
.PHONY: setup-githooks
setup-githooks:
	@if [ ! -d ".git" ]; then \
		make one="ERROR: Not a git directory." .message; \
		exit 1; \
	fi;
	@if [ ! -d "$(LANGUAGE_PATH)" ]; then \
		echo "PROJECT_TYPE: $(PROJECT_TYPE) does not exist"; \
		exit 1; \
	fi;
	@echo "Giving $(GITHOOKS_DIR) run permissions...";
	@chmod +x "$(GITHOOKS_DIR)";
	@chmod -R +x "$(LANGUAGE_PATH)";
	@git config core.hooksPath "$(LANGUAGE_PATH)";
	@echo "Githooks configured";
