# githooks

## Usage

#### Clone down this repo as a subtree into your existing project

```shell
$ git subtree add --prefix .githooks git@github.com:fullstacklabs/githooks.git master --squash
```

#### Run Makefile to initialize githooks

Set `PROJECT_TYPE` variable in the `./.githooks/.app-settings` to the project type.

```shell
$ make -f .githooks/Makefile
```
