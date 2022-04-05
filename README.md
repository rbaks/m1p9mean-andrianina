# m1p9mean-andrianina

## Setup Heroku apps

login with `heroku CLI`

```bash
$ heroku login
```

Create backend and frontend apps

```bash
$ heroku create ekaly-backend
```

Add and rename Heroku remotes

```bash
$ heroku git:remote -a ekaly-backend
$ git remote rename heroku backend
```

## Setup Heroku deployment

Make sure to have [git-subtree](https://codeengineered.com/blog/how-to-install-git-subtree/) installed.

In `package.json` of each project

```diff
"scripts": {
+   "publishToHeroku": "cd ../ && git subtree push --prefix api backend main || true",
    "clean": "rimraf dist logs",
    ...
  },
```

### Setup environment variables

Run the command

```bash
$ heroku config:set KEY=VALUE --remote backend
```

### Deploy to Heroku

```bash
$ yarn publishToHeroku
```
